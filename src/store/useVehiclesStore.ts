import { create } from "zustand";
import type { VehicleResponse } from "@/api/schemas";
import { addToFavorites, removeFromFavorites } from "@/api/favorite/favorite";
import { VEHICLES_TABS } from "@/constants/constants";
import { getVehicle } from "@/api/vehicle/vehicle";

type VehiclesTab = (typeof VEHICLES_TABS)[keyof typeof VEHICLES_TABS];

type VehiclesStore = {
  vehicles: VehicleResponse[];
  favorites: VehicleResponse[];
  selectedVehicle: VehicleResponse | null;
  setVehicles: (vehicles: VehicleResponse[]) => void;
  setFavorites: (vehicles: VehicleResponse[]) => void;
  toggleFavorite: (vehicle: VehicleResponse) => void;
  setSelectedVehicle: (vehicle: VehicleResponse | null) => void;
  activeTab: VehiclesTab;
  setActiveTab: (tab: VehiclesTab) => void;
};

export const useVehiclesStore = create<VehiclesStore>((set, get) => ({
  vehicles: [],
  favorites: [],
  activeTab: "Vehicles",

  setVehicles: (vehicles) => {
    set({ vehicles });
  },

  selectedVehicle: null,

  setFavorites: (favorites) => {
    set({ favorites });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  toggleFavorite: async (vehicle) => {
    const { favorites } = get();
    const isFavorite = favorites.some((v) => v.id === vehicle.id);

    try {
      if (isFavorite) {
        await removeFromFavorites({
          vehicle_id: vehicle.id,
          user_id: "8fdd4bb6-e6d0-4f35-9f69-fb862c8039e3",
        }); // TODO
        set({ favorites: favorites.filter((v) => v.id !== vehicle.id) });
      } else {
        await addToFavorites({
          vehicle_id: vehicle.id,
          user_id: "8fdd4bb6-e6d0-4f35-9f69-fb862c8039e3",
        }); // TODO
        set({ favorites: [...favorites, vehicle] });
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
}));
