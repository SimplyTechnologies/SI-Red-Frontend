import { create } from "zustand";

interface VehicleFiltersState {
  make: string | null;
  model: string[];
  availability: string | null;

  setMake: (make: string | null) => void;
  setModel: (model: string[]) => void;
  setAvailability: (availability: string | null) => void;

  resetFilters: () => void;
}

export const useVehicleFilters = create<VehicleFiltersState>((set) => ({
  make: null,
  model: [],
  availability: null,

  setMake: (make) =>
    set({
      make,
      model: [],
    }),
  setModel: (model) => set({ model }),
  setAvailability: (availability) => set({ availability }),

  resetFilters: () =>
    set({
      make: null,
      model: [],
      availability: null,
    }),
}));
