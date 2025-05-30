import VehiclesListItem from './VehiclesListItem';
import type { VehicleResponse } from '@/api/schemas';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useEffect, useRef } from 'react';

function VehiclesList() {
    const { vehicles, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useVehiclesStore();
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loaderRef.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <div className="gap-2 pl-3 pr-1.5 mt-1">
            {vehicles.map((vehicle: VehicleResponse) => {
                return <VehiclesListItem vehicle={vehicle} key={vehicle.id} />;
            })}
            {hasNextPage && <div ref={loaderRef} className="h-12" />}
        </div>
    );
}

export default VehiclesList;
