import { create } from 'zustand';
import type { VehicleResponse } from '@/api/schemas';
import { addToFavorites, removeFromFavorites } from '@/api/favorite/favorite';
import { VEHICLES_TABS } from '@/constants/constants';

type VehiclesTab = (typeof VEHICLES_TABS)[keyof typeof VEHICLES_TABS];

type VehiclesStore = {
    vehicles: VehicleResponse[];
    favorites: VehicleResponse[];
    activeTab: VehiclesTab;
    search: string;
    selectedVehicle: VehicleResponse | null;
    setSelectedVehicle: (vehicle: VehicleResponse | null) => void;
    setSearch: (search: string) => void;
    setVehicles: (vehicles: VehicleResponse[]) => void;
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
    favorites: [],
    activeTab: VEHICLES_TABS.VEHICLES,
    search: '',
    selectedVehicle: null,

    setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),


    setSearch: (search) => set({ search }),

    setVehicles: (vehicles) => set({ vehicles }),

    setFavorites: (favorites) => set({ favorites }),

    setActiveTab: (tab) => set({ activeTab: tab }),

    toggleFavorite: async (vehicle) => {
        const { favorites, vehicles } = get();
        const isFavorite = favorites.some((v) => v.id === vehicle.id);

        try {
            if (isFavorite) {
                await removeFromFavorites({
                    vehicle_id: vehicle.id,
                    user_id: '8fdd4bb6-e6d0-4f35-9f69-fb862c8039e3',
                });

                set({
                    favorites: favorites.filter((v) => v.id !== vehicle.id),
                    vehicles: vehicles.map((v) =>
                        v.id === vehicle.id ? { ...v, isFavorite: false } : v
                    ),
                });
            } else {
                await addToFavorites({
                    vehicle_id: vehicle.id,
                    user_id: '8fdd4bb6-e6d0-4f35-9f69-fb862c8039e3',
                });

                set({
                    favorites: [...favorites, { ...vehicle, isFavorite: true }],
                    vehicles: vehicles.map((v) =>
                        v.id === vehicle.id ? { ...v, isFavorite: true } : v
                    ),
                });
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    },

    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
    setPagination: ({ fetchNextPage, hasNextPage, isFetchingNextPage }) =>
        set({ fetchNextPage, hasNextPage, isFetchingNextPage }),
}));
