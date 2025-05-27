import { Tabs } from '@/components/ui/tabs';
import { useVehiclesWithStore } from '@/hooks/useVehiclesWithStore';
import { VEHICLES_TABS } from "@/constants/constants";
import VehiclesTabList from './VehiclesTabList';
import VehiclesTabListSkeleton from './VehiclesTabListSkeleton';
import VehiclesTabContent from './VehiclesTabContent';

export default function VehiclesTab() {
    const { isLoading } = useVehiclesWithStore();

    return (
        <Tabs
            defaultValue={VEHICLES_TABS.VEHICLES}
            className=" w-full h-[68%] sm:h-[65%] md:h-[75%] lg:h-[81%] bg-background mt-5"
        >
            <VehiclesTabList />
            {isLoading ? (
                <VehiclesTabListSkeleton />
            ) : (
                <VehiclesTabContent />
            )}
        </Tabs>
    );
}
