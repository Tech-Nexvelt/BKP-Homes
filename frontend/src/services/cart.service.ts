import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';

export const cartService = {
  get: () => api.get<ApiResponse<unknown>>('/cart'),
  add: (productId: string, qty: number, variantId?: string) =>
    api.post<ApiResponse<unknown>>('/cart/add', { productId, qty, variantId }),
  updateItem: (itemId: string, qty: number) =>
    api.patch<ApiResponse<unknown>>(`/cart/item/${itemId}`, { qty }),
  removeItem: (itemId: string) =>
    api.delete<ApiResponse<null>>(`/cart/item/${itemId}`),
  clear: () => api.delete<ApiResponse<null>>('/cart/clear'),
};
