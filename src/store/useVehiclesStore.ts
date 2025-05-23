// stores/useVehiclesStore.ts
import { create } from 'zustand';
import type { Vehicle } from '@/types/vehicleType';

type VehiclesStore = {
    vehicles: Vehicle[];
    favorites: Vehicle[];
    setVehicles: (vehicles: Vehicle[]) => void;
    setFavorites: (vehicles: Vehicle[]) => void;
};

export const useVehiclesStore = create<VehiclesStore>((set) => ({
    vehicles: [
        {
            vin: '1HGCM82633A004352',
            make: 'Honda',
            model: 'Accord',
            year: 2019,
            location: 'New York, NY',
            status: 'Sold',
            isFavorite: false,
        },
        {
            vin: '1FTFW1ET1EKE57163',
            make: 'Ford',
            model: 'F-150',
            year: 2021,
            location: 'Dallas, TX',
            status: 'Sold',
            isFavorite: true,
        },
        {
            vin: 'WBA3A5C51CFD36845',
            make: 'BMW',
            model: '320i',
            year: 2020,
            location: 'Los Angeles, CA',
            status: 'Sold',
            isFavorite: false,
        },
        {
            vin: 'JHMFA16586S012345',
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            location: 'Seattle, WA',
            status: 'Sold',
            isFavorite: false,
        },
        {
            vin: '2T3ZF4DV6BW067382',
            make: 'Toyota',
            model: 'RAV4',
            year: 2022,
            location: 'Chicago, IL',
            status: 'In Stock',
            isFavorite: true,
        },
        {
            vin: '3FA6P0LU6KR123456',
            make: 'Ford',
            model: 'Fusion',
            year: 2020,
            location: 'Miami, FL',
            status: 'In Stock',
            isFavorite: true,
        },
        {
            vin: '5YJ3E1EA7KF317839',
            make: 'Tesla',
            model: 'Model 3',
            year: 2023,
            location: 'San Francisco, CA',
            status: 'Sold',
            isFavorite: false,
        },
    ],

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
