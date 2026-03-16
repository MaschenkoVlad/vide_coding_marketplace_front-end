import React from 'react';
import { cn } from '@/shared/lib/utils';
import type { ListingCondition } from '@/shared/api/types';

interface ListingConditionBadgeProps {
  condition: ListingCondition;
  className?: string;
  size?: 'sm' | 'md';
}

const conditionConfig = {
  new: {
    label: 'New',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  like_new: {
    label: 'Like New',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  good: {
    label: 'Good',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  fair: {
    label: 'Fair',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  poor: {
    label: 'Poor',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const ListingConditionBadge: React.FC<ListingConditionBadgeProps> = ({ condition, className, size = 'md' }) => {
  const config = conditionConfig[condition];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  );
};
