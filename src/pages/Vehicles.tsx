import { AddNewVehicleButton } from '@/components/custom/vehicles/AddNewVehicleButton';
import Filter from '@/components/custom/vehicles/Filter';
import VehiclesTab from '@/components/custom/vehicles/VehiclesTab';

export default function Vehicles() {
    return (
        <section className="flex flex-col lg:flex-row h-full">
            {/* Vehicle panel */}
            <article className="w-full  lg:w-2/5 h-1/2 lg:h-full pt-5 px-5 bg-white">
                <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
                    <Filter />
                    <AddNewVehicleButton />
                </div>
                <VehiclesTab />
            </article>

            {/* Map panel */}
            <article className="w-full lg:w-3/5 h-1/2 lg:h-full flex justify-center items-center bg-slate-600">
                <h1 className="text-3xl text-white">Map</h1>
            </article>
        </section>
    );
}
