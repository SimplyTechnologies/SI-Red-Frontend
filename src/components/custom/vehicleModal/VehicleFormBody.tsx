import { useVehicleStore } from "@/store/useVehicleModalStore";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { Button } from "@/components/ui/button";
import { useVehicleFormLogic } from "@/hooks/useVehicleFormLogic";
import VehicleFormGeneral from "./VehicleFormGeneral";
import VehicleFormLocation from "./VehicleFormLocation";
import VinField from "./VinField";
import LocationAutocomplete from "./LocationAutocomplete";
import { VEHICLE_DIALOG_TITLE } from "@/constants/constants";
import { useParams } from "react-router-dom";
import VehicleImageUploader from "../vehicles/VehicleImageUploader";
import { useReverseGeocode } from "@/hooks/useReverseGeocode";

interface Props {
  onSuccess: () => void;
  title: string;
}

export default function VehicleFormBody({ onSuccess, title }: Props) {
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
    setLocationDescription,
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
    prefillLatLng,
  } = useVehicleStore();

  const { selectedVehicle } = useVehiclesStore();

  const {
    vinError,
    formError,
    fieldErrors,
    isLoadingVin,
    handleVinChange,
    handleLocationSelect,
    handleSubmit,
    handleUpdate,
    value,
    ready,
    status,
    data,
    setValue,
    setFieldErrors,
    isFormValid,
  } = useVehicleFormLogic(onSuccess);
  const { id } = useParams();

  const { isLoading: isReverseGeocoding } = useReverseGeocode(
    prefillLatLng,
    (data) => {
      setStreet(data.components.street);
      setCity(data.components.city);
      setState(data.components.state);
      setCountry(data.components.country);
      setZip(data.components.zip);
      setLocation(data.address);
      setLocationDescription(data.address);
      setValue(data.address);
    }
  );

  return (
    <form
      onSubmit={
        title === VEHICLE_DIALOG_TITLE.EDIT && id
          ? (e) => handleUpdate(e, id)
          : handleSubmit
      }
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
        setVin={setVin}
        setStreet={setStreet}
        setCity={setCity}
        setState={setState}
        setCountry={setCountry}
        setZip={setZip}
        setLocation={setLocation}
        fetchModels={fetchModels}
        errorModel={fieldErrors.model_id}
        errorMake={fieldErrors.make_id}
        errorYear={fieldErrors.year}
        setFieldErrors={setFieldErrors}
      />

      <VinField
        vin={vin}
        isLoading={isLoadingVin}
        error={vinError || fieldErrors.vin}
        onChange={handleVinChange}
        setVin={setVin}
        setFieldErrors={setFieldErrors}
      />

      <LocationAutocomplete
        isReverseGeocoding={isReverseGeocoding}
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
        setFieldErrors={setFieldErrors}
        errors={{
          street: fieldErrors.street,
          city: fieldErrors.city,
          state: fieldErrors.state,
          country: fieldErrors.country,
          zipcode: fieldErrors.zipcode,
        }}
      />

      <VehicleImageUploader existingImages={selectedVehicle?.images} />

      <div className="col-span-2">
        <Button
          type="submit"
          disabled={!isFormValid()}
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
