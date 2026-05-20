import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';
import type { ProductFilters } from '@/types/product.types';

export function useProducts(filters: ProductFilters = {}) {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const res = await productService.getAll(filters);
      return res.data;
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await categoryService.getAll();
      return res.data.data;
    },
  });

  const categoryTreeQuery = useQuery({
    queryKey: ['category-tree'],
    queryFn: async () => {
      const res = await categoryService.getTree();
      return res.data.data;
    },
  });

  return {
    products: productsQuery.data?.data || [],
    pagination: productsQuery.data?.pagination,
    isLoadingProducts: productsQuery.isLoading,
    isErrorProducts: productsQuery.isError,
    categories: categoriesQuery.data || [],
    isLoadingCategories: categoriesQuery.isLoading,
    categoryTree: categoryTreeQuery.data || [],
    isLoadingTree: categoryTreeQuery.isLoading,
    refetchProducts: productsQuery.refetch,
  };
}
