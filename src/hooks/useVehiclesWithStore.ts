import { useEffect } from 'react';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useInfiniteVehicles } from './useInfiniteVehicles';

export const useVehiclesWithStore = () => {
    const search = useVehiclesStore((s) => s.search);
    const { setPagination, setVehicles } = useVehiclesStore();

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteVehicles(search);

    useEffect(() => {
        if (data?.pages) {
            const allVehicles = data.pages.flat();
            setVehicles(allVehicles);
        }
    }, [data, setVehicles]);

    useEffect(() => {
        setPagination({
            fetchNextPage,
            hasNextPage: !!hasNextPage,
            isFetchingNextPage,
        });
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, setPagination]);

    return { isLoading, isError };
};
