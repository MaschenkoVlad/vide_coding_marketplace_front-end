'use client';

import { useListing } from '@/features/listings/api/useListingQuery';
import { ListingDetails } from '@/entities/listing/components/ListingDetails';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';
import { Alert, AlertDescription } from '@/shared/ui/shadcn/ui/alert';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuthState } from '@/shared/hooks/use-auth';

interface ListingPageClientProps {
  id: string;
}

export function ListingPageClient({ id }: ListingPageClientProps) {
  const { data: listing, isLoading, error } = useListing(id);
  const { isAuthenticated } = useAuthState();

  // For MVP, we'll use a mock current user ID
  // In a real app, this would come from the auth context
  const currentUserId = isAuthenticated ? '1' : undefined;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Skeleton className="aspect-video rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error instanceof Error ? error.message : 'Listing not found'}</AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Listing Not Found</h1>
            <p className="text-muted-foreground">
              The listing you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>

            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/catalog">
                  <Home className="mr-2 h-4 w-4" />
                  Browse Catalog
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ListingDetails listing={listing} currentUserId={currentUserId} />
    </div>
  );
}
