import Image from 'next/image';
import { User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

export function UserAvatar({ src, alt = 'User avatar', size = 'md', className }: UserAvatarProps) {
  if (src) {
    return (
      <div className={cn('relative overflow-hidden rounded-full border-2 border-border', sizeClasses[size], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border-2 border-border bg-muted',
        sizeClasses[size],
        className
      )}
    >
      <User
        className={cn('text-muted-foreground', {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-8 w-8': size === 'lg',
          'h-12 w-12': size === 'xl',
        })}
      />
    </div>
  );
}
