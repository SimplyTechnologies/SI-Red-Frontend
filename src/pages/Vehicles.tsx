import { AddNewVehicleButton } from "@/components/custom/vehicles/AddNewVehicleButton";
import Filter from "@/components/custom/vehicles/Filter";
import VehicleDetails from "@/components/custom/vehicles/VehicleDetails";
import VehiclesTab from "@/components/custom/vehicles/vehiclesTab/VehiclesTab";
import Map from "@/components/map/Map";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Vehicles() {
  const location = useLocation();
  const { selectedVehicle, setSelectedVehicle } = useVehiclesStore((s) => ({
    selectedVehicle: s.selectedVehicle,
    setSelectedVehicle: s.setSelectedVehicle,
  }));
  
  useEffect(() => {
    if (location.pathname === '/vehicles') {
      setSelectedVehicle(null)
    }
  }, [location]);

  return (
    <section className="flex flex-col lg:flex-row h-full">
      {selectedVehicle ? (
        <article className="w-full lg:w-2/5 lg:h-full pt-5 px-5 bg-white">
          <VehicleDetails />
        </article>
      ) : (
        <article className="w-full lg:w-2/5 h-1/2 lg:h-full pt-5 px-5 bg-white">
          <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
            <Filter />
            <AddNewVehicleButton />
          </div>
          <VehiclesTab />
        </article>
      )}

      <article className="w-full lg:w-3/5 h-full lg:h-full">
        <Map className="w-full h-full" />
      </article>
    </section>
  );
}
