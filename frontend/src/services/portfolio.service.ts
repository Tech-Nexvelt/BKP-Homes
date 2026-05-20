import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { Portfolio } from '@/types/blog.types';

export const portfolioService = {
  getAll: (roomType?: string) =>
    api.get<ApiResponse<Portfolio[]>>('/portfolio', { params: roomType ? { roomType } : undefined }),

  getById: (id: string) =>
    api.get<ApiResponse<Portfolio>>(`/portfolio/${id}`),

  // Admin
  create: (data: Partial<Portfolio>) =>
    api.post<ApiResponse<Portfolio>>('/portfolio', data),

  update: (id: string, data: Partial<Portfolio>) =>
    api.patch<ApiResponse<Portfolio>>(`/portfolio/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/portfolio/${id}`),
};
