'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-30 mt-2 w-48 origin-top rounded-xl border border-dark-border bg-dark-card p-1.5 shadow-gold focus:outline-none',
              {
                'left-0': align === 'left',
                'right-0': align === 'right',
              },
              className
            )}
          >
            <div className="flex flex-col gap-0.5">
              {items.map((item) => (
                <button
                  key={item.key}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-sm text-left text-muted-fg hover:text-foreground hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none',
                    item.className
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
