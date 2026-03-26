import type { Meta, StoryObj } from '@storybook/react';
import CheckoutSuccessPage from '@/app/(public)/checkout/success/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

// Create a mock QueryClient
const createMockQueryClient = (overrides?: {
  orderStatus?: 'PENDING_PAYMENT' | 'PAID' | 'FAILED';
  isLoading?: boolean;
  error?: Error | null;
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
    status: overrides?.orderStatus ?? 'PAID',
    amount: 299.99,
    currency: 'usd',
    checkoutSessionId: 'cs_test_123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!overrides?.isLoading && !overrides?.error) {
    queryClient.setQueryData(['order', 'checkout-session', 'cs_test_123'], defaultOrder);
  }

  return queryClient;
};

// Mock Next.js navigation
const mockSearchParams = (sessionId: string | null) => {
  return {
    get: (key: string) => (key === 'session_id' ? sessionId : null),
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
  title: 'Pages/Checkout/Success',
  component: CheckoutSuccessPage,
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
} satisfies Meta<typeof CheckoutSuccessPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paid: Story = {
  parameters: {
    mockData: {
      orderStatus: 'PAID',
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('cs_test_123'),
      },
    },
  },
};

export const Pending: Story = {
  parameters: {
    mockData: {
      orderStatus: 'PENDING_PAYMENT',
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('cs_test_123'),
      },
    },
  },
};

export const Failed: Story = {
  parameters: {
    mockData: {
      orderStatus: 'FAILED',
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('cs_test_123'),
      },
    },
  },
};

export const Loading: Story = {
  parameters: {
    mockData: {
      isLoading: true,
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('cs_test_123'),
      },
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    mockData: {
      error: new Error('Order not found'),
    },
    nextjs: {
      navigation: {
        searchParams: mockSearchParams('cs_test_123'),
      },
    },
  },
};
