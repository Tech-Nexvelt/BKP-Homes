import type { Category } from '@/types/product.types';
import type { ApiResponse } from '@/types/api.types';
import { staticCategories } from '@/lib/staticProducts';

// Helper to wrap static data in Axios-like response format
const wrapResponse = <T>(data: T) => {
  return {
    data: {
      success: true,
      message: 'Success',
      data,
    } as ApiResponse<T>,
  };
};

export const categoryService = {
  getAll: async () => {
    return wrapResponse(staticCategories);
  },

  getTree: async () => {
    return wrapResponse(staticCategories);
  },

  getBySlug: async (slug: string) => {
    const category = staticCategories.find((c) => c.slug === slug);
    if (!category) {
      throw new Error(`Category not found with slug: ${slug}`);
    }
    return wrapResponse(category);
  },

  create: async (data: Partial<Category>) => {
    throw new Error('Create category not supported in static mode');
  },

  update: async (id: string, data: Partial<Category>) => {
    throw new Error('Update category not supported in static mode');
  },

  delete: async (id: string) => {
    throw new Error('Delete category not supported in static mode');
  },
};

