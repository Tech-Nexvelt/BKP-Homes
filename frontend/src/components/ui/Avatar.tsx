'use client';

import * as React from 'react';
import { cn, getInitials } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ src, name, size = 'md', className, ...props }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-dark-border bg-dark-surface select-none items-center justify-center font-semibold text-gold-light',
        {
          'h-8 w-8 text-xs': size === 'sm',
          'h-10 w-10 text-sm': size === 'md',
          'h-14 w-14 text-base': size === 'lg',
          'h-20 w-20 text-xl': size === 'xl',
        },
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
