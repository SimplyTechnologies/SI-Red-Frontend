import { useVehicleStore } from "@/store/useVehicleModalStore";
import { Button } from "@/components/ui/button";
import { useVehicleFormLogic } from "@/hooks/useVehicleFormLogic";
import VehicleFormGeneral from "./VehicleFormGeneral";
import VehicleFormLocation from "./VehicleFormLocation";
import VinField from "./VinField";
import LocationAutocomplete from "./LocationAutocomplete";

interface Props {
  onSuccess: () => void;
}

export default function VehicleFormBody({ onSuccess }: Props) {
  const {
    make,
    model,
    year,
    vin,
    makes,
    models,
    setMake,
    setModel,
    setYear,
    setVin,
    setLocation,
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
    fetchModels,
  } = useVehicleStore();

  const {
    vinError,
    formError,
    fieldErrors,
    isLoadingVin,
    handleVinChange,
    handleLocationSelect,
    handleSubmit,
    value,
    ready,
    status,
    data,
    setValue,
  } = useVehicleFormLogic(onSuccess);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-2.5"
    >
      <div className="col-span-2 text-[16px] font-[700] text-heading font-dm-sans mb-0.5">
        General
      </div>

      <VehicleFormGeneral
        make={make}
        model={model}
        year={year}
        makes={makes}
        models={models}
        setMake={setMake}
        setModel={setModel}
        setYear={setYear}
        fetchModels={fetchModels}
        errorModel={fieldErrors.model_id}
        errorMake={fieldErrors.make_id}
        errorYear={fieldErrors.year}
      />

      <VinField
        vin={vin}
        isLoading={isLoadingVin}
        error={vinError || fieldErrors.vin}
        onChange={handleVinChange}
        setVin={setVin}
      />

      <LocationAutocomplete
        value={value}
        ready={ready}
        status={status}
        data={data}
        setValue={setValue}
        setLocation={setLocation}
        onSelect={handleLocationSelect}
        error={fieldErrors.location}
      />

      <VehicleFormLocation
        street={street}
        city={city}
        state={state}
        country={country}
        zip={zip}
        setStreet={setStreet}
        setCity={setCity}
        setState={setState}
        setCountry={setCountry}
        setZip={setZip}
        errors={{
          street: fieldErrors.street,
          city: fieldErrors.city,
          state: fieldErrors.state,
          country: fieldErrors.country,
          zipcode: fieldErrors.zipcode,
        }}
      />

      <div className="col-span-2">
        <Button
          type="submit"
          className="w-full h-[48px] bg-[#403C89] text-white rounded-[8px] text-[14px] font-semibold leading-[140%]"
        >
          Submit
        </Button>
      </div>

      {formError && (
        <p className="col-span-2 text-red-500 text-sm text-center mt-2">
          {formError}
        </p>
      )}
    </form>
  );
}
