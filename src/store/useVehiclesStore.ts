import { create } from "zustand";
import type { VehicleResponse } from "@/api/schemas";
import type { VehicleMapPoint } from "@/api/schemas";
import { addToFavorites, removeFromFavorites } from "@/api/favorite/favorite";
import { VEHICLES_TABS } from "@/constants/constants";
import { getVehicle } from "@/api/vehicle/vehicle";
import { customMutator } from "@/lib/api/customMutator";

type VehiclesTab = (typeof VEHICLES_TABS)[keyof typeof VEHICLES_TABS];
type DownloadType = "vehicles" | "favorites";

type VehiclesStore = {
  vehicles: VehicleResponse[];
  vehicleMapPoints: VehicleMapPoint[];
  favorites: VehicleResponse[];
  activeTab: VehiclesTab;
  search: string;
  selectedVehicle: VehicleResponse | null;
  isDownloadingCsv: boolean;
  setSelectedVehicle: (vehicle: VehicleResponse | null) => void;
  setSearch: (search: string) => void;
  setVehicles: (vehicles: VehicleResponse[]) => void;
  setVehicleMapPoints: (points: VehicleMapPoint[]) => void;
  setFavorites: (vehicles: VehicleResponse[]) => void;
  setActiveTab: (tab: VehiclesTab) => void;
  toggleFavorite: (vehicle: VehicleResponse) => void;
  downloadVehiclesCsv: (
    search?: string,
    filters?: Record<string, any>
  ) => Promise<void>;
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
  isDownloadingCsv: false,

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

  downloadVehiclesCsv: async (
    search?: string,
    filters?: Record<string, any>
  ) => {
    set({ isDownloadingCsv: true });
    try {
      const type: DownloadType =
        get().activeTab === VEHICLES_TABS.FAVORITES ? "favorites" : "vehicles";

      // Build query params
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value != null && value !== "") {
            // If value is array, join with comma, else just string
            const val = Array.isArray(value) ? value.join(",") : String(value);
            params.append(key, val);
          }
        }
      }
      params.append("type", type);

      const url = `/vehicles/download-csv?${params.toString()}`;

      const blob = await customMutator<Blob>({
        url,
        method: "GET",
        responseType: "stream",
        headers: {
          Accept: "text/csv",
        },
      });

      const prefix = type === "favorites" ? "favorite-vehicles" : "vehicles";
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${prefix}_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download CSV:", error);
      throw error;
    } finally {
      set({ isDownloadingCsv: false });
    }
  },

  fetchNextPage: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
  setPagination: ({ fetchNextPage, hasNextPage, isFetchingNextPage }) =>
    set({ fetchNextPage, hasNextPage, isFetchingNextPage }),
}));
