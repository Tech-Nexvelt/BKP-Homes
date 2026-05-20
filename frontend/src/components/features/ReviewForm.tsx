'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { reviewService } from '@/services/review.service';
import { toast } from 'react-hot-toast';

export interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [title, setTitle] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || comment.length < 10) {
      toast.error('Review comment must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    try {
      await reviewService.create(productId, {
        rating,
        title: title || undefined,
        comment,
      });
      toast.success('Your verification review was submitted successfully.');
      setTitle('');
      setComment('');
      setRating(5);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-dark-card/40 border-dark-border/60">
      <h3 className="font-display text-lg font-semibold tracking-wide text-gold-light mb-4">
        Leave a Curation Review
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Rating Select row */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-fg tracking-wide uppercase">Curation Quality</label>
          <div className="flex gap-1.5 py-1">
            {Array.from({ length: 5 }).map((_, idx) => {
              const starVal = idx + 1;
              const isFilled = starVal <= (hoverRating ?? rating);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRating(starVal)}
                  onMouseEnter={() => setHoverRating(starVal)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-0.5 focus:outline-none"
                  aria-label={`Rate ${starVal} stars`}
                >
                  <Star
                    className={`h-6 w-6 transition-all ${
                      isFilled ? 'text-gold fill-current scale-110 shadow-gold' : 'text-dark-muted'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Title input */}
        <Input
          label="Headline (Optional)"
          placeholder="Brief summary of your review..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xs bg-dark-bg border-dark-border"
        />

        {/* Comment area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-fg tracking-wide uppercase">Your Experience</label>
          <textarea
            placeholder="Tell us about the wood selection, upholstery quality, delivery timing..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full text-xs rounded-lg border border-dark-border bg-dark-bg p-3.5 text-foreground placeholder:text-subtle-fg focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold"
            required
          />
        </div>

        <Button type="submit" variant="gold" size="sm" loading={loading} className="w-full sm:w-auto self-start mt-2">
          Submit Curation Review
        </Button>
      </form>
    </Card>
  );
}
