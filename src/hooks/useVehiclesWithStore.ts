import { useEffect } from "react";
import { useGetVehicles } from "@/api/vehicle/vehicle";
import { useVehiclesStore } from "@/store/useVehiclesStore";

export const useVehiclesWithStore = () => {
  const { data, isLoading, isError } = useGetVehicles();
  const setVehicles = useVehiclesStore((s) => s.setVehicles);

  useEffect(() => {
    if (data) {
      setVehicles(data);
    }
  }, [data, setVehicles]);

  return { isLoading, isError };
};
