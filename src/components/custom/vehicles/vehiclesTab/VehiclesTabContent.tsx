import { TabsContent } from '@/components/ui/tabs';
import { VEHICLES_TABS } from '@/constants/constants';
import VehiclesList from '../VehiclesList';
import EmptyVehicles from '../EmptyVehicles';
import FavoritesList from '../FavoritesList';
import EmptyFavorites from '../EmptyFavorites';
import { useVehiclesStore } from '@/store/useVehiclesStore';

export default function VehiclesTabContent() {
    const { vehicles, favorites } = useVehiclesStore();

    return (
        <>
            <TabsContent
                value={VEHICLES_TABS.VEHICLES}
                className="h-full overflow-auto"
            >
                {vehicles.length ? <VehiclesList /> : <EmptyVehicles />}
            </TabsContent>

            <TabsContent
                value={VEHICLES_TABS.FAVORITES}
                className="h-full overflow-auto"
            >
                {favorites.length ? <FavoritesList /> : <EmptyFavorites />}
            </TabsContent>
        </>
    );
}
