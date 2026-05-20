'use client';

import * as React from 'react';
import { ORDER_STAGES } from '@/lib/constants';
import type { OrderStatus } from '@/types/order.types';
import { cn } from '@/lib/utils';

export interface OrderTimelineProps {
  currentStatus: OrderStatus;
  history?: { stage: OrderStatus; timestamp: string; note?: string | null }[];
}

export function OrderTimeline({ currentStatus, history = [] }: OrderTimelineProps) {
  // Determine index of current status
  const currentIdx = ORDER_STAGES.findIndex((stage) => stage.key === currentStatus);

  return (
    <div className="flex flex-col gap-6 py-4 w-full">
      <h3 className="text-base font-semibold tracking-wider text-gold-light uppercase border-b border-dark-border/40 pb-2">
        Manufacturing & Dispatch Timeline
      </h3>

      {/* Timeline Steps layout */}
      <div className="flex flex-col gap-5 pl-2 relative">
        {/* Central timeline line */}
        <div className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-dark-border/80" />

        {ORDER_STAGES.map((stage, idx) => {
          const isCompleted = idx <= currentIdx;
          const isActive = stage.key === currentStatus;
          const statusHistory = history.find((h) => h.stage === stage.key);
          const formattedTime = statusHistory
            ? new Date(statusHistory.timestamp).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })
            : null;

          return (
            <div key={stage.key} className="flex gap-4 relative group">
              
              {/* Node Bullet */}
              <div
                className={cn(
                  'z-10 flex h-9.5 w-9.5 items-center justify-center rounded-full border bg-dark-card text-base transition-all duration-300',
                  {
                    'border-gold text-gold shadow-gold scale-105 bg-dark-surface': isActive,
                    'border-gold/50 text-gold-light bg-dark-card': isCompleted && !isActive,
                    'border-dark-border text-subtle-fg': !isCompleted,
                  }
                )}
              >
                <span>{stage.icon}</span>
              </div>

              {/* Status Details */}
              <div className="flex-1 pt-1.5 pb-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <h4
                    className={cn('text-sm font-semibold tracking-wide transition-colors', {
                      'text-gold font-bold': isActive,
                      'text-foreground': isCompleted && !isActive,
                      'text-subtle-fg': !isCompleted,
                    })}
                  >
                    {stage.label}
                  </h4>
                  {formattedTime && (
                    <span className="text-[10px] text-muted-fg font-medium">{formattedTime}</span>
                  )}
                </div>

                {/* Additional descriptive notes from backend history */}
                {isCompleted && statusHistory?.note && (
                  <p className="text-xs text-muted-fg mt-1 bg-dark-surface/40 p-2 rounded-lg border border-dark-border/40 max-w-lg leading-relaxed">
                    {statusHistory.note}
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
