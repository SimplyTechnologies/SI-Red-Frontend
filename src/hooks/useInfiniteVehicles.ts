import { useInfiniteQuery } from '@tanstack/react-query';
import { getVehicles } from '@/api/vehicle/vehicle';
import type { VehicleResponse } from '@/api/schemas';

const PAGE_SIZE = 10;

export const useInfiniteVehicles = (search?: string, make?: string, model?: string[], availability?: string) => {
    const searchObj = search ? { search } : {};
    const makesObj = make ? { make } : {};
    const modelsObj = model && model.length > 0 && make ? { model } : {};
    const availabilityObj = availability ? { availability } : {};

    return useInfiniteQuery<VehicleResponse[], unknown>({
        queryKey: ['vehicles', search, makesObj, modelsObj, availabilityObj],

        queryFn: ({ pageParam }) =>
            getVehicles({
                ...searchObj,
                ...makesObj,
                ...modelsObj,
                ...availabilityObj,
                page: pageParam as number,
                limit: PAGE_SIZE,
            }),

        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,

        initialPageParam: 1,
    });
};
