'use client';

import * as React from 'react';
import type { Product } from '@/types/product.types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../ui/Skeleton';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({ products, isLoading, skeletonCount = 8 }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-3.5">
            <Skeleton className="aspect-[4/5] w-full rounded-xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-6 w-1/4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-dark-border rounded-2xl bg-dark-card/20">
        <p className="text-muted-fg text-sm tracking-wide">No premium curations match your current parameters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
