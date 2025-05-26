import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DownloadIcon from '@/assets/icons/download.svg?react';
import FavoritesList from './FavoritesList';
import VehiclesList from './VehiclesList';
import EmptyVehicles from './EmptyVehicles';
import EmptyFavorites from './EmptyFavorites';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useVehiclesWithStore } from '@/hooks/useVehiclesWithStore';
import { Skeleton } from '@/components/ui/skeleton';

export default function VehiclesTab() {
    const { isLoading } = useVehiclesWithStore();
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
            {isLoading ? (
                <div className="w-full py-5 flex justify-between gap-2 border-b">
                    <div className="flex w-3/4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="ml-3 space-y-2 flex flex-col justify-center">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-40 h-4" />
                            <Skeleton className="w-48 h-4" />
                        </div>
                    </div>
                    <div className="flex items-start w-1/3 md:w-1/5 justify-between">
                        <Skeleton className="w-16 h-6 rounded-md" />
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </div>
                </div>
            ) : (
                tabs.map((tab) => (
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
                ))
            )}
        </Tabs>
    );
}
