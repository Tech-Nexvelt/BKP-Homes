import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label ? (
          <label className="text-sm font-medium text-muted-fg tracking-wide">{label}</label>
        ) : null}
        <input
          type={type}
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2 text-sm text-foreground placeholder:text-subtle-fg transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-50',
            { 'border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500': error },
            className
          )}
          {...props}
        />
        {error ? <p className="text-xs font-medium text-red-500/95">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
