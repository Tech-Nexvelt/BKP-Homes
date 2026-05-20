import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services/wishlist.service';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';

export function useWishlist() {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { items, addItem: storeAddItem, removeItem: storeRemoveItem, isInWishlist: storeIsInWishlist, setItems } = useWishlistStore();

  const wishlistQuery = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await wishlistService.get();
      const mapped = res.data.data.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        image: item.product.images?.[0] || '',
        slug: item.product.slug,
      }));
      setItems(mapped);
      return mapped;
    },
    enabled: isAuthenticated,
  });

  const addMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.add(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const toggleWishlist = (product: { id: string; name: string; price: number; images: string[]; slug: string }) => {
    const isFav = storeIsInWishlist(product.id);
    if (isFav) {
      storeRemoveItem(product.id);
      toast.success('Removed from wishlist');
      if (isAuthenticated) {
        removeMutation.mutate(product.id);
      }
    } else {
      storeAddItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        slug: product.slug,
      });
      toast.success('Added to wishlist');
      if (isAuthenticated) {
        addMutation.mutate(product.id);
      }
    }
  };

  return {
    items,
    isLoading: wishlistQuery.isLoading,
    toggleWishlist,
    isInWishlist: (productId: string) => storeIsInWishlist(productId),
  };
}
