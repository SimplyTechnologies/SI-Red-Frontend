import { useEffect } from "react";
import { useGetVehicles } from "@/api/vehicle/vehicle";
import { useVehiclesStore } from "@/store/useVehiclesStore";

export const useFavoritesWithStore = () => {
  const { data, isLoading } = useGetVehicles();
  const setFavorites = useVehiclesStore((s) => s.setFavorites);

  useEffect(() => {
    if (data) {
      const favorites = data.filter((fav) => fav.isFavorite); // TODO isFavorite must be boolean property in get vehicles
      setFavorites(favorites);
    }
  }, [data, setFavorites]);

  return { isLoading };
};
