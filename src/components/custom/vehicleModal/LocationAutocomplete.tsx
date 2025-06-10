import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleFormError } from "./VehicleFormError";

interface Props {
  value: string;
  ready: boolean;
  status: string;
  data: google.maps.places.AutocompletePrediction[];
  setValue: (val: string, shouldFetch?: boolean) => void;
  setLocation: (val: string) => void;
  onSelect: (val: string) => void;
  error?: string;
}

export default function LocationAutocomplete({
  value,
  ready,
  status,
  data,
  setValue,
  setLocation,
  onSelect,
  error,
}: Props) {
  return (
    <div className="col-span-2 relative">
      <Label
        htmlFor="location"
        className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]"
      >
        Location
      </Label>
      <Input
        id="location"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Set location"
        className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md"
      />
      {status === "OK" && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                setLocation(description);
                onSelect(description);
              }}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
      <VehicleFormError data={error || ""} />
    </div>
  );
}
