import FormField from "./FormField";
import { VehicleFormError } from "./VehicleFormError";

interface Props {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  setStreet: (val: string) => void;
  setCity: (val: string) => void;
  setState: (val: string) => void;
  setCountry: (val: string) => void;
  setZip: (val: string) => void;
  errors: Partial<
    Record<"street" | "city" | "state" | "country" | "zipcode", string>
  >;
}

export default function VehicleFormLocation({
  street,
  city,
  state,
  country,
  zip,
  setStreet,
  setCity,
  setState,
  setCountry,
  setZip,
  errors,
}: Props) {
  return (
    <>
      {/* Street */}
      <div>
        <FormField
          id="street"
          label="Street"
          placeholder="Enter Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <VehicleFormError data={errors.street || ""} />
      </div>

      {/* City */}
      <div>
        <FormField
          id="city"
          label="City"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <VehicleFormError data={errors.city || ""} />
      </div>

      {/* State */}
      <div>
        <FormField
          id="state"
          label="State"
          placeholder="Enter state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <VehicleFormError data={errors.state || ""} />
      </div>

      {/* Country */}
      <div>
        <FormField
          id="country"
          label="Country"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <VehicleFormError data={errors.country || ""} />
      </div>

      {/* Zip */}
      <div className="col-span-2">
        <FormField
          id="zip"
          label="Zip Code"
          placeholder="Enter Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <VehicleFormError data={errors.zipcode || ""} />
      </div>
    </>
  );
}
