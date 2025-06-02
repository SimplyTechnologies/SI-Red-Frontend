import { useInfiniteQuery } from '@tanstack/react-query';
import { getVehicles } from '@/api/vehicle/vehicle';
import type { VehicleResponse } from '@/api/schemas';

const PAGE_SIZE = 10;

export const useInfiniteVehicles = (search?: string) => {
    const searchObj = search ? { search } : {};

    return useInfiniteQuery<VehicleResponse[], unknown>({
        queryKey: ['vehicles', search],

        queryFn: ({ pageParam }) =>
            getVehicles({
                ...searchObj,
                page: pageParam as number,
                limit: PAGE_SIZE,
            }),

        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,

        initialPageParam: 1,
    });
};
