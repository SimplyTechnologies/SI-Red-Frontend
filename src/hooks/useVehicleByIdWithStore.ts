import { useEffect } from "react";
import { useGetVehicle } from "@/api/vehicle/vehicle";
import { useVehiclesStore } from "@/store/useVehiclesStore";

export const useVehicleByIdWithStore = ({ vehicleId }: { vehicleId: string }) => {
  const { data: vehicle } = useGetVehicle(vehicleId);
  const setSelectedVehicle = useVehiclesStore(s => s.setSelectedVehicle);

  useEffect(() => {
    if (vehicle) {
      setSelectedVehicle(vehicle); 
    }
  }, [vehicle]);

  return null; 
}