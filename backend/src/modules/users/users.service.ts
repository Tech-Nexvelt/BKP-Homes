import bcrypt from 'bcryptjs';
import { usersRepository } from './users.repository';
import { HttpError } from '../../middleware/error.middleware';
import { env } from '../../config/env';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.utils';
import type { UpdateProfileInput, ChangePasswordInput, CreateAddressInput, UpdateAddressInput } from './users.validator';

export class UsersService {
  async getMe(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) throw new HttpError('User not found', 404);
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileInput) {
    return usersRepository.updateProfile(userId, data);
  }

  async changePassword(userId: string, data: ChangePasswordInput) {
    const currentPassword = await usersRepository.findPasswordById(userId);
    if (!currentPassword) throw new HttpError('User not found', 404);

    const isValid = await bcrypt.compare(data.currentPassword, currentPassword);
    if (!isValid) throw new HttpError('Current password is incorrect', 400);

    const hashed = await bcrypt.hash(data.newPassword, env.BCRYPT_ROUNDS);
    await usersRepository.updatePassword(userId, hashed);
    return { message: 'Password changed successfully' };
  }

  async deleteMe(userId: string) {
    await usersRepository.deactivate(userId);
    return { message: 'Account deactivated successfully' };
  }

  async getAllUsers(page: unknown, limit: unknown, search?: string) {
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const { users, total } = await usersRepository.findAll(skip, take, search);
    return { users, pagination: buildPaginationMeta(total, p, l) };
  }

  async getUserById(id: string) {
    const user = await usersRepository.findById(id);
    if (!user) throw new HttpError('User not found', 404);
    return user;
  }

  async updateUserRole(id: string, role: 'CUSTOMER' | 'ADMIN' | 'EMPLOYEE') {
    return usersRepository.updateRole(id, role);
  }

  async updateUserStatus(id: string, isActive: boolean) {
    return usersRepository.updateStatus(id, isActive);
  }

  async getAddresses(userId: string) {
    return usersRepository.getAddresses(userId);
  }

  async createAddress(userId: string, data: CreateAddressInput) {
    return usersRepository.createAddress(userId, data);
  }

  async updateAddress(id: string, userId: string, data: UpdateAddressInput) {
    const result = await usersRepository.updateAddress(id, userId, data);
    if (result.count === 0) throw new HttpError('Address not found', 404);
    return { message: 'Address updated' };
  }

  async deleteAddress(id: string, userId: string) {
    const result = await usersRepository.deleteAddress(id, userId);
    if (result.count === 0) throw new HttpError('Address not found', 404);
    return { message: 'Address deleted' };
  }

  async setDefaultAddress(id: string, userId: string) {
    await usersRepository.setDefaultAddress(id, userId);
    return { message: 'Default address updated' };
  }

  async getRecentlyViewed(userId: string) {
    return usersRepository.getRecentlyViewed(userId);
  }
}

export const usersService = new UsersService();
