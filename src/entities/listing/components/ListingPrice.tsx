import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ListingPriceProps {
  price: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-sm font-medium',
  md: 'text-lg font-semibold',
  lg: 'text-xl font-bold',
};

export const ListingPrice: React.FC<ListingPriceProps> = ({ price, className, size = 'md' }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return <div className={cn('text-green-600', sizeClasses[size], className)}>{formattedPrice}</div>;
};
