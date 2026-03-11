import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './login-form'

const meta = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <LoginForm />
      <script>
        {`
          // Simulate error state for story
          setTimeout(() => {
            const form = document.querySelector('form');
            if (form) {
              form.dispatchEvent(new Event('submit', { cancelable: true }));
            }
          }, 100);
        `}
      </script>
    </div>
  ),
}
