import { prisma } from '../../config/database';
import type { UpdateProfileInput, CreateAddressInput, UpdateAddressInput } from './users.validator';

export class UsersRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        isVerified: true,
        isActive: true,
        dob: true,
        createdAt: true,
      },
    });
  }

  async findAll(skip: number, take: number, search?: string) {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          avatar: true,
          isVerified: true,
          isActive: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async updateProfile(id: string, data: UpdateProfileInput) {
    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        dob: data.dob ? new Date(data.dob) : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        isVerified: true,
        dob: true,
      },
    });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({ where: { id }, data: { password: hashedPassword } });
  }

  async findPasswordById(id: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { id }, select: { password: true } });
    return user?.password ?? null;
  }

  async deactivate(id: string) {
    return prisma.user.update({ where: { id }, data: { isActive: false } });
  }

  async updateRole(id: string, role: 'CUSTOMER' | 'ADMIN' | 'EMPLOYEE') {
    return prisma.user.update({ where: { id }, data: { role } });
  }

  async updateStatus(id: string, isActive: boolean) {
    return prisma.user.update({ where: { id }, data: { isActive } });
  }

  // Addresses
  async getAddresses(userId: string) {
    return prisma.address.findMany({ where: { userId }, orderBy: { isDefault: 'desc' } });
  }

  async createAddress(userId: string, data: CreateAddressInput) {
    const hasDefault = await prisma.address.findFirst({ where: { userId, isDefault: true } });
    return prisma.address.create({
      data: { ...data, userId, isDefault: !hasDefault },
    });
  }

  async updateAddress(id: string, userId: string, data: UpdateAddressInput) {
    return prisma.address.updateMany({ where: { id, userId }, data });
  }

  async deleteAddress(id: string, userId: string) {
    return prisma.address.deleteMany({ where: { id, userId } });
  }

  async setDefaultAddress(id: string, userId: string) {
    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    return prisma.address.updateMany({ where: { id, userId }, data: { isDefault: true } });
  }

  async getRecentlyViewed(userId: string) {
    return prisma.recentlyViewed.findMany({
      where: { userId },
      orderBy: { viewedAt: 'desc' },
      take: 20,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            salePrice: true,
            images: true,
            material: true,
          },
        },
      },
    });
  }
}

export const usersRepository = new UsersRepository();
