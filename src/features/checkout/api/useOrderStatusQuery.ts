'use client';

import { useQuery } from '@tanstack/react-query';
import { checkoutAPI } from '@/shared/api/checkout-api';

export function useOrderByCheckoutSessionQuery(sessionId: string | null) {
  return useQuery({
    queryKey: ['order', 'checkout-session', sessionId],
    queryFn: () => {
      if (!sessionId) {
        throw new Error('Session ID is required');
      }
      return checkoutAPI.getOrderByCheckoutSession(sessionId);
    },
    enabled: !!sessionId,
    refetchInterval: (query) => {
      const order = query.state.data;
      // Poll every 3 seconds if order is pending payment, stop after 60 seconds
      if (order?.status === 'PENDING_PAYMENT') {
        return 3000;
      }
      return false;
    },
    refetchIntervalInBackground: false,
    staleTime: 1000,
  });
}

export function useOrderByIdQuery(orderId: string | null) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => {
      if (!orderId) {
        throw new Error('Order ID is required');
      }
      return checkoutAPI.getOrderById(orderId);
    },
    enabled: !!orderId,
    refetchInterval: (query) => {
      const order = query.state.data;
      // Poll every 3 seconds if order is pending payment
      if (order?.status === 'PENDING_PAYMENT') {
        return 3000;
      }
      return false;
    },
    refetchIntervalInBackground: false,
    staleTime: 1000,
  });
}
