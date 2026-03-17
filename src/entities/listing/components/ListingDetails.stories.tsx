import type { Meta, StoryObj } from '@storybook/react'
import { ListingDetails } from './ListingDetails'
import type { Listing } from '@/shared/api/types'

const mockListing: Listing = {
  id: 'listing-1',
  title: 'NVIDIA RTX 4090 Gaming Graphics Card',
  description: 'Excellent condition, barely used. Upgrading to newer model. Comes with original box and all accessories. Perfect for 4K gaming and content creation.',
  price: 1299,
  condition: 'like_new',
  category: {
    id: '1',
    name: 'Graphics Cards',
    slug: 'graphics-cards',
  },
  seller: {
    id: '1',
    username: 'tech_enthusiast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  },
  location: {
    city: 'New York',
    state: 'NY',
    country: 'USA',
  },
  images: [
    'https://picsum.photos/seed/gpu1/800/600.jpg',
    'https://picsum.photos/seed/gpu2/800/600.jpg',
    'https://picsum.photos/seed/gpu3/800/600.jpg',
  ],
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
  views: 156,
}

const meta = {
  title: 'Entities/Listing/ListingDetails',
  component: ListingDetails,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    listing: {
      description: 'Listing data to display',
      control: 'object',
    },
    currentUserId: {
      description: 'Current user ID (for auth checks)',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof ListingDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    listing: mockListing,
  },
}

export const OwnListing: Story = {
  args: {
    listing: mockListing,
    currentUserId: '1', // Same as seller ID
  },
}

export const NewCondition: Story = {
  args: {
    listing: {
      ...mockListing,
      condition: 'new',
      price: 1499,
      title: 'Brand New NVIDIA RTX 4090 Gaming Graphics Card',
    },
  },
}

export const GoodCondition: Story = {
  args: {
    listing: {
      ...mockListing,
      condition: 'good',
      price: 999,
      title: 'Used NVIDIA RTX 4090 Gaming Graphics Card - Good Condition',
      description: 'Good working condition, minor cosmetic wear. Still performs excellently for all gaming needs.',
    },
  },
}

export const NoImages: Story = {
  args: {
    listing: {
      ...mockListing,
      images: [],
    },
  },
}

export const SingleImage: Story = {
  args: {
    listing: {
      ...mockListing,
      images: ['https://picsum.photos/seed/single/800/600.jpg'],
    },
  },
}

export const HighPrice: Story = {
  args: {
    listing: {
      ...mockListing,
      price: 2499,
      title: 'Premium NVIDIA RTX 4090 Gaming Graphics Card - Limited Edition',
    },
  },
}

export const LowPrice: Story = {
  args: {
    listing: {
      ...mockListing,
      price: 599,
      condition: 'fair',
      title: 'Budget NVIDIA RTX 4090 Gaming Graphics Card',
      description: 'Fair condition, shows signs of wear but still functional. Great for budget builds.',
    },
  },
}
