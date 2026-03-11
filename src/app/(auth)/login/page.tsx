import { LoginForm } from '@/features/auth/components/login-form'
import { PageContainer } from '@/shared/ui/app/page-container'

export default function LoginPage() {
  return (
    <PageContainer size="sm">
      <div className="min-h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </PageContainer>
  )
}
