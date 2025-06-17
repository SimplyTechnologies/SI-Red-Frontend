import { create } from "zustand";

interface VehicleFiltersState {
  make: string | null;
  model: string[];
  availability: string | null;
  hasAppliedFilters: boolean;

  setMake: (make: string | null) => void;
  setModel: (model: string[]) => void;
  setAvailability: (availability: string | null) => void;
  setHasAppliedFilters: (applied: boolean) => void;

  resetFilters: () => void;
}

export const useVehicleFilters = create<VehicleFiltersState>((set) => ({
  make: null,
  model: [],
  availability: null,
  hasAppliedFilters: false,

  setMake: (make) =>
    set({
      make,
      model: [],
    }),
  setModel: (model) => set({ model }),
  setAvailability: (availability) => set({ availability }),
  setHasAppliedFilters: (applied) => set({ hasAppliedFilters: applied }),

  resetFilters: () =>
    set({
      make: null,
      model: [],
      availability: null,
      hasAppliedFilters: false,
    }),
}));
