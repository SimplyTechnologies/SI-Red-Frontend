import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  resetCredentials: () => void;

  setTokens: (accessToken: string, refreshToken: string, role: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",

      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      isInitialized: false,

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setFirstName: (firstName) => set({ firstName }),
      setLastName: (lastName) => set({ lastName }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

      resetCredentials: () => set({ email: "", password: "" }),

      setTokens: (accessToken, refreshToken, role) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);

        set({
          accessToken,
          refreshToken,
          role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");

        set({
          accessToken: null,
          refreshToken: null,
          role: null,
          isAuthenticated: false,
        });
      },

      loadFromStorage: () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const role = localStorage.getItem("role");

        set({
          accessToken,
          refreshToken,
          role,
          isAuthenticated: !!accessToken && !!refreshToken,
          isInitialized: true,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        phoneNumber: state.phoneNumber,
      }),
    }
  )
);
