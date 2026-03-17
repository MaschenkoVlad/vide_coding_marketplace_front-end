import type { Meta, StoryObj } from '@storybook/react'
import { ListingSellerCard } from './ListingSellerCard'
import type { User } from '@/shared/api/types'

const mockSeller: User = {
  id: '1',
  username: 'tech_enthusiast',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
}

const mockLocation = {
  city: 'New York',
  state: 'NY',
  country: 'USA',
}

const meta = {
  title: 'Entities/Listing/ListingSellerCard',
  component: ListingSellerCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    seller: {
      description: 'Seller information',
      control: 'object',
    },
    location: {
      description: 'Location information',
      control: 'object',
    },
    currentUserId: {
      description: 'Current user ID (for auth checks)',
      control: 'text',
    },
    listingId: {
      description: 'Listing ID',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof ListingSellerCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    seller: mockSeller,
    location: mockLocation,
    listingId: 'listing-1',
  },
}

export const OwnListing: Story = {
  args: {
    seller: mockSeller,
    location: mockLocation,
    currentUserId: '1', // Same as seller ID
    listingId: 'listing-1',
  },
}

export const NoAvatar: Story = {
  args: {
    seller: {
      id: '2',
      username: 'no_avatar_user',
    },
    location: mockLocation,
    listingId: 'listing-2',
  },
}

export const CityOnly: Story = {
  args: {
    seller: mockSeller,
    location: {
      city: 'Los Angeles',
    },
    listingId: 'listing-3',
  },
}

export const LongUsername: Story = {
  args: {
    seller: {
      id: '3',
      username: 'very_long_username_that_might_break_the_layout',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    },
    location: mockLocation,
    listingId: 'listing-4',
  },
}
