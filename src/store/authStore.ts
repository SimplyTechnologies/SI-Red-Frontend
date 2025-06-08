import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setPhoneNumber: (phone: string) => void;

  resetCredentials: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setFirstName: (firstName) => set({ firstName }),
      setLastName: (lastName) => set({ lastName }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

      resetCredentials: () => set({ email: "", password: "" }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        firstName: state.firstName,
        lastName: state.lastName,
        phoneNumber: state.phoneNumber,
        email: state.email,
      }),
    }
  )
);
