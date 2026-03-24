'use client';

import { Suspense } from 'react';
import CatalogPageContent from './CatalogPageContent';
import { PageContainer } from '@/shared/ui/app/page-container';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';

const Fallback = () => (
  <PageContainer>
    <div className="py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="flex gap-8">
        {/* Filters Skeleton */}
        <div className="w-80 flex-shrink-0">
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
);

export default function CatalogPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <CatalogPageContent />
    </Suspense>
  );
}
