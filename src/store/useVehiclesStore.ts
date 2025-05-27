import { create } from 'zustand';
import type { VehicleResponse } from '@/api/schemas';

type VehiclesStore = {
    vehicles: VehicleResponse[];
    favorites: VehicleResponse[];
    setVehicles: (vehicles: VehicleResponse[]) => void;
    setFavorites: (vehicles: VehicleResponse[]) => void;
    toggleFavorite: (vehicle: VehicleResponse) => void;
};

export const useVehiclesStore = create<VehiclesStore>((set, get) => ({
    vehicles: [],

    favorites: [],

    setVehicles: (vehicles) => {
        set({
            vehicles,
        });
    },

    setFavorites: (favorites) => {
        set({
            favorites,
        });
    },

    toggleFavorite: (vehicle) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some((v) => v.id === vehicle.id);
        const updatedFavorites = isAlreadyFavorite
            ? favorites.filter((v) => v.id !== vehicle.id)
            : [...favorites, vehicle];

        set({ favorites: updatedFavorites });
    },
}));
