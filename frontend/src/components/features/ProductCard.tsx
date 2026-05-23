'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/product.types';
import { useCurrency } from '@/hooks/useCurrency';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { WishlistButton } from './WishlistButton';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { format } = useCurrency();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const activePrice = product.salePrice ?? product.price;
  const isDiscounted = !!product.salePrice;
  const isFavorite = isInWishlist(product.id);

  const handleLoginRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/login';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images?.[0] || '',
      qty: 1,
      stock: product.stock || 10,
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      <div className="relative h-full flex flex-col justify-between bg-[#0B0B0C] border border-[#D9BB84]/5 hover:border-[#C8A96B]/30 rounded-none p-5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        
        {/* Wishlist toggle action in top-right */}
        <div className="absolute top-7 right-7 z-20">
          <WishlistButton
            isActive={isFavorite}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product as any);
            }}
          />
        </div>

        {/* Product Image Frame with Luxury Portrait Ratio */}
        <div className="relative aspect-[4/5] w-full rounded-none bg-[#050505] overflow-hidden border border-[#D9BB84]/5">
          {/* Discount Tag */}
          {isDiscounted && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#1A7A68] text-white text-[8px] font-semibold tracking-[0.2em] uppercase">
              Exclusive
            </span>
          )}

          {/* Product Image */}
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 brightness-[0.9] group-hover:brightness-100"
            loading="lazy"
          />

          {/* Quick Add To Cart Hover overlay button - elegant glassmorphic bar */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-end justify-center p-4">
            {isAuthenticated ? (
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-4 bg-[#C8A96B] hover:bg-[#D9BB84] text-black text-[9px] font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Acquire Curation
              </button>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className="w-full py-4 px-4 bg-[#C8A96B] hover:bg-[#D9BB84] text-black text-[9px] font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0"
              >
                Login to Purchase
              </button>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="pt-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              {product.category?.name && (
                <span className="text-[9px] text-[#C8A96B] tracking-[0.25em] font-semibold uppercase">
                  {product.category.name}
                </span>
              )}
              {product.material && (
                <span className="text-[9px] text-[#7D7A74] tracking-widest uppercase font-semibold">
                  {product.material.split(' ')[0]}
                </span>
              )}
            </div>
            <h3 className="font-display text-lg font-light text-[#F5F2ED] tracking-wide mt-3 line-clamp-1 group-hover:text-[#C8A96B] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Pricing Row */}
          <div 
            onClick={isAuthenticated ? undefined : handleLoginRedirect}
            className="flex items-baseline gap-2 mt-5 pt-4 border-t border-[#7D7A74]/10 cursor-pointer"
          >
            {isAuthenticated ? (
              <>
                <span className="text-base font-light text-[#C8A96B] tracking-tight">
                  {format(activePrice)}
                </span>
                {isDiscounted && (
                  <span className="text-xs text-[#7D7A74] line-through font-light">
                    {format(product.price)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-semibold text-[#C8A96B] hover:text-[#D9BB84] transition-colors uppercase tracking-wider">
                Login to view price
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}
