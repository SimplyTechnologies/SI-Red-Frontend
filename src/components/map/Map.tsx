import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useRef, useState } from "react";
import { useFitMapToVehicles } from "@/hooks/useFitMapToVehicles";
import { VehicleMarkers } from "./VehicleMarkers";
import type { CSSProperties } from "react";
import { VEHICLES_TABS } from "@/constants/constants";

interface CustomMapProps {
  style?: CSSProperties;
  className?: string;
}

export default function CustomMap({ style, className }: CustomMapProps) {
  const { vehicles, favorites, selectedVehicle } = useVehiclesStore((s) => ({
    vehicles: s.vehicles,
    favorites: s.favorites,
    selectedVehicle: s.selectedVehicle,
  }));
  const activeTab = useVehiclesStore((s) => s.activeTab);

  const visibleVehicles = selectedVehicle
    ? [selectedVehicle]
    : activeTab === VEHICLES_TABS.FAVORITES
    ? favorites
    : vehicles;

  const mapRef = useRef<google.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useFitMapToVehicles(visibleVehicles, mapRef, isMapReady);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <div className={`w-full h-full ${className ?? ""}`}>
        <Map
          mapId="DEMO_MAP_ID"
          style={style ?? { width: "100%", height: "100%" }}
          defaultZoom={13}
          defaultCenter={{ lat: 40.1792, lng: 44.4991 }}
          disableDefaultUI
          clickableIcons={false}
          keyboardShortcuts={false}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl={false}
          onIdle={(event) => {
            mapRef.current = event.map;
            setIsMapReady(true);
          }}
        >
          <VehicleMarkers vehicles={visibleVehicles} />
        </Map>
      </div>
    </APIProvider>
  );
}
