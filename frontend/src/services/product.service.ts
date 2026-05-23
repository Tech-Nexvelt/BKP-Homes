import type { Product, ProductFilters } from '@/types/product.types';
import type { ApiResponse } from '@/types/api.types';
import { staticProducts } from '@/lib/staticProducts';

// Helper to wrap static data in Axios-like response format
const wrapResponse = <T>(data: T, pagination?: any) => {
  return {
    data: {
      success: true,
      message: 'Success',
      data,
      ...(pagination ? { pagination } : {}),
    } as ApiResponse<T>,
  };
};

export const productService = {
  getAll: async (filters: ProductFilters = {}) => {
    let result = [...staticProducts];

    // Filter by Category
    if (filters.categoryId) {
      result = result.filter(
        (p) =>
          p.categoryId === filters.categoryId ||
          p.category?.id === filters.categoryId ||
          p.category?.slug === filters.categoryId
      );
    }

    // Filter by Search Query (q)
    if (filters.q) {
      const q = filters.q.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Price
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => {
        const actualPrice = p.salePrice !== undefined && p.salePrice !== null ? p.salePrice : p.price;
        return actualPrice >= (filters.minPrice ?? 0);
      });
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => {
        const actualPrice = p.salePrice !== undefined && p.salePrice !== null ? p.salePrice : p.price;
        return actualPrice <= (filters.maxPrice ?? Infinity);
      });
    }

    // Filter by Material
    if (filters.material) {
      result = result.filter((p) => p.material === filters.material);
    }

    // Filter by Featured
    if (filters.isFeatured !== undefined) {
      result = result.filter((p) => p.isFeatured === filters.isFeatured);
    }

    // Sort
    if (filters.sort) {
      if (filters.sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (filters.sort === 'price_asc') {
        result.sort((a, b) => {
          const priceA = a.salePrice !== undefined && a.salePrice !== null ? a.salePrice : a.price;
          const priceB = b.salePrice !== undefined && b.salePrice !== null ? b.salePrice : b.price;
          return priceA - priceB;
        });
      } else if (filters.sort === 'price_desc') {
        result.sort((a, b) => {
          const priceA = a.salePrice !== undefined && a.salePrice !== null ? a.salePrice : a.price;
          const priceB = b.salePrice !== undefined && b.salePrice !== null ? b.salePrice : b.price;
          return priceB - priceA;
        });
      }
    } else {
      // Default: featured first, then by name
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    const totalItems = result.length;
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = result.slice(startIndex, startIndex + limit);

    const paginationMeta = {
      total: totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
      hasNext: startIndex + limit < totalItems,
      hasPrev: page > 1,
    };

    return wrapResponse(paginatedProducts, paginationMeta);
  },

  getBySlug: async (slug: string) => {
    const product = staticProducts.find((p) => p.slug === slug);
    if (!product) {
      throw new Error(`Product not found with slug: ${slug}`);
    }
    return wrapResponse(product);
  },

  getFeatured: async () => {
    const featured = staticProducts.filter((p) => p.isFeatured).slice(0, 8);
    return wrapResponse(featured);
  },

  search: async (q: string, limit = 6) => {
    const query = q.toLowerCase().trim();
    const matches = staticProducts
      .filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      .slice(0, limit);
    return wrapResponse(matches);
  },

  create: async (data: FormData) => {
    throw new Error('Create product not supported in static mode');
  },

  update: async (id: string, data: Partial<Product>) => {
    throw new Error('Update product not supported in static mode');
  },

  delete: async (id: string) => {
    throw new Error('Delete product not supported in static mode');
  },

  uploadImages: async (id: string, files: FormData) => {
    throw new Error('Upload images not supported in static mode');
  },
};

