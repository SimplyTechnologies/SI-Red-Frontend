import { Tabs } from '@/components/ui/tabs';
import { VEHICLES_TABS } from "@/constants/constants";
import VehiclesTabList from './VehiclesTabList';
import VehiclesTabContent from './VehiclesTabContent';
import FavoritesTabContent from './FavoritesTabContent';
import Map from "@/components/map/Map";

export default function VehiclesTab() {

    return (
        <Tabs
            defaultValue={VEHICLES_TABS.VEHICLES}
            className=" w-full h-[68%] sm:h-[65%] md:h-[75%] lg:h-[81%] bg-background mt-5"
        >
            <VehiclesTabList />
            <VehiclesTabContent />
            <FavoritesTabContent />
            <Map className="w-full h-full" /> 
        </Tabs>
    );
}
