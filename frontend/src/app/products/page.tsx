'use client';

import * as React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/features/ProductGrid';
import type { ProductFilters as FiltersType } from '@/types/product.types';

export default function ProductsPage() {
  const [filters, setFilters] = React.useState<FiltersType>({
    page: 1,
    limit: 12,
  });

  const { products, isLoadingProducts } = useProducts(filters);

  return (
    <div className="container-luxora pt-32 pb-24 flex flex-col gap-10">
      {/* Title Header */}
      <div>
        <span className="text-[10px] font-bold text-gold tracking-[0.25em] uppercase">Catalog</span>
        <h1 className="font-display text-4xl font-light tracking-tight text-white mt-2">
          Explore Our <span className="font-light italic text-gold">Curation</span>
        </h1>
        <p className="text-xs text-white/50 mt-3 max-w-xl leading-relaxed font-light">
          Artisanal masterpieces built manually by expert carvers using seasoned teak, sheesham wood, and royal marble accents.
        </p>
      </div>

      {/* Main catalog workspace */}
      <div className="w-full">
        <ProductGrid products={products} isLoading={isLoadingProducts} />
      </div>
    </div>
  );
}
