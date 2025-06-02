import { useEffect } from "react";
import type { VehicleResponse, VehicleMapPoint } from "@/api/schemas";

export function useFitMapToVehicles(
  vehicles: VehicleResponse[] | VehicleMapPoint[],
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  isMapReady: boolean
) {
  useEffect(() => {
    if (!isMapReady || !mapRef.current || vehicles.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    vehicles.forEach((vehicle) => {
      const [latStr, lngStr] = vehicle.location?.split(",") ?? [];
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend({ lat, lng });
      }
    });

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds);
    }
  }, [vehicles, isMapReady]);
}
