import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useEffect, useRef, useState } from "react";
import { useFitMapToVehicles } from "@/hooks/useFitMapToVehicles";
import { VehicleMarkers } from "./VehicleMarkers";
import type { CSSProperties } from "react";
import { VEHICLES_TABS } from "@/constants/constants";
import { useVehicleStore } from "@/store/useVehicleModalStore";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface CustomMapProps {
  style?: CSSProperties;
  className?: string;
}

export default function CustomMap({ style, className }: CustomMapProps) {
  const { favorites, selectedVehicle } = useVehiclesStore((s) => ({
    vehicles: s.vehicles,
    favorites: s.favorites,
    selectedVehicle: s.selectedVehicle,
  }));
  const activeTab = useVehiclesStore((s) => s.activeTab);
  const vehicleMapPoints = useVehiclesStore((s) => s.vehicleMapPoints);
  const {
    isAddNewVehicleModalOpened,
    setAddNewVehicleModalOpen,
    prefillLatLngLocation,
  } = useVehicleStore();

  const visibleVehicles = selectedVehicle
    ? [selectedVehicle]
    : activeTab === VEHICLES_TABS.FAVORITES
    ? favorites
    : vehicleMapPoints;

  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [openRightMenu, setOpenRightMenu] = useState(false);
  const [rightClickLocation, setRightClickLocation] = useState<{
    lat: number;
    lng: number;
    clientX: number;
    clientY: number;
  } | null>(null);

  useEffect(() => {
    if (isAddNewVehicleModalOpened) {
      setOpenRightMenu(false);
    }
  }, [isAddNewVehicleModalOpened]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!mapContainerRef.current?.contains(e.target as Node)) {
        setOpenRightMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mapContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("contextmenu", handler, { capture: true });
    return () => {
      document.removeEventListener("contextmenu", handler, { capture: true });
    };
  }, []);

  useFitMapToVehicles(visibleVehicles, mapRef, isMapReady);

  const handleEvent = (event: any) => {
    mapRef.current = event.map;
    setIsMapReady(true);

    if (event.map && !event.map.__rightClickListenerAdded) {
      event.map.addListener("rightclick", (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        const domEvent = e.domEvent as MouseEvent;
        if (lat !== undefined && lng !== undefined) {
          setRightClickLocation({
            lat,
            lng,
            clientX: domEvent.clientX,
            clientY: domEvent.clientY,
          });
          setOpenRightMenu(true);
        }
      });
      (event.map as any).__rightClickListenerAdded = true;
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <div ref={mapContainerRef} className={`w-full h-full ${className ?? ""}`}>
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
          onIdle={(e) => handleEvent(e)}
        >
          <VehicleMarkers vehicles={visibleVehicles} />
        </Map>
        {openRightMenu && rightClickLocation && (
          <div
            className="absolute z-10"
            style={{
              left: rightClickLocation.clientX,
              top: rightClickLocation.clientY,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <Button
                variant="outline"
                onClick={() => {
                  if (rightClickLocation) {
                    prefillLatLngLocation(
                      rightClickLocation.lat,
                      rightClickLocation.lng
                    ); // ✅ store prefill
                  }
                  setAddNewVehicleModalOpen(true);
                }}
                className="text-heading"
              >
                Add New Vehicle
              </Button>
            </DropdownMenu>
          </div>
        )}
      </div>
    </APIProvider>
  );
}
