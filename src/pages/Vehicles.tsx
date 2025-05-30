import { AddNewVehicleButton } from '@/components/custom/vehicles/AddNewVehicleButton';
import Filter from '@/components/custom/vehicles/Filter';
import VehiclesTab from '@/components/custom/vehicles/vehiclesTab/VehiclesTab';
import Map from '@/components/map/Map';

export default function Vehicles() {
    return (
        <section className="flex flex-col lg:flex-row h-full">
            <article className="w-full lg:w-2/5 h-1/2 lg:h-full pt-5 px-5 bg-white">
                <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
                    <Filter />
                    <AddNewVehicleButton />
                </div>
                <VehiclesTab />
            </article>

            <article className="w-full lg:w-3/5 h-1/2 lg:h-full">
                <Map className="w-full h-full" />
            </article>
        </section>
    );
}
