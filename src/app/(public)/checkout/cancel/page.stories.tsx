import type { Meta, StoryObj } from '@storybook/react';
import CheckoutCancelPage from '@/app/(public)/checkout/cancel/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

// Create a mock QueryClient
const createMockQueryClient = (overrides?: {
  hasOrder?: boolean;
  isLoading?: boolean;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const defaultOrder = {
    id: 'order-123',
    listingId: 'listing-456',
    buyerId: 'buyer-789',
    sellerId: 'seller-101',
    status: 'CANCELLED' as const,
    amount: 299.99,
    currency: 'usd',
    checkoutSessionId: 'cs_test_123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (overrides?.hasOrder && !overrides?.isLoading) {
    queryClient.setQueryData(['order', 'order-123'], defaultOrder);
  }

  return queryClient;
};

// Mock Next.js navigation
const mockSearchParams = (orderId: string | null) => {
  return {
    get: (key: string) => (key === 'order_id' ? orderId : null),
    getAll: () => [],
    has: () => false,
    forEach: () => {},
    entries: () => [],
    keys: () => [],
    values: () => [],
    toString: () => '',
    [Symbol.iterator]: function* () {},
  } as unknown as URLSearchParams;
};

const meta = {
  title: 'Pages/Checkout/Cancel',
  component: CheckoutCancelPage,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story, context) => {
      const queryClient = createMockQueryClient(context.parameters.mockData);

      return (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading...</div>}>
            <Story />
          </Suspense>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof CheckoutCancelPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    mockData: {},
    nextjs: {
      navigation: {
        searchParams: mockSearchParams(null),
      },
    },
  },
};

export const WithOrderId: Story = {
  parameters: {
    mockData: {
      hasOrder: true,
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('order-123'),
      },
    },
  },
};

export const Loading: Story = {
  parameters: {
    mockData: {
      hasOrder: true,
      isLoading: true,
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('order-123'),
      },
    },
  },
};
