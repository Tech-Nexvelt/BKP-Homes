import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';

export interface CustomFurnitureRequest {
  id: string;
  userId: string;
  roomPhotos: string[];
  referenceImages: string[];
  width?: number;
  height?: number;
  depth?: number;
  material?: string;
  color?: string;
  finish?: string;
  budget?: number;
  notes?: string;
  status: string;
  adminNote?: string;
  quotedPrice?: number;
  preferredDate?: string;
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string; phone?: string };
}

export const customFurnitureService = {
  create: (data: Partial<CustomFurnitureRequest>) =>
    api.post<ApiResponse<CustomFurnitureRequest>>('/custom-furniture', data),

  getMyRequests: () =>
    api.get<ApiResponse<CustomFurnitureRequest[]>>('/custom-furniture'),

  // Admin
  getAllRequests: (page = 1, limit = 10, status?: string) =>
    api.get<ApiResponse<CustomFurnitureRequest[]>>('/custom-furniture/admin', { params: { page, limit, status } }),

  updateRequest: (id: string, data: Partial<CustomFurnitureRequest>) =>
    api.patch<ApiResponse<CustomFurnitureRequest>>(`/custom-furniture/admin/${id}`, data),
};
