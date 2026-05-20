import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';

export interface AnalyticsOverview {
  totalRevenueThisMonth: number;
  ordersToday: number;
  newCustomersThisWeek: number;
  pendingTickets: number;
  totalOrders: number;
  totalProducts: number;
}

export interface OrderStatusAnalytic {
  status: string;
  count: number;
}

export interface TopProductAnalytic {
  productId: string;
  name: string;
  _sum: { price: number | null };
  _count: { productId: number };
}

export const analyticsService = {
  getOverview: () =>
    api.get<ApiResponse<AnalyticsOverview>>('/analytics/overview'),

  getRevenue: () =>
    api.get<ApiResponse<Record<string, number>>>('/analytics/revenue'),

  getOrdersStatus: () =>
    api.get<ApiResponse<OrderStatusAnalytic[]>>('/analytics/orders'),

  getTopProducts: () =>
    api.get<ApiResponse<TopProductAnalytic[]>>('/analytics/top-products'),

  getUsersGrowth: () =>
    api.get<ApiResponse<Record<string, number>>>('/analytics/users'),
};
