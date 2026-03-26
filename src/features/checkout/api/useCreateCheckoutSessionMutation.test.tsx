import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useCreateCheckoutSessionMutation } from './useCreateCheckoutSessionMutation';
import { checkoutAPI } from '@/shared/api/checkout-api';

// Mock the checkout API
vi.mock('@/shared/api/checkout-api', () => ({
  checkoutAPI: {
    createCheckoutSession: vi.fn(),
  },
}));

// Mock the toast hook
vi.mock('@/shared/ui/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

// Mock window.location.assign
const mockAssign = vi.fn();
Object.defineProperty(window, 'location', {
  value: { assign: mockAssign },
  writable: true,
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useCreateCheckoutSessionMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call createCheckoutSession API with correct parameters', async () => {
    const mockResponse = {
      checkoutUrl: 'https://checkout.stripe.com/pay/cs_test_abc123',
      orderId: 'order_xyz789',
    };

    vi.mocked(checkoutAPI.createCheckoutSession).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCreateCheckoutSessionMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ listingId: 'listing-123' });

    await waitFor(() => {
      expect(checkoutAPI.createCheckoutSession).toHaveBeenCalledWith({ listingId: 'listing-123' });
    });
  });

  it('should redirect to Stripe Checkout URL on success', async () => {
    const mockResponse = {
      checkoutUrl: 'https://checkout.stripe.com/pay/cs_test_abc123',
      orderId: 'order_xyz789',
    };

    vi.mocked(checkoutAPI.createCheckoutSession).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCreateCheckoutSessionMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ listingId: 'listing-123' });

    await waitFor(() => {
      expect(mockAssign).toHaveBeenCalledWith(mockResponse.checkoutUrl);
    });
  });

  it('should set isPending to true while mutation is in progress', async () => {
    const mockResponse = {
      checkoutUrl: 'https://checkout.stripe.com/pay/cs_test_abc123',
      orderId: 'order_xyz789',
    };

    // Create a promise that we can control
    let resolvePromise: (value: typeof mockResponse) => void;
    const promise = new Promise<typeof mockResponse>((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(checkoutAPI.createCheckoutSession).mockReturnValueOnce(promise);

    const { result } = renderHook(() => useCreateCheckoutSessionMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ listingId: 'listing-123' });

    // Check that isPending is true immediately after calling mutate
    expect(result.current.isPending).toBe(true);

    // Resolve the promise
    resolvePromise!(mockResponse);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });

  it('should handle 401 error and show toast with error message', async () => {
    const error = new Error('Unauthorized');
    vi.mocked(checkoutAPI.createCheckoutSession).mockRejectedValueOnce(error);

    const { toast } = await import('@/shared/ui/hooks/use-toast');

    const { result } = renderHook(() => useCreateCheckoutSessionMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ listingId: 'listing-123' });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Checkout Error',
        description: 'Unauthorized',
        variant: 'destructive',
      });
    });
  });

  it('should handle 409 conflict error (listing unavailable)', async () => {
    const error = new Error('Listing unavailable');
    vi.mocked(checkoutAPI.createCheckoutSession).mockRejectedValueOnce(error);

    const { toast } = await import('@/shared/ui/hooks/use-toast');

    const { result } = renderHook(() => useCreateCheckoutSessionMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ listingId: 'listing-123' });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Checkout Error',
        description: 'Listing unavailable',
        variant: 'destructive',
      });
    });
  });

  it('should handle generic error with fallback message', async () => {
    const error = new Error('');
    vi.mocked(checkoutAPI.createCheckoutSession).mockRejectedValueOnce(error);

    const { toast } = await import('@/shared/ui/hooks/use-toast');

    const { result } = renderHook(() => useCreateCheckoutSessionMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ listingId: 'listing-123' });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Checkout Error',
        description: 'Failed to create checkout session',
        variant: 'destructive',
      });
    });
  });
});
