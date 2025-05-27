import { create } from 'zustand';
import type { VehicleResponse } from '@/api/schemas';

type VehiclesStore = {
    vehicles: VehicleResponse[];
    favorites: VehicleResponse[];
    setVehicles: (vehicles: VehicleResponse[]) => void;
    setFavorites: (vehicles: VehicleResponse[]) => void;
};

export const useVehiclesStore = create<VehiclesStore>((set) => ({
    vehicles: [],

    favorites: [],

    setVehicles: (vehicles) => {
        set({
            vehicles,
        });
    },

    setFavorites: (vehicles) => {
        set({
            vehicles,
        });
    },
}));
