import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/cart.service';
import { useCartStore, type CartItem } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';

export function useCart() {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { items, isOpen, addItem: storeAddItem, removeItem: storeRemoveItem, updateQty: storeUpdateQty, clearCart: storeClearCart, setItems, toggleCart, closeCart, total, count } = useCartStore();

  // Sync cart from server
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await cartService.get();
      const serverItems = (res.data.data as any).items || [];
      const mapped: CartItem[] = serverItems.map((item: any) => ({
        id: item.id,
        productId: item.product.id,
        variantId: item.variantId || undefined,
        name: item.product.name,
        price: item.product.price,
        salePrice: item.product.salePrice || undefined,
        image: item.product.images?.[0] || '',
        qty: item.qty,
        stock: item.product.stock || 99,
      }));
      setItems(mapped);
      return mapped;
    },
    enabled: isAuthenticated,
  });

  // Add item mutation
  const addMutation = useMutation({
    mutationFn: ({ productId, qty, variantId }: { productId: string; qty: number; variantId?: string }) =>
      cartService.add(productId, qty, variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Update item mutation
  const updateMutation = useMutation({
    mutationFn: ({ itemId, qty }: { itemId: string; qty: number }) =>
      cartService.updateItem(itemId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Remove item mutation
  const removeMutation = useMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Clear cart mutation
  const clearMutation = useMutation({
    mutationFn: () => cartService.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const addItem = (item: Omit<CartItem, 'qty'> & { qty?: number }) => {
    const qty = item.qty ?? 1;
    storeAddItem({ ...item, qty });
    toast.success('Added to cart');

    if (isAuthenticated) {
      addMutation.mutate({ productId: item.productId, qty, variantId: item.variantId });
    }
  };

  const removeItem = (productId: string, variantId?: string, itemId?: string) => {
    storeRemoveItem(productId, variantId);
    toast.success('Removed from cart');

    if (isAuthenticated && itemId) {
      removeMutation.mutate(itemId);
    }
  };

  const updateQty = (productId: string, variantId: string | undefined, qty: number, itemId?: string) => {
    storeUpdateQty(productId, variantId, qty);

    if (isAuthenticated && itemId) {
      updateMutation.mutate({ itemId, qty });
    }
  };

  const clearCart = () => {
    storeClearCart();
    if (isAuthenticated) {
      clearMutation.mutate();
    }
  };

  return {
    items,
    isOpen,
    isLoading: cartQuery.isLoading || addMutation.isPending || updateMutation.isPending || removeMutation.isPending || clearMutation.isPending,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    toggleCart,
    closeCart,
    total: total(),
    count: count(),
  };
}
