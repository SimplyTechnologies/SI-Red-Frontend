import { TabsContent } from '@/components/ui/tabs';
import { VEHICLES_TABS } from '@/constants/constants';
import VehiclesList from '../VehiclesList';
import EmptyVehicles from '../EmptyVehicles';

import VehiclesTabListSkeleton from './VehiclesTabListSkeleton';
import { useInfiniteVehicles } from '@/hooks/useInfiniteVehicles';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useEffect, useMemo } from 'react';

export default function VehiclesTabContent() {
    const search = useVehiclesStore((s) => s.search);

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteVehicles(search);

    const allVehicles = useMemo(() => data?.pages.flat() ?? [], [data]);

    const setVehicles = useVehiclesStore((s) => s.setVehicles);
    const setPagination = useVehiclesStore((s) => s.setPagination);

    useEffect(() => {
        if (!data) return;

        const allVehicles = data.pages.flat();
        setVehicles(allVehicles);
        setPagination({ fetchNextPage, hasNextPage, isFetchingNextPage });
    }, [
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        setVehicles,
        setPagination,
    ]);

    return (
        <>
            {isLoading ? (
                <VehiclesTabListSkeleton />
            ) : (
                <TabsContent
                    value={VEHICLES_TABS.VEHICLES}
                    className="h-full overflow-auto"
                >
                    {allVehicles.length ? <VehiclesList /> : <EmptyVehicles />}
                </TabsContent>
            )}
        </>
    );
}
