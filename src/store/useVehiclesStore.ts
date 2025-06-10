import { create } from "zustand";
import type { VehicleResponse } from "@/api/schemas";
import type { VehicleMapPoint } from "@/api/schemas";
import { addToFavorites, removeFromFavorites } from "@/api/favorite/favorite";
import { VEHICLES_TABS } from "@/constants/constants";
import { getVehicle } from "@/api/vehicle/vehicle";

type VehiclesTab = (typeof VEHICLES_TABS)[keyof typeof VEHICLES_TABS];

type VehiclesStore = {
  vehicles: VehicleResponse[];
  vehicleMapPoints: VehicleMapPoint[];
  favorites: VehicleResponse[];
  activeTab: VehiclesTab;
  search: string;
  selectedVehicle: VehicleResponse | null;
  setSelectedVehicle: (vehicle: VehicleResponse | null) => void;
  setSearch: (search: string) => void;
  setVehicles: (vehicles: VehicleResponse[]) => void;
  setVehicleMapPoints: (points: VehicleMapPoint[]) => void;
  setFavorites: (vehicles: VehicleResponse[]) => void;
  setActiveTab: (tab: VehiclesTab) => void;
  toggleFavorite: (vehicle: VehicleResponse) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  setPagination: (opts: {
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  }) => void;
};

export const useVehiclesStore = create<VehiclesStore>((set, get) => ({
  vehicles: [],
  vehicleMapPoints: [],
  favorites: [],
  activeTab: VEHICLES_TABS.VEHICLES,
  search: "",
  selectedVehicle: null,

  setSearch: (search) => set({ search }),

  setVehicles: (vehicles) => set({ vehicles }),

  setVehicleMapPoints: (points) => set({ vehicleMapPoints: points }),

  setFavorites: (favorites) => set({ favorites }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleFavorite: async (vehicle) => {
    const { favorites, vehicles } = get();

    try {
      const updatedVehicles = vehicles.map((v) =>
        v.id === vehicle.id ? { ...v, isFavorite: !vehicle.isFavorite } : v
      );

      if (vehicle.isFavorite) {
        await removeFromFavorites({ vehicle_id: vehicle.id });
        set({
          favorites: favorites.filter((v) => v.id !== vehicle.id),
          vehicles: updatedVehicles,
        });
      } else {
        await addToFavorites({ vehicle_id: vehicle.id });
        set({
          favorites: [...favorites, { ...vehicle, isFavorite: true }],
          vehicles: updatedVehicles,
        });
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  },

  setSelectedVehicle: async (vehicle) => {
    try {
      if (vehicle) {
        const v = await getVehicle(vehicle.id);
        set({ selectedVehicle: v });
      } else {
        set({ selectedVehicle: null });
      }
    } catch (error) {
      console.error("Failed to get vehicle:", error);
    }
  },
  fetchNextPage: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
  setPagination: ({ fetchNextPage, hasNextPage, isFetchingNextPage }) =>
    set({ fetchNextPage, hasNextPage, isFetchingNextPage }),
}));
