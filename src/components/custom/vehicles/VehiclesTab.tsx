import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DownloadIcon from '@/assets/icons/download.svg?react';
import FavoritesList from './FavoritesList';
import VehiclesList from './VehiclesList';
import EmptyVehicles from './EmptyVehicles';
import EmptyFavorites from './EmptyFavorites';
import { useVehiclesStore } from '@/store/useVehiclesStore';


export default function VehiclesTab() {
    const { vehicles, favorites } = useVehiclesStore();


    const tabs = [
        {
            name: 'Vehicles',
            value: 'Vehicles',
        },
        {
            name: 'Favorites',
            value: 'Favorites',
        },
    ];

    return (
        <Tabs
            defaultValue={tabs[0].value}
            className=" w-full h-[68%] sm:h-[65%] md:h-[75%] lg:h-[81%] bg-background mt-5"
        >
            <TabsList className="w-full md:w-2/3 p-0 bg-background justify-between border-b rounded-none">
                <div>
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={`rounded-none h-full font-normal data-[state=active]:shadow-none pb-[10px]  border-b-[3px] border-transparent data-[state=active]:border-sidebar-collapsed data-[state=active]:text-sidebar-collapsed data-[state=active]:font-bold`}
                        >
                            <p className="text-[16px]">{tab.name}</p>
                        </TabsTrigger>
                    ))}
                </div>

                <DownloadIcon className="mr-14" />
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="h-full overflow-auto"
                >
                    {tab.value === 'Vehicles' ? (
                        vehicles.length ? <VehiclesList vehicles={vehicles}/> : <EmptyVehicles />
                    ) : (
                        favorites.length ? <FavoritesList /> : <EmptyFavorites />
                    )}

                </TabsContent>
            ))}
        </Tabs>
    );
}
