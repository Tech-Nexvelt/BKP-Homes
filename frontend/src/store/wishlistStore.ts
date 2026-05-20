import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  slug: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setItems: (items: WishlistItem[]) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: state.items.some((i) => i.productId === item.productId)
            ? state.items
            : [...state.items, item],
        })),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      isInWishlist: (productId) => get().items.some((i) => i.productId === productId),
      setItems: (items) => set({ items }),
      clear: () => set({ items: [] }),
    }),
    { name: 'bkp-wishlist', partialize: (s) => ({ items: s.items }) }
  )
);
