import { prisma } from '../../config/database';
import type { CreateProductInput, UpdateProductInput } from './products.validator';

export class ProductsRepository {
  async findAll(params: {
    skip: number;
    take: number;
    where?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
  }) {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where as Parameters<typeof prisma.product.findMany>[0]['where'],
        orderBy: params.orderBy as Parameters<typeof prisma.product.findMany>[0]['orderBy'],
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: true,
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({
        where: params.where as Parameters<typeof prisma.product.count>[0]['where'],
      }),
    ]);
    return { products, total };
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: true,
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { reviews: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true, variants: true },
    });
  }

  async findFeatured(take = 8) {
    return prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      take,
      include: {
        category: { select: { name: true, slug: true } },
        _count: { select: { reviews: true } },
      },
    });
  }

  async findRelated(productId: string, categoryId: string, take = 6) {
    return prisma.product.findMany({
      where: { categoryId, isActive: true, id: { not: productId } },
      take,
      include: { category: { select: { name: true, slug: true } } },
    });
  }

  async create(data: CreateProductInput & { slug: string }) {
    const { variants, ...productData } = data;
    return prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
      },
      include: { variants: true, category: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    const { variants, ...productData } = data;
    return prisma.product.update({
      where: { id },
      data: productData,
      include: { variants: true, category: true },
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return false;
    return excludeId ? product.id !== excludeId : true;
  }
}

export const productsRepository = new ProductsRepository();
