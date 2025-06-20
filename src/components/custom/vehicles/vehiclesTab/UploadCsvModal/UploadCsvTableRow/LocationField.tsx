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
  error?: string;
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
  error,
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
        coordinates: lat && lng ? `${lat},${lng}` : "",
      });
    } catch {
      onChange(index, {
        ...row,
        combinedLocation: description,
        coordinates: "",
      });
    }
  };

  const handleInputChange = (text: string) => {
    setValue(text);

    if (text.trim() === "") {
      onChange(index, {
        ...row,
        combinedLocation: "",
        coordinates: "",
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
      onInputChange={handleInputChange} // 👈 добавлено
      error={error}
      showLabel={false}
      className="w-full"
      inputClassName="h-[40px] text-sm"
    />
  );
}
