import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import type { CSSProperties } from "react";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useRef } from "react";

interface CustomMapProps {
  style?: CSSProperties;
  className?: string;
}

const fallbackCenter = { lat: 40.1792, lng: 44.4991 };

export default function CustomMap({ style, className }: CustomMapProps) {
  const vehicles = useVehiclesStore((s) => s.vehicles);
  const mapRef = useRef<google.maps.Map | null>(null);
  const hasFittedRef = useRef(false);

  function handleIdle() {
    if (!mapRef.current || hasFittedRef.current || vehicles.length === 0)
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
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <div className={`w-full h-full ${className ?? ""}`}>
        <Map
          mapId="DEMO_MAP_ID"
          style={style ?? { width: "100%", height: "100%" }}
          defaultZoom={13}
          defaultCenter={fallbackCenter}
          disableDefaultUI
          clickableIcons={false}
          keyboardShortcuts={false}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl={false}
          onIdle={(event) => {
            mapRef.current = event.map;
            handleIdle();
          }}
        >
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
        </Map>
      </div>
    </APIProvider>
  );
}
