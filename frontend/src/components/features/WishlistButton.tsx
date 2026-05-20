'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WishlistButtonProps {
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function WishlistButton({ isActive, onClick, className }: WishlistButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isActive ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'flex h-8.5 w-8.5 items-center justify-center rounded-full glass border border-white/10 hover:border-gold/30 text-muted-fg hover:text-rose-400 active:scale-90 transition-all duration-300',
        {
          'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:text-rose-500 hover:bg-rose-500/15': isActive,
        },
        className
      )}
    >
      <Heart className={cn('h-4 w-4 transition-transform duration-300', { 'fill-current scale-110': isActive })} />
    </button>
  );
}
