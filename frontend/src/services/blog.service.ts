import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { Blog } from '@/types/blog.types';

export interface BlogFilters {
  page?: number;
  limit?: number;
  category?: string;
  q?: string;
}

export const blogService = {
  getAll: (filters: BlogFilters = {}) =>
    api.get<ApiResponse<Blog[]>>('/blog', { params: filters }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Blog>>(`/blog/${slug}`),

  // Admin
  create: (data: Partial<Blog>) =>
    api.post<ApiResponse<Blog>>('/blog', data),

  update: (id: string, data: Partial<Blog>) =>
    api.patch<ApiResponse<Blog>>(`/blog/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/blog/${id}`),
};
