'use client';

import * as React from 'react';
import type { Category, ProductFilters as FiltersType } from '@/types/product.types';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export interface ProductFiltersProps {
  categories: Category[];
  filters: FiltersType;
  onChange: (newFilters: FiltersType) => void;
}

export function ProductFilters({ categories, filters, onChange }: ProductFiltersProps) {
  const materials = ['Teak Wood', 'Italian Velvet', 'Marble & Steel', 'Walnut Wood', 'Leather', 'Solid Oak'];

  const handleCategorySelect = (categoryId: string) => {
    onChange({
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId,
      page: 1,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value) || 0;
    onChange({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value || undefined,
      page: 1,
    });
  };

  const handleMaterialSelect = (material: string) => {
    onChange({
      ...filters,
      material: filters.material === material ? undefined : material,
      page: 1,
    });
  };

  const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      sort: e.target.value as any,
      page: 1,
    });
  };

  const handleClear = () => {
    onChange({ page: 1, limit: 12 });
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-xs shrink-0">
      
      {/* Search Input */}
      <Card className="p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold tracking-wider text-gold-light uppercase">Search Collections</h4>
        <Input
          type="text"
          placeholder="Search by keywords..."
          value={filters.q || ''}
          onChange={(e) => onChange({ ...filters, q: e.target.value || undefined, page: 1 })}
          className="text-xs h-9 bg-dark-bg border-dark-border"
        />
      </Card>

      {/* Sort Select */}
      <Card className="p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold tracking-wider text-gold-light uppercase">Sort Curation</h4>
        <select
          value={filters.sort || ''}
          onChange={handleSortSelect}
          className="w-full text-xs rounded-lg border border-dark-border bg-dark-bg p-2.5 text-foreground placeholder:text-subtle-fg focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold"
        >
          <option value="">Featured</option>
          <option value="newest">Newest Releases</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </Card>

      {/* Categories Accordion/List */}
      <Card className="p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold tracking-wider text-gold-light uppercase">Categories</h4>
        <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto scrollbar-thin pr-1">
          {categories.map((cat) => {
            const isSelected = filters.categoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left text-xs font-semibold py-1.5 px-2.5 rounded-lg transition-colors flex justify-between items-center ${
                  isSelected ? 'bg-gold/15 text-gold' : 'text-muted-fg hover:text-foreground hover:bg-white/5'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <span className="text-[10px]">●</span>}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Price Range */}
      <Card className="p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold tracking-wider text-gold-light uppercase">Price parameters (INR)</h4>
        <div className="grid grid-cols-2 gap-3.5">
          <Input
            type="number"
            label="Min Price"
            placeholder="0"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange(e, 'min')}
            className="text-xs h-9 bg-dark-bg border-dark-border"
          />
          <Input
            type="number"
            label="Max Price"
            placeholder="5,00,000"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange(e, 'max')}
            className="text-xs h-9 bg-dark-bg border-dark-border"
          />
        </div>
      </Card>

      {/* Materials List */}
      <Card className="p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold tracking-wider text-gold-light uppercase">Accent Materials</h4>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => {
            const isSelected = filters.material === mat;
            return (
              <button
                key={mat}
                onClick={() => handleMaterialSelect(mat)}
                className={`text-[10px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-gold text-dark-bg border-gold shadow-gold'
                    : 'bg-dark-surface border-dark-border text-muted-fg hover:text-foreground hover:border-gold/30'
                }`}
              >
                {mat}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Reset button */}
      <button
        onClick={handleClear}
        className="w-full text-xs font-semibold py-3 border border-dark-border hover:border-gold/30 text-muted-fg hover:text-gold rounded-xl bg-dark-card/40 transition-colors"
      >
        Clear All Filters
      </button>

    </div>
  );
}
