import React from 'react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { cn } from '@/shared/lib/utils';

export interface PaginationData {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  prefetchNextPage?: () => void;
  prefetchPrevPage?: () => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  isLoading = false,
  prefetchNextPage,
  prefetchPrevPage,
  className,
}) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevPage = () => {
    if (hasPrev) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      onPageChange(page + 1);
    }
  };

  // Generate page numbers to show (max 5 pages)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than or equal to maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (page <= 3) {
      // Show first 5 pages when current page is near the start
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    } else if (page >= totalPages - 2) {
      // Show last 5 pages when current page is near the end
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show 2 pages before, current page, and 2 pages after
      for (let i = page - 2; i <= page + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <Button
        variant="outline"
        onClick={handlePrevPage}
        disabled={!hasPrev || isLoading}
        onMouseEnter={prefetchPrevPage}
      >
        Previous
      </Button>

      <div className="flex items-center space-x-1">
        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            variant={page === pageNum ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            disabled={isLoading}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleNextPage}
        disabled={!hasNext || isLoading}
        onMouseEnter={prefetchNextPage}
      >
        Next
      </Button>
    </div>
  );
};
