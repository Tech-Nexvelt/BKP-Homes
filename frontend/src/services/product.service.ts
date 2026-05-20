import api from '@/lib/axios';
import type { Product, ProductFilters } from '@/types/product.types';
import type { ApiResponse } from '@/types/api.types';

export const productService = {
  getAll: (filters: ProductFilters = {}) =>
    api.get<ApiResponse<Product[]>>('/products', { params: filters }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<Product[]>>('/products?isFeatured=true&limit=8'),

  search: (q: string, limit = 6) =>
    api.get<ApiResponse<Product[]>>('/products', { params: { q, limit } }),

  create: (data: FormData) =>
    api.post<ApiResponse<Product>>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id: string, data: Partial<Product>) =>
    api.patch<ApiResponse<Product>>(`/products/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/products/${id}`),

  uploadImages: (id: string, files: FormData) =>
    api.post<ApiResponse<{ images: string[] }>>(`/products/${id}/images`, files, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
