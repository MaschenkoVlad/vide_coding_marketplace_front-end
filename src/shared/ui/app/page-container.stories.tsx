import type { Meta, StoryObj } from '@storybook/react'
import { PageContainer } from './page-container'

const meta: Meta<typeof PageContainer> = {
  title: 'App/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold">Page Content</h2>
        <p className="text-muted-foreground">This is sample content inside the PageContainer.</p>
      </div>
    ),
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold">Small Container</h2>
        <p className="text-muted-foreground">This container has a smaller maximum width.</p>
      </div>
    ),
  },
}

export const Large: Story = {
  args: {
    size: 'xl',
    children: (
      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold">Large Container</h2>
        <p className="text-muted-foreground">This container has the largest maximum width.</p>
      </div>
    ),
  },
}
