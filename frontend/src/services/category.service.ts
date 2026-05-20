import api from '@/lib/axios';
import type { Category } from '@/types/product.types';
import type { ApiResponse } from '@/types/api.types';

export const categoryService = {
  getAll: () =>
    api.get<ApiResponse<Category[]>>('/categories'),

  getTree: () =>
    api.get<ApiResponse<Category[]>>('/categories/tree'),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Category>>(`/categories/${slug}`),

  create: (data: Partial<Category>) =>
    api.post<ApiResponse<Category>>('/categories', data),

  update: (id: string, data: Partial<Category>) =>
    api.patch<ApiResponse<Category>>(`/categories/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/categories/${id}`),
};
