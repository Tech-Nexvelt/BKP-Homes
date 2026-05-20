import { Request, Response } from 'express';
import { usersService } from './users.service';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import type { UpdateProfileInput, ChangePasswordInput, CreateAddressInput, UpdateAddressInput } from './users.validator';

export class UsersController {
  async getMe(req: Request, res: Response): Promise<void> {
    const user = await usersService.getMe(req.user!.userId);
    sendSuccess(res, user, 'Profile fetched');
  }

  async updateMe(req: Request, res: Response): Promise<void> {
    const data = req.body as UpdateProfileInput;
    const user = await usersService.updateProfile(req.user!.userId, data);
    sendSuccess(res, user, 'Profile updated');
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const data = req.body as ChangePasswordInput;
    const result = await usersService.changePassword(req.user!.userId, data);
    sendSuccess(res, result, result.message);
  }

  async deleteMe(req: Request, res: Response): Promise<void> {
    const result = await usersService.deleteMe(req.user!.userId);
    sendSuccess(res, result, result.message);
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const { page, limit, search } = req.query;
    const result = await usersService.getAllUsers(page, limit, search as string | undefined);
    sendSuccess(res, result.users, 'Users fetched', 200, result.pagination);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await usersService.getUserById(req.params['id']!);
    sendSuccess(res, user, 'User fetched');
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    const { role } = req.body as { role: 'CUSTOMER' | 'ADMIN' | 'EMPLOYEE' };
    const user = await usersService.updateUserRole(req.params['id']!, role);
    sendSuccess(res, user, 'Role updated');
  }

  async updateUserStatus(req: Request, res: Response): Promise<void> {
    const { isActive } = req.body as { isActive: boolean };
    const user = await usersService.updateUserStatus(req.params['id']!, isActive);
    sendSuccess(res, user, 'Status updated');
  }

  async getAddresses(req: Request, res: Response): Promise<void> {
    const addresses = await usersService.getAddresses(req.user!.userId);
    sendSuccess(res, addresses, 'Addresses fetched');
  }

  async createAddress(req: Request, res: Response): Promise<void> {
    const data = req.body as CreateAddressInput;
    const address = await usersService.createAddress(req.user!.userId, data);
    sendCreated(res, address, 'Address created');
  }

  async updateAddress(req: Request, res: Response): Promise<void> {
    const data = req.body as UpdateAddressInput;
    const result = await usersService.updateAddress(req.params['id']!, req.user!.userId, data);
    sendSuccess(res, result, result.message);
  }

  async deleteAddress(req: Request, res: Response): Promise<void> {
    const result = await usersService.deleteAddress(req.params['id']!, req.user!.userId);
    sendSuccess(res, result, result.message);
  }

  async setDefaultAddress(req: Request, res: Response): Promise<void> {
    const result = await usersService.setDefaultAddress(req.params['id']!, req.user!.userId);
    sendSuccess(res, result, result.message);
  }

  async getRecentlyViewed(req: Request, res: Response): Promise<void> {
    const items = await usersService.getRecentlyViewed(req.user!.userId);
    sendSuccess(res, items, 'Recently viewed fetched');
  }
}

export const usersController = new UsersController();
