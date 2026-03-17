import type { Meta, StoryObj } from '@storybook/react'
import { ListingImageGallery } from './ListingImageGallery'

const meta = {
  title: 'Entities/Listing/ListingImageGallery',
  component: ListingImageGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      description: 'Array of image URLs',
      control: 'object',
    },
    title: {
      description: 'Title of the listing (used for alt text)',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof ListingImageGallery>

export default meta
type Story = StoryObj<typeof meta>

export const NoPhotos: Story = {
  args: {
    images: [],
    title: 'Test Listing',
  },
}

export const SinglePhoto: Story = {
  args: {
    images: ['https://picsum.photos/seed/test1/800/600.jpg'],
    title: 'Single Photo Listing',
  },
}

export const MultiplePhotos: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/test1/800/600.jpg',
      'https://picsum.photos/seed/test2/800/600.jpg',
      'https://picsum.photos/seed/test3/800/600.jpg',
      'https://picsum.photos/seed/test4/800/600.jpg',
      'https://picsum.photos/seed/test5/800/600.jpg',
    ],
    title: 'Multiple Photos Listing',
  },
}

export const LongTitle: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/long1/800/600.jpg',
      'https://picsum.photos/seed/long2/800/600.jpg',
    ],
    title: 'Very Long Listing Title That Might Be Used for Alt Text and Should Be Properly Handled',
  },
}
