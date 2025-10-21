import { create } from "zustand";

interface AuthState {
  userId: string | null;
  email: string | null;
  password: string | null;
  setAuthData: (userId: string, email: string, password: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  email: null,
  password: null,

  setAuthData: (userId, email, password) => set({ userId, email, password }),

  clearAuth: () => set({ userId: null, email: null, password: null }),
}));
