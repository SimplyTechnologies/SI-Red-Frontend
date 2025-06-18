import FormField from "./FormField";
import { VehicleFormError } from "./VehicleFormError";
import { validateField } from "@/utils/validations/validateField";

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
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
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
  setFieldErrors,
  errors,
}: Props) {
  return (
    <>
      <div>
        <FormField
          id="street"
          label="Street"
          placeholder="Enter Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          onBlur={() => validateField("street", street, setFieldErrors)}
          setFieldErrors={setFieldErrors}
        />
        <VehicleFormError data={errors.street || ""} />
      </div>

      <div>
        <FormField
          id="city"
          label="City"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={() => validateField("city", city, setFieldErrors)}
          setFieldErrors={setFieldErrors}
        />
        <VehicleFormError data={errors.city || ""} />
      </div>

      <div>
        <FormField
          id="state"
          label="State"
          placeholder="Enter state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={() => validateField("state", state, setFieldErrors)}
          setFieldErrors={setFieldErrors}
        />
        <VehicleFormError data={errors.state || ""} />
      </div>

      <div>
        <FormField
          id="country"
          label="Country"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={() => validateField("country", country, setFieldErrors)}
          setFieldErrors={setFieldErrors}
        />
        <VehicleFormError data={errors.country || ""} />
      </div>

      <div className="col-span-2">
        <FormField
          id="zipcode"
          label="Zip Code"
          placeholder="Enter Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          onBlur={() => validateField("zipcode", zip, setFieldErrors)}
          setFieldErrors={setFieldErrors}
        />
        <VehicleFormError data={errors.zipcode || ""} />
      </div>
    </>
  );
}
