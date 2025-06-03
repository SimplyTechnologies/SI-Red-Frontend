import { create } from 'zustand';

interface UserState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  reset: () => set({ email: '', password: '' }),
}));