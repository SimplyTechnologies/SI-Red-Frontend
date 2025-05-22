import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const center = { lat: 40.7128, lng: -74.006 };

const carPositions = [
  { lat: 40.7128, lng: -74.006 },
  { lat: 40.715, lng: -74.002 },
  { lat: 40.718, lng: -74.01 },
  { lat: 40.71, lng: -74.015 },
  { lat: 40.716, lng: -74.008 },
];

export default function CustomMap() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <div className="flex justify-center w-full">
        <Map
          defaultCenter={center}
          defaultZoom={13}
          mapId="DEMO_MAP_ID"
          style={{ width: "85%", height: "58vh" }}
          disableDefaultUI={true}
          clickableIcons={false}
          keyboardShortcuts={false}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl={false}
        >
          {carPositions.map((pos, index) => (
            <AdvancedMarker key={index} position={pos}>
              <img
                src="/icons/mapCarMark.svg"
                alt={`Car ${index + 1}`}
                width={40}
                height={40}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
