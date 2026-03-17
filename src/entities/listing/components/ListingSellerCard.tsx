import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { MessageCircle, MapPin, Star } from 'lucide-react';
import type { User } from '@/shared/api/types';

interface ListingSellerCardProps {
  seller: User;
  location?: {
    city: string;
    state?: string;
    country?: string;
  };
  currentUserId?: string;
  listingId: string;
  className?: string;
}

export const ListingSellerCard: React.FC<ListingSellerCardProps> = ({
  seller,
  location,
  currentUserId,
  className = '',
}) => {
  const isOwnListing = currentUserId === seller.id;
  const isLoggedIn = !!currentUserId;

  const handleMessageSeller = () => {
    if (isOwnListing) return;

    if (!isLoggedIn) {
      // Redirect to login with next parameter
      const currentPath = window.location.pathname;
      window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
      return;
    }

    // For MVP: show modal, for real implementation: navigate to messages
    alert('Messaging coming soon!');
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Seller Information</h3>
          {isOwnListing && (
            <Badge variant="secondary" className="text-xs">
              Your Listing
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Seller Profile */}
        <div className="flex items-center space-x-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={seller.avatar || '/default-avatar.png'}
              alt={seller.username}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/user/${seller.id}`} className="block truncate font-medium hover:underline">
              {seller.username}
            </Link>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-current" />
              <span>4.8 (124 reviews)</span>
            </div>
          </div>
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {location.city}
              {location.state && `, ${location.state}`}
              {location.country && location.country !== location.city && `, ${location.country}`}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {!isOwnListing ? (
            <Button onClick={handleMessageSeller} className="w-full" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message Seller
            </Button>
          ) : (
            <div className="py-2 text-center text-sm text-muted-foreground">This is your listing</div>
          )}

          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/user/${seller.id}`}>View Seller Profile</Link>
          </Button>
        </div>

        {/* Seller Stats */}
        <div className="border-t pt-2">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-semibold">127</div>
              <div className="text-xs text-muted-foreground">Listings</div>
            </div>
            <div>
              <div className="text-sm font-semibold">98%</div>
              <div className="text-xs text-muted-foreground">Response</div>
            </div>
            <div>
              <div className="text-sm font-semibold">2h</div>
              <div className="text-xs text-muted-foreground">Avg. Response</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
