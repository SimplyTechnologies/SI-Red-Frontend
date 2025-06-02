import { useEffect } from "react";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useGetFavorites } from "@/api/favorite/favorite";

export const useFavoritesWithStore = () => {
  const { data, isLoading } = useGetFavorites();
  const setFavorites = useVehiclesStore((s) => s.setFavorites);

  useEffect(() => {
    if (data) {      
      setFavorites(data);
    }
  }, [data, setFavorites]);

  return { isLoading };
};
