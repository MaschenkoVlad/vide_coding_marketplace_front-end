'use client';

import { useMutation } from '@tanstack/react-query';
import { checkoutAPI } from '@/shared/api/checkout-api';
import { toast } from '@/shared/ui/hooks/use-toast';
import type { CreateCheckoutSessionRequest } from '@/shared/api/checkout-types';

export function useCreateCheckoutSessionMutation() {
  return useMutation({
    mutationFn: async (data: CreateCheckoutSessionRequest) => {
      return checkoutAPI.createCheckoutSession(data);
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      window.location.assign(data.checkoutUrl);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Failed to create checkout session';
      toast({
        title: 'Checkout Error',
        description: message,
        variant: 'destructive',
      });
    },
  });
}
