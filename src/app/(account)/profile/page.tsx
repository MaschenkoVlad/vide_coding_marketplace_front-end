import { PageContainer } from '@/shared/ui/app/page-container'
import { EmptyState } from '@/shared/ui/app/empty-state'
import { User } from 'lucide-react'

export default function ProfilePage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and marketplace activity
          </p>
        </div>

        <EmptyState
          icon={<User className="h-12 w-12" />}
          title="Profile Coming Soon"
          description="We're working on your profile dashboard. You'll soon be able to manage your listings, orders, and account settings here."
        />
      </div>
    </PageContainer>
  )
}
