import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold tracking-wider transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96B]',
          {
            // Variants
            'bg-[#C8A96B] text-black hover:bg-[#D9BB84] hover:shadow-2xl shadow-[#C8A96B]/10': variant === 'gold',
            'bg-[#F5F2ED] text-black hover:bg-[#B8B3AA]': variant === 'primary',
            'bg-[#0B0B0C] text-[#F5F2ED] hover:bg-[#111111] border border-[#D9BB84]/15': variant === 'secondary',
            'border border-[#F5F2ED]/20 bg-transparent hover:border-[#C8A96B] hover:text-[#C8A96B] text-[#F5F2ED]': variant === 'outline',
            'hover:bg-[#0B0B0C] hover:text-[#C8A96B] text-[#B8B3AA]': variant === 'ghost',
            'bg-[#0B0B0C]/40 backdrop-blur-md text-[#F5F2ED] border border-[#F5F2ED]/10 hover:bg-[#0B0B0C]/80': variant === 'glass',
            
            // Sizes
            'h-9 px-4 text-[10px] uppercase tracking-widest': size === 'sm',
            'h-12 px-7 text-xs uppercase tracking-widest': size === 'md',
            'h-14 px-9 text-xs uppercase tracking-widest': size === 'lg',
            'h-12 w-12 p-0': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
