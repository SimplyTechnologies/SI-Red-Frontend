import type { VehicleResponse } from "@/api/schemas";
import { getVehicleStatusIcon, getLikeIcon } from "@/utils/vehicleHelpers";
import { getVehicleStatusBadge } from "@/helpers/getVehicleStatusBadge";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useNavigate } from "react-router-dom";
import type { VehicleStatusKeys } from "@/constants/constants";
interface propVehicle extends VehicleResponse {
  isFavorite: boolean;
}

type Props = {
  vehicle: propVehicle;
};

export default function VehiclesListItem({ vehicle }: Props) {
  const VehicleStatusIcon = getVehicleStatusIcon(
    vehicle.status as VehicleStatusKeys
  );
  const { toggleFavorite, setSelectedVehicle } = useVehiclesStore((s) => ({
    favorites: s.favorites,
    toggleFavorite: s.toggleFavorite,
    setSelectedVehicle: s.setSelectedVehicle,
  }));
  const LikeButtonIcon = getLikeIcon(vehicle?.isFavorite);
  const navigate = useNavigate();

  const showVehicleDetails = () => {
    setSelectedVehicle(vehicle);
    navigate(`/vehicles/${vehicle.id}`);
  };

  return (
    <div
      key={vehicle.vin}
      className="w-full py-5 flex justify-between gap-2 border-b"
    >
      <div className="flex w-3/4 cursor-pointer" onClick={showVehicleDetails}>
        <VehicleStatusIcon />
        <div className="text-[14px] ml-3">
          <p className="text-heading font-bold">{vehicle.vin}</p>
          <p className="text-text-muted">
            {" "}
            {vehicle?.model!.make.name} {vehicle.model!.name} {vehicle.year}
          </p>
          <p className="text-text-muted">
            Location:{" "}
            <span className="text-heading font-medium">
              {vehicle.city}, {vehicle.street}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-start w-1/3  md:w-1/5 justify-between">
        {getVehicleStatusBadge(vehicle.status as VehicleStatusKeys)}
        <div>
          <LikeButtonIcon
            className="cursor-pointer"
            onClick={() => toggleFavorite(vehicle)}
          />
        </div>
      </div>
    </div>
  );
}
