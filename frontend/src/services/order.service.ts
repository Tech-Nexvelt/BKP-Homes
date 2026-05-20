import api from '@/lib/axios';
import type { Order, CreateOrderPayload } from '@/types/order.types';
import type { ApiResponse } from '@/types/api.types';

export const orderService = {
  create: (data: CreateOrderPayload) =>
    api.post<ApiResponse<Order>>('/orders', data),

  getMyOrders: (page = 1, limit = 10) =>
    api.get<ApiResponse<Order[]>>('/orders', { params: { page, limit } }),

  getById: (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`),

  cancel: (id: string) =>
    api.patch<ApiResponse<Order>>(`/orders/${id}/cancel`),

  // Admin
  getAllOrders: (params: Record<string, unknown> = {}) =>
    api.get<ApiResponse<Order[]>>('/orders/admin', { params }),

  updateStatus: (id: string, status: string, note?: string) =>
    api.patch<ApiResponse<Order>>(`/orders/admin/${id}/status`, { status, note }),
};
