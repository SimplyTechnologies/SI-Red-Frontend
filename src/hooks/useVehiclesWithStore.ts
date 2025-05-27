import { useEffect } from 'react';
import { useGetVehicles } from '@/api/vehicle/vehicle';
import { useVehiclesStore } from '@/store/useVehiclesStore';

export const useVehiclesWithStore = () => {
    const { data, isLoading, isError } = useGetVehicles({
        userId: "4f1cedb7-a6b5-492d-9929-616ae9598d21",//TODO
    });
    const setVehicles = useVehiclesStore((s) => s.setVehicles);

    useEffect(() => {
        if (data) {            
            setVehicles(data);
        }
    }, [data, setVehicles]);

    return { isLoading, isError };
};
