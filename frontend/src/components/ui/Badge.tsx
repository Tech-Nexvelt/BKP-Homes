import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'error' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase transition-colors',
        {
          'bg-dark-surface text-foreground border border-dark-border': variant === 'default',
          'bg-gold/10 text-gold border border-gold/30': variant === 'gold',
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/35': variant === 'success',
          'bg-amber-500/10 text-amber-400 border border-amber-500/35': variant === 'warning',
          'bg-rose-500/10 text-rose-400 border border-rose-500/35': variant === 'error',
          'border border-dark-border bg-transparent text-muted-fg': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
