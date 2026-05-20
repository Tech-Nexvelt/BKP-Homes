import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';

export interface WishlistItemResponse {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    images: string[];
    material: string | null;
  };
}

export const wishlistService = {
  get: () => api.get<ApiResponse<WishlistItemResponse[]>>('/wishlist'),
  add: (productId: string) => api.post<ApiResponse<WishlistItemResponse>>(`/wishlist/${productId}`),
  remove: (productId: string) => api.delete<ApiResponse<null>>(`/wishlist/${productId}`),
};
