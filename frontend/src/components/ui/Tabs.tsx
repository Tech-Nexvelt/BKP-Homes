'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TabOption {
  value: string;
  label: string;
}

export interface TabsProps {
  options: TabOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  activeClassName?: string;
}

export function Tabs({
  options,
  selectedValue,
  onChange,
  className,
  activeClassName,
}: TabsProps) {
  return (
    <div
      className={cn(
        'inline-flex p-1 rounded-xl bg-dark-surface border border-dark-border overflow-hidden',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === selectedValue;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="relative px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none"
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className={cn('absolute inset-0 rounded-lg bg-dark-card border border-dark-border/40', activeClassName)}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={cn(
                'relative z-10 block transition-colors duration-200',
                isActive ? 'text-gold' : 'text-muted-fg hover:text-foreground'
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
