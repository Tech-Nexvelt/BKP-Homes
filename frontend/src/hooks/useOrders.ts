import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { CreateOrderPayload } from '@/types/order.types';

export function useOrders() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const createOrderMutation = useMutation({
    mutationFn: (data: CreateOrderPayload) => orderService.create(data),
    onSuccess: (res) => {
      const order = res.data.data;
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/dashboard/orders/${order.id}`);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to place order');
    },
  });

  const getMyOrdersQuery = (page = 1, limit = 10) =>
    useQuery({
      queryKey: ['orders', page, limit],
      queryFn: async () => {
        const res = await orderService.getMyOrders(page, limit);
        return res.data;
      },
    });

  const getOrderDetailsQuery = (id: string) =>
    useQuery({
      queryKey: ['order', id],
      queryFn: async () => {
        const res = await orderService.getById(id);
        return res.data.data;
      },
      enabled: !!id,
    });

  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => orderService.cancel(id),
    onSuccess: (_, id) => {
      toast.success('Order cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    },
  });

  return {
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    getMyOrdersQuery,
    getOrderDetailsQuery,
    cancelOrder: cancelOrderMutation.mutate,
    isCancellingOrder: cancelOrderMutation.isPending,
  };
}
