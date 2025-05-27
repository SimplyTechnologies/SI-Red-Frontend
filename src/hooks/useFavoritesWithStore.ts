import { useEffect } from "react";
import { useGetVehicles } from "@/api/vehicle/vehicle";
import { useVehiclesStore } from "@/store/useVehiclesStore";

export const useFavoritesWithStore = () => {
  const { data, isLoading } = useGetVehicles({
    userId: "4f1cedb7-a6b5-492d-9929-616ae9598d21",//TODO
  });
  const setFavorites = useVehiclesStore((s) => s.setFavorites);

  useEffect(() => {
    if (data) {
      const favorites = data.filter((fav) => fav.isFavorite);
      setFavorites(favorites);
    }
  }, [data, setFavorites]);

  return { isLoading };
};
