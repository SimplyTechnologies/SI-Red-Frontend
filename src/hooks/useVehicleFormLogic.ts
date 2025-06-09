import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useVehicleStore } from "@/store/useVehicleModalStore";
import { useCreateVehicleMutation } from "@/hooks/useCreateVehicleMutation";

export function useVehicleFormLogic(onSuccess: () => void) {
  const {
    make,
    model,
    year,
    vin,
    location,
    street,
    city,
    state,
    country,
    zip,
    setMake,
    setModel,
    setYear,
    setVin,
    setLocation,
    setStreet,
    setCity,
    setState,
    setCountry,
    setZip,
    makes,
    fetchMakes,
    fetchModels,
    decodeVin,
  } = useVehicleStore();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [vinError, setVinError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoadingVin, setIsLoadingVin] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  const handleVinChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trim();
    setVin(value);
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!vinRegex.test(value)) {
      setVinError("VIN must be 17 valid alphanumeric characters.");
      return;
    }

    setVinError("");
    setIsLoadingVin(true);
    try {
      const decodedData = await decodeVin(value);
      if (decodedData?.make && decodedData?.model && decodedData?.year) {
        const matchedMake = makes.find(
          (m) => m.name.toLowerCase() === decodedData.make.toLowerCase()
        );
        if (!matchedMake) {
          setVinError(`Make "${decodedData.make}" not found.`);
          return;
        }
        setMake(matchedMake);
        const fetchedModels = await fetchModels(matchedMake.id);
        const matchedModel = fetchedModels.find(
          (m) => m.name.toLowerCase() === decodedData.model.toLowerCase()
        );
        if (!matchedModel) {
          setVinError(`Model "${decodedData.model}" not found.`);
          return;
        }
        setModel(matchedModel);
        setYear(String(decodedData.year));
      } else {
        setVinError("Failed to decode VIN.");
      }
    } catch {
      setVinError("Failed to decode VIN.");
    } finally {
      setIsLoadingVin(false);
    }
  };

  const handleLocationSelect = async (description: string) => {
    setLocation(description);
    setValue(description, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      setCoordinates({ lat, lng });

      const getComponent = (type: string) =>
        results[0].address_components.find((c) => c.types.includes(type))
          ?.long_name || "";

      setStreet(getComponent("route"));
      setCity(getComponent("locality"));
      setState(getComponent("administrative_area_level_1"));
      setCountry(getComponent("country"));
      setZip(getComponent("postal_code"));
    } catch (err) {
      console.error("Location fetch failed", err);
    }
  };
  const { resetVehicleForm } = useVehicleStore();

  const { mutate: createVehicle } = useCreateVehicleMutation(() => {
    setValue("");
    clearSuggestions();
    setCoordinates({ lat: null, lng: null });
    resetVehicleForm();
    onSuccess();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    const locationString =
      coordinates.lat && coordinates.lng
        ? `${coordinates.lat},${coordinates.lng}`
        : "";

    createVehicle(
      {
        data: {
          make_id: make?.id,
          model_id: model!?.id,
          year,
          vin,
          location: locationString,
          street,
          city,
          state,
          country,
          zipcode: zip,
        },
      },
      {
        onError: (error: any) => {
          const backendErrors = error?.data?.errors;

          if (Array.isArray(backendErrors)) {
            const parsed: Record<string, string> = {};

            for (const err of backendErrors) {
              const field = err.path || err.param;
              if (field && !parsed[field]) {
                parsed[field] = err.msg;
              }
            }

            setFieldErrors(parsed);
          } else {
            setFormError(error?.message || "Something went wrong.");
          }
        },
      }
    );
  };

  return {
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
  };
}
