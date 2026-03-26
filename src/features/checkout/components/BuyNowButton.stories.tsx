import type { Meta, StoryObj } from '@storybook/react';
import { BuyNowButton } from './BuyNowButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Create a wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

const meta = {
  title: 'Features/Checkout/BuyNowButton',
  component: BuyNowButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const Wrapper = createWrapper();
      return (
        <Wrapper>
          <Story />
        </Wrapper>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BuyNowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    listingId: 'listing-123',
    listingPrice: 299.99,
    sellerId: 'seller-456',
    currentUserId: 'buyer-789',
  },
  parameters: {
    mockData: {
      auth: { isAuthenticated: true },
    },
  },
};

export const Loading: Story = {
  args: {
    listingId: 'listing-123',
    listingPrice: 299.99,
    sellerId: 'seller-456',
    currentUserId: 'buyer-789',
  },
  parameters: {
    mockData: {
      auth: { isAuthenticated: true },
      checkout: { isPending: true },
    },
  },
};

export const SellerView: Story = {
  args: {
    listingId: 'listing-123',
    listingPrice: 299.99,
    sellerId: 'seller-456',
    currentUserId: 'seller-456', // Same as sellerId
  },
  parameters: {
    mockData: {
      auth: { isAuthenticated: true },
    },
  },
};

export const GuestUser: Story = {
  args: {
    listingId: 'listing-123',
    listingPrice: 299.99,
    sellerId: 'seller-456',
    currentUserId: undefined, // Not logged in
  },
  parameters: {
    mockData: {
      auth: { isAuthenticated: false },
    },
  },
};

export const HighPrice: Story = {
  args: {
    listingId: 'listing-123',
    listingPrice: 2499.99,
    sellerId: 'seller-456',
    currentUserId: 'buyer-789',
  },
  parameters: {
    mockData: {
      auth: { isAuthenticated: true },
    },
  },
};

export const LowPrice: Story = {
  args: {
    listingId: 'listing-123',
    listingPrice: 19.99,
    sellerId: 'seller-456',
    currentUserId: 'buyer-789',
  },
  parameters: {
    mockData: {
      auth: { isAuthenticated: true },
    },
  },
};
