import { useEffect } from "react";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useInfiniteVehicles } from "./useInfiniteVehicles";
import { useGetVehicleMapPoints } from "@/api/vehicle/vehicle";

export const useVehiclesWithStore = () => {
  const search = useVehiclesStore((s) => s.search);
  const { setPagination, setVehicles, setVehicleMapPoints } =
    useVehiclesStore();

  const {
    data: vehicles,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteVehicles(search);

  const { data: mapPoints } = useGetVehicleMapPoints({ search }); 

  useEffect(() => {
    if (vehicles?.pages) {
      const allVehicles = vehicles.pages.flat();
      setVehicles(allVehicles);
    }
  }, [vehicles, setVehicles]);

  useEffect(() => {
    if (mapPoints) {
      setVehicleMapPoints(mapPoints);
    }
  }, [mapPoints, setVehicleMapPoints]);

  useEffect(() => {
    setPagination({
      fetchNextPage,
      hasNextPage: !!hasNextPage,
      isFetchingNextPage,
    });
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, setPagination]);

  return { isLoading, isError };
};
