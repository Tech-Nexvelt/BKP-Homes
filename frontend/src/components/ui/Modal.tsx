'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: ModalProps) {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={cn(
              'relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-dark-border bg-dark-card shadow-glow outline-none flex flex-col',
              {
                'max-w-md': size === 'sm',
                'max-w-xl': size === 'md',
                'max-w-3xl': size === 'lg',
                'max-w-5xl': size === 'xl',
                'max-w-[95vw] h-[95vh]': size === 'full',
              },
              className
            )}
          >
            {/* Header */}
            {title || onClose ? (
              <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
                {title ? (
                  <h3 className="text-lg font-semibold tracking-wide font-display text-gold-light">
                    {title}
                  </h3>
                ) : (
                  <div />
                )}
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 hover:bg-white/5 text-muted-fg hover:text-foreground rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : null}

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
