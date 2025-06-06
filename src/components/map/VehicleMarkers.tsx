import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import type { VehicleMapPoint, VehicleResponse } from "@/api/schemas";

interface Props {
  vehicles: VehicleResponse[] | VehicleMapPoint[]
}

export function VehicleMarkers({ vehicles }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {vehicles.map((vehicle) => {
        const [latStr, lngStr] = vehicle.location?.split(",") ?? [];
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <AdvancedMarker key={vehicle.id} position={{ lat, lng }}>
            <div
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              className="cursor-pointer"
            >
              <img
                src="/icons/mapCarMark.svg"
                alt={`Car ${vehicle.id}`}
                width={40}
                height={40}
              />
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
}
