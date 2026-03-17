import React from 'react';
import { Card, CardContent, CardHeader } from '@/shared/ui/shadcn/ui/card';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { ListingImageGallery } from './ListingImageGallery';
import { ListingSellerCard } from './ListingSellerCard';
// import { ListingAttributesTable } from './ListingAttributesTable' // Will be used when attributes are available
import { ListingPrice } from './ListingPrice';
import { ListingConditionBadge } from './ListingConditionBadge';
import { MapPin, Eye, Calendar } from 'lucide-react';
import type { Listing } from '@/shared/api/types';

interface ListingDetailsProps {
  listing: Listing;
  currentUserId?: string;
  className?: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const ListingDetails: React.FC<ListingDetailsProps> = ({ listing, currentUserId, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-3 ${className}`}>
      {/* Main Content - Left Side */}
      <div className="space-y-6 lg:col-span-2">
        {/* Image Gallery */}
        <ListingImageGallery images={listing.images} title={listing.title} />

        {/* Title and Basic Info */}
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold leading-tight">{listing.title}</h1>
                <ListingConditionBadge condition={listing.condition} />
              </div>

              <div className="flex items-center justify-between">
                <ListingPrice price={listing.price} size="lg" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{listing.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(listing.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Location and Category */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{listing.location.city}</span>
                {listing.location.state && `, ${listing.location.state}`}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline">{listing.category.name}</Badge>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{listing.description}</p>
            </div>

            {/* Attributes (if available) */}
            {/* Note: This would be populated when the Listing type includes attributes */}
            {/* <ListingAttributesTable attributes={listing.attributes} /> */}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Right Side */}
      <div className="space-y-6">
        {/* Seller Card */}
        <ListingSellerCard
          seller={listing.seller}
          location={listing.location}
          currentUserId={currentUserId}
          listingId={listing.id}
        />

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Safety Tips</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Meet in a public place</li>
              <li>• Inspect the item before buying</li>
              <li>• Pay only after receiving the item</li>
              <li>• Trust your instincts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
