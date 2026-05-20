'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '../ui/Button';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, total } = useCart();
  const { format } = useCurrency();

  // Prevent scroll when drawer is open
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
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="relative z-10 w-full max-w-md bg-dark-bg border-l border-dark-border shadow-glow flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border bg-dark-surface">
              <div className="flex items-center gap-2 text-gold-light">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="text-lg font-semibold tracking-wide font-display">
                  Your Curation Cart
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="text-muted-fg hover:text-foreground transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 scrollbar-thin">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 py-20 text-center">
                  <ShoppingBag className="h-10 w-10 text-subtle-fg animate-bounce" />
                  <p className="text-sm text-muted-fg">Your curation list is currently empty.</p>
                  <Button variant="outline" size="sm" onClick={closeCart} className="mt-2 text-xs">
                    Continue Browsing
                  </Button>
                </div>
              ) : (
                items.map((item) => {
                  const activePrice = item.salePrice ?? item.price;
                  return (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex gap-4 p-3.5 rounded-xl border border-dark-border/60 bg-dark-card/40 hover:bg-dark-card transition-colors duration-200"
                    >
                      {/* Product Thumbnail */}
                      <div className="h-18 w-24 rounded-lg bg-dark-surface border border-dark-border/40 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                            {item.name}
                          </h4>
                          {item.variantId && (
                            <p className="text-[10px] text-gold uppercase mt-0.5 tracking-wider">Custom build variant</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty selectors */}
                          <div className="flex items-center border border-dark-border rounded-lg bg-dark-surface overflow-hidden">
                            <button
                              onClick={() => updateQty(item.productId, item.variantId, item.qty - 1, item.id)}
                              className="px-2 py-1 text-muted-fg hover:text-foreground hover:bg-white/5 active:scale-95 transition-all"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.productId, item.variantId, item.qty + 1, item.id)}
                              className="px-2 py-1 text-muted-fg hover:text-foreground hover:bg-white/5 active:scale-95 transition-all"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Price / Delete */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-foreground">
                              {format(activePrice * item.qty)}
                            </span>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId, item.id)}
                              className="text-subtle-fg hover:text-rose-400 p-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sticky Checkout Summary Panel */}
            {items.length > 0 && (
              <div className="border-t border-dark-border bg-dark-surface px-6 py-6 flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-muted-fg tracking-wide uppercase">Subtotal</span>
                  <span className="text-2xl font-bold text-gold-light tracking-wide">{format(total)}</span>
                </div>
                <p className="text-[10px] text-subtle-fg">
                  VAT tax, shipping, and customizable assembly calculations completed during checkout.
                </p>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button variant="secondary" onClick={closeCart} className="w-full text-xs">
                    Shop More
                  </Button>
                  <Link href="/dashboard" onClick={closeCart}>
                    <Button variant="gold" className="w-full text-xs shadow-gold">
                      Checkout Curation
                    </Button>
                  </Link>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
