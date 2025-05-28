import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { VehicleResponse } from "@/api/schemas";

export function VehicleMarkers({ vehicles }: { vehicles: VehicleResponse[] }) {
  return (
    <>
      {vehicles.map((vehicle) => {
        const [latStr, lngStr] = vehicle.location?.split(",") ?? [];
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <AdvancedMarker key={vehicle.id} position={{ lat, lng }}>
            <img
              src="/icons/mapCarMark.svg"
              alt={`Car ${vehicle.vin}`}
              width={40}
              height={40}
            />
          </AdvancedMarker>
        );
      })}
    </>
  );
}
