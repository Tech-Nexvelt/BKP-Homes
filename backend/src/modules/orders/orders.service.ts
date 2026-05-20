import { ordersRepository } from './orders.repository';
import { HttpError } from '../../middleware/error.middleware';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.utils';
import { sendOrderConfirmationEmail } from '../../utils/mailer.utils';
import { prisma } from '../../config/database';
import type { CreateOrderInput, UpdateOrderStatusInput } from './orders.validator';

export class OrdersService {
  async create(userId: string, data: CreateOrderInput) {
    const order = await ordersRepository.create(userId, data);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    if (user) {
      await sendOrderConfirmationEmail(
        user.email,
        user.name,
        order.id,
        order.trackingId,
        order.totalAmount,
      );
    }

    await prisma.notification.create({
      data: {
        userId,
        type: 'order',
        title: 'Order Confirmed!',
        message: `Your order #${order.trackingId} has been confirmed.`,
        link: `/dashboard/orders/${order.id}`,
      },
    });

    return order;
  }

  async getMyOrders(userId: string, page: unknown, limit: unknown) {
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const { orders, total } = await ordersRepository.findByUser(userId, skip, take);
    return { orders, pagination: buildPaginationMeta(total, p, l) };
  }

  async getMyOrderById(id: string, userId: string) {
    const order = await ordersRepository.findByIdAndUser(id, userId);
    if (!order) throw new HttpError('Order not found', 404);
    return order;
  }

  async getOrderTracking(orderId: string, userId: string) {
    const order = await ordersRepository.findByIdAndUser(orderId, userId);
    if (!order) throw new HttpError('Order not found', 404);
    return ordersRepository.getTracking(orderId);
  }

  async getAllOrders(page: unknown, limit: unknown, status?: string, search?: string) {
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const { orders, total } = await ordersRepository.findAll(skip, take, status, search);
    return { orders, pagination: buildPaginationMeta(total, p, l) };
  }

  async getAdminOrderById(id: string) {
    const order = await ordersRepository.findByIdAdmin(id);
    if (!order) throw new HttpError('Order not found', 404);
    return order;
  }

  async updateStatus(orderId: string, data: UpdateOrderStatusInput, adminId: string) {
    const order = await ordersRepository.findByIdAdmin(orderId);
    if (!order) throw new HttpError('Order not found', 404);

    const [updatedOrder] = await ordersRepository.updateStatus(
      orderId,
      data.status,
      data.note,
      adminId,
      data.estimatedDelivery,
    );

    await prisma.notification.create({
      data: {
        userId: order.userId,
        type: 'order',
        title: 'Order Update',
        message: `Your order #${order.trackingId} status has been updated to ${data.status.replace(/_/g, ' ')}.`,
        link: `/dashboard/orders/${order.id}`,
      },
    });

    return updatedOrder;
  }

  async addTrackingNote(orderId: string, stage: string, note: string, adminId: string) {
    return prisma.orderTracking.create({
      data: {
        orderId,
        stage: stage as Parameters<typeof prisma.orderTracking.create>[0]['data']['stage'],
        note,
        updatedBy: adminId,
      },
    });
  }
}

export const ordersService = new OrdersService();
