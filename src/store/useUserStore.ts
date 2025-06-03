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
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUserName: (userName: string) => void;
  setPhoneNumber: (phone: string) => void;
  setStatus: (status: string) => void;
  setUsers: (users: User[]) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: '1',
      email: 'john@example.com',
      userName: 'John Doe',
      phoneNumber: '+123456789',
      status: 'active',
    },
    {
      id: '2',
      email: 'john@example.com',
      userName: 'John Doe',
      phoneNumber: '+123456789',
      status: 'active',
    },
    {
      id: '3',
      email: 'john@example.com',
      userName: 'John Doe',
      phoneNumber: '+123456789',
      status: 'active',
    },
  ],
  email: "",
  password: "",
  userName: "",
  phoneNumber: "",
  status: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setUserName: (userName) => set({ userName }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setStatus: (status) => set({ status }),
  setUsers: (users) => set({ users }),
  reset: () =>
    set({
      email: "",
      password: "",
      userName: "",
      phoneNumber: "",
      status: "",
    }),
}));
