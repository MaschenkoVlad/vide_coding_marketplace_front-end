import type { Meta, StoryObj } from '@storybook/react'
import { CatalogFilters } from './CatalogFilters'
import type { ListingFilters } from '@/shared/api/types'

const meta: Meta<typeof CatalogFilters> = {
  title: 'Features/Catalog Filters/CatalogFilters',
  component: CatalogFilters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const mockFiltersChange = (filters: ListingFilters) => {
  console.log('Filters changed:', filters)
}

export const Default: Story = {
  args: {
    filters: {},
    onFiltersChange: mockFiltersChange,
  },
}

export const WithCategoryFilter: Story = {
  args: {
    filters: {
      category: 'graphics-cards'
    },
    onFiltersChange: mockFiltersChange,
  },
}

export const WithConditionFilter: Story = {
  args: {
    filters: {
      condition: 'good'
    },
    onFiltersChange: mockFiltersChange,
  },
}

export const WithPriceRange: Story = {
  args: {
    filters: {
      minPrice: 100,
      maxPrice: 500
    },
    onFiltersChange: mockFiltersChange,
  },
}

export const WithCityFilter: Story = {
  args: {
    filters: {
      city: 'New York'
    },
    onFiltersChange: mockFiltersChange,
  },
}

export const WithSortFilter: Story = {
  args: {
    filters: {
      sort: 'price_asc'
    },
    onFiltersChange: mockFiltersChange,
  },
}

export const WithMultipleFilters: Story = {
  args: {
    filters: {
      category: 'graphics-cards',
      condition: 'like_new',
      minPrice: 200,
      maxPrice: 1000,
      city: 'Los Angeles',
      sort: 'newest'
    },
    onFiltersChange: mockFiltersChange,
  },
}

export const WithCustomClassName: Story = {
  args: {
    filters: {},
    onFiltersChange: mockFiltersChange,
    className: 'w-96',
  },
}
