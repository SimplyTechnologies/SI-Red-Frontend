import { Tabs } from '@/components/ui/tabs';
import VehiclesTabList from './VehiclesTabList';
import VehiclesTabContent from './VehiclesTabContent';
import FavoritesTabContent from './FavoritesTabContent';
import { useVehiclesStore } from '@/store/useVehiclesStore';

export default function VehiclesTab() {
    const activeTab = useVehiclesStore((s) => s.activeTab);

    return (
        <Tabs
            value={activeTab}
            className=" w-full h-[68%] sm:h-[65%] md:h-[75%] lg:h-[81%] bg-background mt-5"
        >
            <VehiclesTabList />
            {activeTab === 'Vehicles' && <VehiclesTabContent />}
            {activeTab === 'Favorites' && <FavoritesTabContent />}
        </Tabs>
    );
}
