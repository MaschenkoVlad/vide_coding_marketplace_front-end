import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export function PageContainer({ children, className, size = 'lg' }: PageContainerProps) {
  return <div className={cn('container mx-auto px-4 py-8', sizeClasses[size], className)}>{children}</div>
}
