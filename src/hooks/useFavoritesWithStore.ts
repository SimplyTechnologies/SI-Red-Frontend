import { useEffect } from "react";
import { useGetVehicles } from "@/api/vehicle/vehicle";
import { useVehiclesStore } from "@/store/useVehiclesStore";

export const useFavoritesWithStore = () => {
  const { data, isLoading } = useGetVehicles({
    userId: "8fdd4bb6-e6d0-4f35-9f69-fb862c8039e3",//TODO
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
