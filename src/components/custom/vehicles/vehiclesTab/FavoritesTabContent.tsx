import { TabsContent } from "@/components/ui/tabs";
import { VEHICLES_TABS } from "@/constants/constants";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import VehiclesTabListSkeleton from "./VehiclesTabListSkeleton";
import { useFavoritesWithStore } from "@/hooks/useFavoritesWithStore";
import FavoritesList from "../FavoritesList";
import EmptyFavorites from "../EmptyFavorites";

export default function FavoritesTabContent() {
  const { favorites } = useVehiclesStore();
  const { isLoading } = useFavoritesWithStore();

  return (
    <>
      {isLoading ? (
        <VehiclesTabListSkeleton />
      ) : (
        <TabsContent
          value={VEHICLES_TABS.FAVORITES}
          className="h-full overflow-auto"
        >
          {favorites.length ? <FavoritesList /> : <EmptyFavorites />}
        </TabsContent>
      )}
    </>
  );
}
