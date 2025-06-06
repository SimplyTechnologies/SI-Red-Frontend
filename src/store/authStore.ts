import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean; 

  setTokens: (accessToken: string, refreshToken: string, role: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  role: null,
  isAuthenticated: false,
  isInitialized: false,

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
}));
