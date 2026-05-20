import { useQuery } from '@tanstack/react-query';
import { trackingService } from '@/services/tracking.service';

export function useTracking(orderId: string) {
  const trackingQuery = useQuery({
    queryKey: ['tracking', orderId],
    queryFn: async () => {
      const res = await trackingService.getByOrder(orderId);
      return res.data.data;
    },
    enabled: !!orderId,
    refetchInterval: 30000, // Auto refresh tracking every 30s
  });

  return {
    stages: trackingQuery.data || [],
    isLoadingTracking: trackingQuery.isLoading,
    refetchTracking: trackingQuery.refetch,
  };
}
