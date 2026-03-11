import type { Meta, StoryObj } from '@storybook/react'
import { RegisterForm } from './register-form'

const meta = {
  title: 'Features/Auth/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValidationError: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <RegisterForm />
      <script>
        {`
          // Simulate validation error for story
          setTimeout(() => {
            const emailInput = document.querySelector('input[type="email"]');
            if (emailInput) {
              emailInput.value = 'invalid-email';
              emailInput.dispatchEvent(new Event('blur'));
            }
          }, 100);
        `}
      </script>
    </div>
  ),
}
