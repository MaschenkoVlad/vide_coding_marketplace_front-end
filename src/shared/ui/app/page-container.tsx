import React from 'react';
import { cn } from '@/shared/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export const PageContainer: React.FC<PageContainerProps> = ({ children, className, size = 'lg' }) => {
  return <div className={cn('container mx-auto px-4 py-8', sizeClasses[size], className)}>{children}</div>;
};
