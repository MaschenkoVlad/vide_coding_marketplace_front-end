'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/shared/ui/app/page-container';
import { EmptyState } from '@/shared/ui/app/empty-state';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';
import { CatalogFilters } from '@/features/catalog-filters/components/CatalogFilters';
import { ListingCard } from '@/entities/listing/components/ListingCard';
import { useListingsQuery } from '@/features/listings/api/useListingsQuery';
import {
  createQueryString,
  getFiltersFromURL,
  hasActiveFilters,
} from '@/features/catalog-filters/lib/filter-serialization';
import type { ListingFilters, PaginationParams } from '@/shared/api/types';
import { Search, Package } from 'lucide-react';
import { Pagination } from '@/shared/ui/Pagination';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filters and pagination from URL
  const { filters: initialFilters, pagination: initialPagination } = getFiltersFromURL(searchParams);

  const [filters, setFilters] = useState<ListingFilters>(initialFilters);
  const [pagination, setPagination] = useState<PaginationParams>(initialPagination);

  // Unified handler for updating URL with new state
  const updateURL = useCallback(
    (newFilters: ListingFilters, newPagination: PaginationParams) => {
      const queryString = createQueryString(newFilters, newPagination);
      const url = queryString ? `/catalog?${queryString}` : '/catalog';
      router.push(url, { scroll: false });
    },
    [router]
  );

  // Handle filter changes
  const handleFiltersChange = useCallback(
    (newFilters: ListingFilters) => {
      const newPagination = { ...pagination, page: 1 }; // Reset to first page when filters change
      setFilters(newFilters);
      setPagination(newPagination);
      updateURL(newFilters, newPagination);
    },
    [pagination, updateURL]
  );

  // Handle pagination changes
  const handlePageChange = useCallback(
    (newPage: number) => {
      const newPagination = { ...pagination, page: newPage };
      setPagination(newPagination);
      updateURL(filters, newPagination);
    },
    [filters, pagination, updateURL]
  );

  // Handle browser navigation (back/forward)
  useEffect(() => {
    const { filters: urlFilters, pagination: urlPagination } = getFiltersFromURL(searchParams);
    setFilters(urlFilters);
    setPagination(urlPagination);
  }, [searchParams]);

  const { data, isLoading, error, prefetchNextPage, prefetchPrevPage } = useListingsQuery({
    ...filters,
    ...pagination,
  });

  // Loading state
  if (isLoading && !data) {
    return (
      <PageContainer>
        <div className="py-8">
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
  }

  // Error state
  if (error) {
    return (
      <PageContainer>
        <div className="py-8">
          <EmptyState
            title="Something went wrong"
            description="We couldn't load listings. Please try again later."
            icon={<Package className="h-12 w-12" />}
          />
        </div>
      </PageContainer>
    );
  }

  // Empty state
  if (!isLoading && data?.listings.length === 0) {
    return (
      <PageContainer>
        <div className="py-8">
          <div className="flex gap-8">
            <div className="w-80 flex-shrink-0">
              <CatalogFilters filters={filters} onFiltersChange={handleFiltersChange} />
            </div>
            <div className="flex-1">
              <EmptyState
                title="No listings found"
                description={
                  hasActiveFilters(filters)
                    ? 'Try adjusting your filters to see more results.'
                    : 'Check back later for new listings.'
                }
                icon={<Search className="h-12 w-12" />}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Browse Listings</h1>
          <p className="text-muted-foreground">
            {data?.pagination.total
              ? `Showing ${data.listings.length} of ${data.pagination.total} listings`
              : 'Browse our collection of used computer hardware'}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <CatalogFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Listings Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data?.listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} className="h-full transition-shadow hover:shadow-lg" />
              ))}
            </div>

            {/* Pagination */}
            {data && (
              <Pagination
                pagination={data.pagination}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                prefetchNextPage={prefetchNextPage}
                prefetchPrevPage={prefetchPrevPage}
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
