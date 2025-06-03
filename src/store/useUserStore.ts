import { create } from "zustand";

interface User {
  id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  status: string;
}

interface UserState {
  users: User[];
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
  status: string;
  userFormOpen: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUserName: (userName: string) => void;
  setPhoneNumber: (phone: string) => void;
  setStatus: (status: string) => void;
  setUsers: (users: User[]) => void;
  setUserFormOpen: (isOpen: boolean) => void,
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: '1',
      email: 'john@example.com',
      userName: 'John Doe',
      phoneNumber: '+123456789',
      status: 'Pending',
    },
    {
      id: '2',
      email: 'john@example.com',
      userName: 'John Doe',
      phoneNumber: '+123456789',
      status: 'Pending',
    },
    {
      id: '3',
      email: 'john@example.com',
      userName: 'John Doe',
      phoneNumber: '+123456789',
      status: 'Activated',
    },
  ],
  email: "",
  password: "",
  userName: "",
  phoneNumber: "",
  status: "",
  userFormOpen: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setUserName: (userName) => set({ userName }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setStatus: (status) => set({ status }),
  setUsers: (users) => set({ users }),
  setUserFormOpen: (userFormOpen) => set({ userFormOpen }),
  reset: () =>
    set({
      email: "",
      password: "",
      userName: "",
      phoneNumber: "",
      status: "",
    }),
}));
