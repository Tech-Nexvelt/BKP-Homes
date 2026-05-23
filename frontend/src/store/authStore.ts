import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (partial: Partial<User>) => void;
  setHasHydrated: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      setAuth: (user, accessToken) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('bkp_access_token', accessToken);
        }
        set({ user, accessToken, isAuthenticated: true });
      },

      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('bkp_access_token');
        }
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      updateUser: (partial) =>
        set((state) => ({ user: state.user ? { ...state.user, ...partial } : null })),
    }),
    {
      name: 'bkp-auth',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

