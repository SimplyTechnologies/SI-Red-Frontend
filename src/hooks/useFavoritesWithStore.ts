import { useEffect } from "react";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useGetFavorites } from "@/api/favorite/favorite";

export const useFavoritesWithStore = () => {
  const { data, isLoading } = useGetFavorites({
    user_id: "8fdd4bb6-e6d0-4f35-9f69-fb862c8039e3", //TODO
  });
  const setFavorites = useVehiclesStore((s) => s.setFavorites);

  useEffect(() => {
    if (data) {      
      setFavorites(data);
    }
  }, [data, setFavorites]);

  return { isLoading };
};
