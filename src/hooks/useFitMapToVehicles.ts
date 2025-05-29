import { useEffect, useRef } from "react";
import type { VehicleResponse } from "@/api/schemas";

export function useFitMapToVehicles(
  vehicles: VehicleResponse[],
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  isMapReady: boolean
) {
  const hasFittedRef = useRef(false);

  useEffect(() => {
    if (
      !isMapReady ||
      !mapRef.current ||
      hasFittedRef.current ||
      vehicles.length === 0
    )
      return;

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
      hasFittedRef.current = true;
    }
  }, [vehicles, isMapReady]);
}
