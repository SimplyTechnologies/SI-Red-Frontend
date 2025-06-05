import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isVerified: boolean;
}

interface UserState {
  users: User[];
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isVerified: boolean;
  userFormOpen: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (userName: string) => void;
  setLastName: (userName: string) => void;
  setPhoneNumber: (phone: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  setUsers: (users: User[]) => void;
  setUserFormOpen: (isOpen: boolean) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  isVerified: false,
  userFormOpen: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setIsVerified: (isVerified) => set({ isVerified }),
  setUsers: (users) => set({ users }),
  setUserFormOpen: (userFormOpen) => set({ userFormOpen }),
  reset: () =>
    set({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    }),
}));
