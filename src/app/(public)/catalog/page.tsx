import { PageContainer } from '@/shared/ui/app/page-container'
import { EmptyState } from '@/shared/ui/app/empty-state'
import { Search } from 'lucide-react'

export default function CatalogPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catalog</h1>
          <p className="text-muted-foreground">
            Browse our selection of used computer hardware
          </p>
        </div>

        <EmptyState
          icon={<Search className="h-12 w-12" />}
          title="Catalog Coming Soon"
          description="We're working hard to bring you the best selection of used computer hardware. Check back soon!"
        />
      </div>
    </PageContainer>
  )
}
