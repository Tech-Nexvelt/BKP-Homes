import { prisma } from '../../config/database';
import type { CreateOrderInput } from './orders.validator';

export class OrdersRepository {
  async create(userId: string, data: CreateOrderInput) {
    return prisma.order.create({
      data: {
        userId,
        addressId: data.addressId,
        totalAmount: data.totalAmount,
        discount: data.discount ?? 0,
        tax: data.tax ?? 0,
        paymentId: data.paymentId,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : undefined,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            qty: item.qty,
            price: item.price,
            name: item.name,
            image: item.image,
          })),
        },
        tracking: {
          create: {
            stage: 'CONFIRMED',
            note: 'Order received and confirmed.',
            updatedBy: 'system',
          },
        },
      },
      include: {
        items: { include: { product: { select: { name: true, images: true } } } },
        address: true,
        tracking: { orderBy: { timestamp: 'asc' } },
      },
    });
  }

  async findByUser(userId: string, skip: number, take: number) {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { take: 3 },
          address: true,
        },
      }),
      prisma.order.count({ where: { userId } }),
    ]);
    return { orders, total };
  }

  async findByIdAndUser(id: string, userId: string) {
    return prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: { include: { product: { select: { name: true, images: true, slug: true } } } },
        address: true,
        tracking: { orderBy: { timestamp: 'asc' } },
      },
    });
  }

  async findAll(skip: number, take: number, status?: string, search?: string) {
    const where: Record<string, unknown> = {};
    if (status) where['status'] = status;
    if (search) {
      where['OR'] = [
        { trackingId: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: where as Parameters<typeof prisma.order.findMany>[0]['where'],
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: { take: 2 },
          address: true,
        },
      }),
      prisma.order.count({
        where: where as Parameters<typeof prisma.order.count>[0]['where'],
      }),
    ]);
    return { orders, total };
  }

  async findByIdAdmin(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        items: { include: { product: true } },
        address: true,
        tracking: { orderBy: { timestamp: 'asc' } },
      },
    });
  }

  async updateStatus(
    orderId: string,
    status: string,
    note: string | undefined,
    updatedBy: string,
    estimatedDelivery?: string,
  ) {
    return prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: status as Parameters<typeof prisma.order.update>[0]['data']['status'],
          ...(estimatedDelivery && { estimatedDelivery: new Date(estimatedDelivery) }),
        },
      }),
      prisma.orderTracking.create({
        data: {
          orderId,
          stage: status as Parameters<typeof prisma.orderTracking.create>[0]['data']['stage'],
          note,
          updatedBy,
        },
      }),
    ]);
  }

  async getTracking(orderId: string) {
    return prisma.orderTracking.findMany({
      where: { orderId },
      orderBy: { timestamp: 'asc' },
    });
  }
}

export const ordersRepository = new OrdersRepository();
