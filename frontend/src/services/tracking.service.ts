import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { OrderTracking } from '@/types/order.types';

export const trackingService = {
  getByOrder: (orderId: string) =>
    api.get<ApiResponse<OrderTracking[]>>(`/tracking/${orderId}`),
};
