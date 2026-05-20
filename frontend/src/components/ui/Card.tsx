import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gold' | 'interactive';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-dark-border bg-dark-card p-6 transition-all duration-300',
        {
          'glass hover:bg-white/[0.06]': variant === 'glass',
          'border-gold/30 bg-gold/5 backdrop-blur-sm shadow-gold/5 shadow-md': variant === 'gold',
          'hover:shadow-gold hover:border-gold/35 hover:scale-[1.01] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]': variant === 'interactive',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
