import VehiclesListItem from "./VehiclesListItem";
import type { VehicleResponse } from "@/api/schemas";
import { useVehiclesStore } from "@/store/useVehiclesStore";

function FavoritesList() {
  const favorites = useVehiclesStore((s) => s.favorites);

  return (
    <div className="gap-2 pl-3 pr-1.5 mt-1">
      {favorites.map((vehicle: VehicleResponse) => {
        return (
          <VehiclesListItem
            vehicle={{ ...vehicle, isFavorite: true }}
            key={vehicle.id}
          />
        );
      })}
    </div>
  );
}

export default FavoritesList;
