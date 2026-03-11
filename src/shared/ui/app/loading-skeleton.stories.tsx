import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSkeleton, CardSkeleton } from './loading-skeleton'

const meta: Meta<typeof LoadingSkeleton> = {
  title: 'App/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    lines: {
      control: 'number',
      min: 1,
      max: 10,
    },
    height: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    lines: 3,
  },
}

export const CustomHeight: Story = {
  args: {
    lines: 5,
    height: 'h-6',
  },
}

export const Card: Story = {
  render: () => <CardSkeleton />,
}

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ),
}
