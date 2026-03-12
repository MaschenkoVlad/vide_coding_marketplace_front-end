import { PageContainer } from '@/shared/ui/app/page-container'
import { EmptyState } from '@/shared/ui/app/empty-state'
import { Package } from 'lucide-react'
import { ProtectedRoute } from '@/components/protected-route'

export default function SellerListingsPage() {
  return (
    <ProtectedRoute requiredRole="SELLER">
      <PageContainer>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
            <p className="text-muted-foreground">Manage your hardware listings and track their performance</p>
          </div>

          <EmptyState
            icon={<Package className="h-12 w-12" />}
            title="Seller Dashboard Coming Soon"
            description="We're building your seller dashboard. You'll soon be able to create, edit, and manage your hardware listings here."
          />
        </div>
      </PageContainer>
    </ProtectedRoute>
  )
}
