import { create } from 'zustand';
import { User, Store } from '@/types';

interface AuthState {
  user: User | null;
  currentStore: Store | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setCurrentStore: (store: Store | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  currentStore: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setCurrentStore: (currentStore) => set({ currentStore }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
