import { create } from "zustand";

interface AnalyticsState {
  totalVehicles: number;
  customers: number;
  vehiclesSold: number;
  setTotalVehicles: (value: number) => void;
  setCustomers: (value: number) => void;
  setVehiclesSold: (value: number) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  totalVehicles: 0,
  setTotalVehicles: (value) => set(() => ({ totalVehicles: value })),

  customers: 0,
  setCustomers: (value) => set(() => ({ customers: value })),

  vehiclesSold: 0,
  setVehiclesSold: (value) => set(() => ({ vehiclesSold: value })),
}));
