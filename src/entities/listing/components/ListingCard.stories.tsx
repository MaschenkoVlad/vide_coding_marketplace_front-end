import type { Meta, StoryObj } from '@storybook/react'
import { ListingCard } from './ListingCard'
import type { Listing } from '@/shared/api/types'

const mockListing: Listing = {
  id: 'listing-1',
  title: 'NVIDIA RTX 4090 Gaming Graphics Card',
  description: 'Excellent condition, barely used. Upgrading to newer model.',
  price: 1299,
  condition: 'like_new',
  category: {
    id: '1',
    name: 'Graphics Cards',
    slug: 'graphics-cards'
  },
  seller: {
    id: '1',
    username: 'tech_enthusiast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
  },
  location: {
    city: 'New York',
    country: 'USA'
  },
  images: [
    'https://picsum.photos/seed/rtx4090/400/300.jpg',
    'https://picsum.photos/seed/rtx4090-2/400/300.jpg'
  ],
  createdAt: '2024-03-10T10:00:00Z',
  updatedAt: '2024-03-10T10:00:00Z',
  views: 156
}

const mockListingCheap: Listing = {
  ...mockListing,
  id: 'listing-2',
  title: 'GTX 1660 Super Graphics Card',
  price: 150,
  condition: 'good',
  category: {
    id: '1',
    name: 'Graphics Cards',
    slug: 'graphics-cards'
  },
  views: 89
}

const mockListingPoor: Listing = {
  ...mockListing,
  id: 'listing-3',
  title: 'Old AMD Radeon HD 7850',
  price: 45,
  condition: 'poor',
  category: {
    id: '1',
    name: 'Graphics Cards',
    slug: 'graphics-cards'
  },
  views: 234
}

const meta: Meta<typeof ListingCard> = {
  title: 'Entities/Listing/ListingCard',
  component: ListingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    listing: mockListing,
  },
}

export const Cheap: Story = {
  args: {
    listing: mockListingCheap,
  },
}

export const PoorCondition: Story = {
  args: {
    listing: mockListingPoor,
  },
}

export const NewCondition: Story = {
  args: {
    listing: {
      ...mockListing,
      id: 'listing-4',
      title: 'Brand New RTX 4080',
      price: 1199,
      condition: 'new',
      views: 45
    },
  },
}

export const FairCondition: Story = {
  args: {
    listing: {
      ...mockListing,
      id: 'listing-5',
      title: 'Used RTX 3070',
      price: 399,
      condition: 'fair',
      views: 178
    },
  },
}

export const WithCustomClassName: Story = {
  args: {
    listing: mockListing,
    className: 'border-2 border-blue-500',
  },
}
