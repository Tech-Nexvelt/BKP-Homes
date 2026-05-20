import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { Review } from '@/types/product.types';

export interface ProductReviewsResponse {
  reviews: Review[];
  avgRating: number;
  total: number;
}

export const reviewService = {
  getByProduct: (productId: string) =>
    api.get<ApiResponse<ProductReviewsResponse>>(`/reviews/products/${productId}/reviews`),

  create: (productId: string, data: { rating: number; title?: string; comment: string; images?: string[] }) =>
    api.post<ApiResponse<Review>>(`/reviews/products/${productId}/reviews`, data),

  update: (reviewId: string, data: Partial<{ rating: number; title: string; comment: string; images: string[] }>) =>
    api.patch<ApiResponse<Review>>(`/reviews/reviews/${reviewId}`, data),

  delete: (reviewId: string) =>
    api.delete<ApiResponse<null>>(`/reviews/reviews/${reviewId}`),
};
