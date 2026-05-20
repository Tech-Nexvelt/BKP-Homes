import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id?: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  salePrice?: number;
  image?: string;
  qty: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQty: (productId: string, variantId: string | undefined, qty: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  toggleCart: () => void;
  closeCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, qty: Math.min(i.qty + item.qty, i.stock) }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),

      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })),

      updateQty: (productId, variantId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => !(i.productId === productId && i.variantId === variantId))
              : state.items.map((i) =>
                  i.productId === productId && i.variantId === variantId ? { ...i, qty } : i
                ),
        })),

      clearCart: () => set({ items: [] }),
      setItems: (items) => set({ items }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      closeCart: () => set({ isOpen: false }),

      total: () =>
        get().items.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.qty, 0),

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'bkp-cart', partialize: (s) => ({ items: s.items }) }
  )
);
