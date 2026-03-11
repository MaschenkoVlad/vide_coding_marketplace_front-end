import { cn } from '@/shared/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  height?: string
}

export function LoadingSkeleton({ className, lines = 3, height = 'h-4' }: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn('animate-pulse rounded-md bg-muted', height)}
          style={{
            width: i === lines - 1 ? '75%' : '100%',
          }}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg border bg-card p-6 space-y-4', className)}>
      <div className="animate-pulse rounded-md bg-muted h-6 w-3/4" />
      <div className="space-y-2">
        <div className="animate-pulse rounded-md bg-muted h-4 w-full" />
        <div className="animate-pulse rounded-md bg-muted h-4 w-5/6" />
      </div>
      <div className="animate-pulse rounded-md bg-muted h-10 w-1/3" />
    </div>
  )
}
