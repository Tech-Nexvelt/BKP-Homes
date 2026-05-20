'use client';

import * as React from 'react';
import type { Review } from '@/types/product.types';
import { Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { formatDate } from '@/lib/utils';
import { Badge } from '../ui/Badge';

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-4 bg-dark-card/40 border-dark-border/60">
      <div className="flex items-start justify-between gap-4">
        {/* User profile row */}
        <div className="flex items-center gap-3">
          <Avatar name={review.user?.name || 'Customer'} src={review.user?.avatar} size="sm" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">{review.user?.name || 'Verified Buyer'}</h4>
            <span className="text-[10px] text-subtle-fg">{formatDate(review.createdAt)}</span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, idx) => {
            const isFilled = idx < review.rating;
            return (
              <Star
                key={idx}
                className={`h-3.5 w-3.5 ${isFilled ? 'text-gold fill-current' : 'text-dark-muted'}`}
              />
            );
          })}
        </div>
      </div>

      {/* Review details */}
      <div className="flex flex-col gap-1.5 pr-2">
        {review.title && (
          <h5 className="text-sm font-semibold text-gold-light tracking-wide">{review.title}</h5>
        )}
        <p className="text-xs text-muted-fg leading-relaxed">{review.comment}</p>
        
        {review.isVerified && (
          <Badge variant="gold" className="text-[8px] px-2 py-0 w-fit mt-1">
            Verified Curation Purchase
          </Badge>
        )}
      </div>

      {/* Attached photos */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 pr-1 overflow-x-auto scrollbar-thin pb-1">
          {review.images.map((img, idx) => (
            <div key={idx} className="h-14 w-18 rounded-lg bg-dark-surface border border-dark-border/40 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="review attachment" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
