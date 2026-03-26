'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useCreateCheckoutSessionMutation } from '../api/useCreateCheckoutSessionMutation';
import { useAuthState } from '@/shared/hooks/use-auth';

interface BuyNowButtonProps {
  listingId: string;
  listingPrice: number;
  sellerId: string;
  currentUserId?: string;
  className?: string;
}

export function BuyNowButton({
  listingId,
  listingPrice,
  sellerId,
  currentUserId,
  className,
}: BuyNowButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthState();
  const createCheckoutSession = useCreateCheckoutSessionMutation();

  const isOwnListing = currentUserId === sellerId;
  const isPending = createCheckoutSession.isPending;

  // Hide button if this is the seller's own listing
  if (isOwnListing) {
    return null;
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // Redirect to login with next parameter
      const currentPath = window.location.pathname;
      router.push(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Create checkout session - mutation handles success redirect
    createCheckoutSession.mutate({ listingId });
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isPending}
      className={className}
      size="lg"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now - ${listingPrice.toFixed(2)}
        </>
      )}
    </Button>
  );
}
