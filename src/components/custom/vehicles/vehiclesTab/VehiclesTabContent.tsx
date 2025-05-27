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
        <div>
            {VEHICLES_TABS.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="h-full overflow-auto"
                >
                    {tab.value === 'Vehicles' ? (
                        vehicles.length ? (
                            <VehiclesList />
                        ) : (
                            <EmptyVehicles />
                        )
                    ) : favorites.length ? (
                        <FavoritesList />
                    ) : (
                        <EmptyFavorites />
                    )}
                </TabsContent>
            ))}
        </div>
    );
}
