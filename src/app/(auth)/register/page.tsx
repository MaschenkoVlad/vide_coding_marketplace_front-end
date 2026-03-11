import { RegisterForm } from '@/features/auth/components/register-form'
import { PageContainer } from '@/shared/ui/app/page-container'

export default function RegisterPage() {
  return (
    <PageContainer size="sm">
      <div className="min-h-screen flex items-center justify-center">
        <RegisterForm />
      </div>
    </PageContainer>
  )
}
