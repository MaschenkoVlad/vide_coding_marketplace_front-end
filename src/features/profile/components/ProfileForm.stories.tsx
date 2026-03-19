import type { Meta, StoryObj } from '@storybook/react'
import { ProfileForm } from './ProfileForm'
import type { UserProfile } from '@/entities/user/model/user.types'

const meta: Meta<typeof ProfileForm> = {
  title: 'Features/Profile/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const mockUser: UserProfile = {
  id: '1',
  email: 'john.doe@example.com',
  role: 'BUYER',
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John Doe',
  city: 'New York',
  phone: '+1234567890',
}

export const Default: Story = {
  args: {
    user: mockUser,
  },
}

export const Loading: Story = {
  args: {
    user: undefined,
  },
}

export const MinimalData: Story = {
  args: {
    user: {
      id: '1',
      email: 'jane@example.com',
      role: 'SELLER',
      firstName: 'Jane',
      lastName: 'Smith',
    },
  },
}

export const AdminUser: Story = {
  args: {
    user: {
      ...mockUser,
      role: 'ADMIN',
      email: 'admin@example.com',
    },
  },
}
