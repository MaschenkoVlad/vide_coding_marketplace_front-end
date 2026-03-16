import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/shared/ui/shadcn/ui/card'
import { ListingPrice } from './ListingPrice'
import { ListingConditionBadge } from './ListingConditionBadge'
import type { Listing } from '@/shared/api/types'

interface ListingCardProps {
  listing: Listing
  className?: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, className }) => {
  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className={className}>
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute right-2 top-2">
              <ListingConditionBadge condition={listing.condition} size="sm" />
            </div>
          </div>
        </CardContent>

        <div className="p-4">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight">{listing.title}</h3>

            <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>

            <div className="flex items-center justify-between">
              <ListingPrice price={listing.price} />
              <div className="text-xs text-muted-foreground">{listing.location.city}</div>
            </div>
          </div>
        </div>

        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 overflow-hidden rounded-full">
                <Image
                  src={listing.seller.avatar || '/default-avatar.png'}
                  alt={listing.seller.username}
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              <span>{listing.seller.username}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{listing.views} views</span>
              <span>{formatDate(listing.createdAt)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
