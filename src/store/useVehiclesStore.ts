import { create } from 'zustand';
import type { VehicleResponse } from '@/api/schemas';
import { addToFavorites, removeFromFavorites } from '@/api/favorite/favorite';

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

    toggleFavorite: async (vehicle) => {
    const { favorites } = get();
    const isFavorite = favorites.some((v) => v.id === vehicle.id);

    try {
      if (isFavorite) {
        await removeFromFavorites({vehicle_id: vehicle.id, user_id: '4f1cedb7-a6b5-492d-9929-616ae9598d21'});//TODO
        set({
          favorites: favorites.filter((v) => v.id !== vehicle.id),
        });
      } else {
        await addToFavorites({vehicle_id: vehicle.id, user_id: '4f1cedb7-a6b5-492d-9929-616ae9598d21'});//TODO
        set({
          favorites: [...favorites, vehicle],
        });
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  },
}));
