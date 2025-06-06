import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useGetVehicle } from "@/api/vehicle/vehicle";
import Map from "@/components/map/Map";
import VehicleHeader from "./VehicleHeader";
import VehicleInfo from "./VehicleInfo";
import AssignCustomerSection from "./AssignCustomerSection";

export default function VehicleDetails() {
  const { setSelectedVehicle } = useVehiclesStore((s) => ({
    selectedVehicle: s.selectedVehicle,
    setSelectedVehicle: s.setSelectedVehicle,
  }));

  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const { data: vehicle, isLoading } = useGetVehicle(id);

  useEffect(() => {
    setSelectedVehicle(vehicle || null);
  }, [vehicle]);

  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-full">
      <div>
        <div className="p-5 pb-0">
          <VehicleHeader />
          <VehicleInfo isLoading={isLoading} />
          <AssignCustomerSection />
        </div>
      </div>
      <Map className="w-full h-full" />
    </div>
  );
}
