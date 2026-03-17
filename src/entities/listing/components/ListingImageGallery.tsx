'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ListingImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

export const ListingImageGallery: React.FC<ListingImageGalleryProps> = ({ images, title, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-0">
          <div className="relative flex aspect-video items-center justify-center bg-muted">
            <div className="text-center text-muted-foreground">
              <div className="mb-2 text-4xl">📷</div>
              <div>No photos available</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Card className={className}>
      <CardContent className="p-0">
        {/* Main Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={currentImage}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            priority={currentImageIndex === 0}
          />

          {/* Navigation Buttons */}
          {hasMultipleImages && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="p-4">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-muted hover:border-muted-foreground'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
