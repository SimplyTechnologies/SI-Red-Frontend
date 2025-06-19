import LocationAutocomplete from "@/components/custom/vehicleModal/LocationAutocomplete";
import { getGeocode } from "use-places-autocomplete";

interface Props {
  value: string;
  ready: boolean;
  status: string;
  data: google.maps.places.AutocompletePrediction[];
  setValue: (val: string, fetch?: boolean) => void;
  clearSuggestions: () => void;
  index: number;
  onChange: (index: number, updated: any) => void;
  row: any;
}

export function LocationField({
  value,
  ready,
  status,
  data,
  setValue,
  clearSuggestions,
  index,
  onChange,
  row,
}: Props) {
  const handleSelectLocation = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const location = results[0]?.geometry?.location;
      const lat = location?.lat();
      const lng = location?.lng();

      onChange(index, {
        ...row,
        combinedLocation: description,
        coordinates: lat && lng ? `${lat},${lng}` : undefined,
      });
    } catch {
      onChange(index, {
        ...row,
        combinedLocation: description,
        coordinates: undefined,
      });
    }
  };

  return (
    <LocationAutocomplete
      value={value}
      ready={ready}
      status={status}
      data={data}
      setValue={setValue}
      setLocation={() => {}}
      onSelect={handleSelectLocation}
      error={undefined}
    />
  );
}
