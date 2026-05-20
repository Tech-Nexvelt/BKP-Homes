import { create } from 'zustand';

interface UIState {
  mobileNavOpen: boolean;
  searchOpen: boolean;
  globalLoading: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  setGlobalLoading: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  searchOpen: false,
  globalLoading: false,
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
  closeSearch: () => set({ searchOpen: false }),
  setGlobalLoading: (v) => set({ globalLoading: v }),
}));
