import { useEffect, useState } from "react";

interface ReverseGeocodeResult {
  address: string;
  components: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

export function useReverseGeocode(
  latLng: { lat: number; lng: number } | null,
  onComplete: (data: ReverseGeocodeResult) => void
) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!latLng) return;
    if (!window.google?.maps?.Geocoder) {
      console.error("Google Maps Geocoder not available");
      return;
    }

    setIsLoading(true);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      setIsLoading(false);
      if (status === "OK" && results && results.length > 0) {
        const address =
          results.find((result) => {
            const isPlusCode = result.formatted_address.includes("+");
            const hasStreet =
              result.types?.includes("street_address") ||
              result.types?.includes("premise");
            return !isPlusCode && hasStreet;
          }) ||
          results.find((r) => !r.formatted_address.includes("+")) ||
          results[0];

        const components = address.address_components;

        const getComponent = (type: string) =>
          components.find((c) => c.types.includes(type))?.long_name ?? "";

        onComplete({
          address: address.formatted_address,
          components: {
            street: getComponent("route"),
            city:
              getComponent("locality") ||
              getComponent("sublocality") ||
              getComponent("administrative_area_level_2"),
            state: getComponent("administrative_area_level_1"),
            country: getComponent("country"),
            zip: getComponent("postal_code"),
          },
        });
      } else {
        console.warn("Reverse geocoding failed:", status);
      }
    });
  }, [latLng]);

  return { isLoading };
}
