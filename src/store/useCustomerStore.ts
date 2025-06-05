import { create } from "zustand";

interface Vehicle {
  vin: string;
  model: string;
}

export interface Customer {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  assignDate: string;
  vehicles: Vehicle[];
}

interface CustomerState {
  customers: Customer[];
  customerFormOpen: boolean;
  setCustomers: (customers: Customer[]) => void;
  setCustomerFormOpen: (isOpen: boolean) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  customerFormOpen: false,
  setCustomers: (customers) => set({ customers }),
  setCustomerFormOpen: (customerFormOpen) => set({ customerFormOpen }),
}));
