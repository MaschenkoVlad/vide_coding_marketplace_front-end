import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './empty-state'
import { Button } from '@/shared/ui/shadcn/ui/button'
import { Search, Package } from 'lucide-react'

const meta: Meta<typeof EmptyState> = {
  title: 'App/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'Start by adding your first item to see it here.',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <Search className="h-12 w-12" />,
    title: 'No search results',
    description: 'Try adjusting your search terms or filters.',
  },
}

export const WithAction: Story = {
  args: {
    icon: <Package className="h-12 w-12" />,
    title: 'No listings yet',
    description: 'Create your first listing to get started.',
    action: <Button>Create Listing</Button>,
  },
}
