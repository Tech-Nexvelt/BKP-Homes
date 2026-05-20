import { Request, Response } from 'express';
import { ordersService } from './orders.service';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import type { CreateOrderInput, UpdateOrderStatusInput } from './orders.validator';

export class OrdersController {
  async create(req: Request, res: Response): Promise<void> {
    const order = await ordersService.create(req.user!.userId, req.body as CreateOrderInput);
    sendCreated(res, order, 'Order placed successfully');
  }

  async getMyOrders(req: Request, res: Response): Promise<void> {
    const { page, limit } = req.query;
    const result = await ordersService.getMyOrders(req.user!.userId, page, limit);
    sendSuccess(res, result.orders, 'Orders fetched', 200, result.pagination);
  }

  async getMyOrderById(req: Request, res: Response): Promise<void> {
    const order = await ordersService.getMyOrderById(req.params['id']!, req.user!.userId);
    sendSuccess(res, order, 'Order fetched');
  }

  async getOrderTracking(req: Request, res: Response): Promise<void> {
    const tracking = await ordersService.getOrderTracking(req.params['id']!, req.user!.userId);
    sendSuccess(res, tracking, 'Tracking fetched');
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    const { page, limit, status, search } = req.query;
    const result = await ordersService.getAllOrders(page, limit, status as string | undefined, search as string | undefined);
    sendSuccess(res, result.orders, 'Orders fetched', 200, result.pagination);
  }

  async getAdminOrderById(req: Request, res: Response): Promise<void> {
    const order = await ordersService.getAdminOrderById(req.params['id']!);
    sendSuccess(res, order, 'Order fetched');
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    const data = req.body as UpdateOrderStatusInput;
    const order = await ordersService.updateStatus(req.params['id']!, data, req.user!.userId);
    sendSuccess(res, order, 'Order status updated');
  }

  async addTrackingNote(req: Request, res: Response): Promise<void> {
    const { stage, note } = req.body as { stage: string; note: string };
    const result = await ordersService.addTrackingNote(req.params['id']!, stage, note, req.user!.userId);
    sendSuccess(res, result, 'Tracking note added');
  }
}

export const ordersController = new OrdersController();
