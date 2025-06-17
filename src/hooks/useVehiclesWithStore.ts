import { useEffect } from "react";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useInfiniteVehicles } from "./useInfiniteVehicles";
import { useGetVehicleMapPoints } from "@/api/vehicle/vehicle";
import { useVehicleFilters } from "@/store/useVehicleFilters";

export const useVehiclesWithStore = () => {
  const search = useVehiclesStore((s) => s.search);
  const { make, model, availability, hasAppliedFilters } = useVehicleFilters();

  const { setPagination, setVehicles, setVehicleMapPoints } =
    useVehiclesStore();

  const {
    data: vehicles,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteVehicles(
    search,
    hasAppliedFilters ? make ?? undefined : undefined,
    hasAppliedFilters ? model ?? undefined : undefined,
    hasAppliedFilters ? availability ?? undefined : undefined
  );

  const { data: mapPoints } = useGetVehicleMapPoints({
    ...(search ? { search } : {}),
    ...(hasAppliedFilters && make ? { make } : {}),
    ...(hasAppliedFilters && model?.length ? { model } : {}),
    ...(hasAppliedFilters && availability ? { availability } : {}),
  });

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
