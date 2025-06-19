import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useVehicleStore } from "@/store/useVehicleModalStore";
import { useCreateVehicleMutation } from "@/hooks/useCreateVehicleMutation";
import { useUpdateVehicleMutation } from "./useUpdateVehicleMutation";
import { useCreateVehicleWithImages } from "./useCreateVehicleWithImages";
import { useUpdateVehicleWithImages } from "./useUpdateVehicleWithImages";
import type { VehicleInput } from "@/api/schemas";

export function useVehicleFormLogic(onSuccess: () => void) {
  const {
    make,
    model,
    year,
    vin,
    location,
    locationDescription,
    setLocationDescription,
    street,
    city,
    state,
    country,
    zip,
    makes,
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
    fetchMakes,
    fetchModels,
    decodeVin,
    images,
    setImages,
    deletedImageIds,
    setDeletedImageIds
  } = useVehicleStore();
  

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [vinError, setVinError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoadingVin, setIsLoadingVin] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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

      const getSubPromise = getComponent("subpremise")
        ? getComponent("subpremise") + "/"
        : "";
      const getStreetNumber = getComponent("street_number") + " ";
      const getPolitical = getComponent("political") + " ";
      setStreet(
        getPolitical + getSubPromise + getStreetNumber + getComponent("route")
      );
      setCity(getComponent("locality"));
      setState(getComponent("administrative_area_level_1"));
      setCountry(getComponent("country"));
      setZip(getComponent("postal_code"));
    } catch (err) {
      console.error("Location fetch failed", err);
    }
  };

  const { mutate: createVehicle } = useCreateVehicleMutation(() => {
    setValue("");
    clearSuggestions();
    setCoordinates({ lat: null, lng: null });
    onSuccess();
  });

  const { mutate: createVehicleWithImages } = useCreateVehicleWithImages(() => {
    setValue("");
    clearSuggestions();
    setCoordinates({ lat: null, lng: null });
    onSuccess();
  });

  const { mutate: updateVehicleMutation } = useUpdateVehicleMutation(() => {
    setValue("");
    clearSuggestions();
    setCoordinates({ lat: null, lng: null });
    onSuccess();
  });

  const { mutate: updateVehicleWithImages } = useUpdateVehicleWithImages(() => {
    setValue("");
    clearSuggestions();
    setCoordinates({ lat: null, lng: null });
    onSuccess();
  });

  function handleErrorResponse(error: any) {
    setLocationDescription("");
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
  }

  async function resolveCoordinates(): Promise<{
    lat: number;
    lng: number;
  } | null> {
    try {
      let address = locationDescription.trim();
      if (!address) {
        address = [street, city, state, country, zip]
          .filter(Boolean)
          .join(", ");
      }

      if (!address) return null;

      const results = await getGeocode({ address });
      return await getLatLng(results[0]);
    } catch (error) {
      console.error("Geocoding failed", error);
      return null;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    let lat = coordinates.lat;
    let lng = coordinates.lng;

    if (!location.trim()) {
      const coords = await resolveCoordinates();
      if (!coords) {
        setFormError(
          "Couldn't auto-locate the address. Please check the data."
        );
        return;
      }
      lat = coords.lat;
      lng = coords.lng;
      setCoordinates(coords);
    }

    const locationString = lat && lng ? `${lat},${lng}` : "";

    const vehicleData = {
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
    };

    if (images.length > 0) {
      createVehicleWithImages(
        { data: vehicleData, images },
        { onError: handleErrorResponse }
      );
    } else {
      createVehicle(
        { data: vehicleData },
        {
          onError: handleErrorResponse,
          onSuccess: () => {
            setLocationDescription("");
            setImages([]);
          },
        }
      );
    }
  };

  const handleUpdate = async (e: React.FormEvent, vehicleId: string) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    let lat = coordinates.lat;
    let lng = coordinates.lng;

    // Try to resolve lat/lng from address if not available
    if (!lat || !lng) {
      const coords = await resolveCoordinates();
      if (!coords) {
        setFormError("Couldn't resolve coordinates from address.");
        return;
      }
      lat = coords.lat;
      lng = coords.lng;
      setCoordinates(coords);
    }

    const locationString = `${lat},${lng}`;

    const vehicleData = {
      make_id: make?.id,
      model_id: model?.id,
      year,
      vin,
      location: locationString,
      street,
      city,
      state,
      country,
      zipcode: zip,
    };

    const hasImages = images.length > 0;
    const hasDeletedImages = deletedImageIds.length > 0;

    // If we have either new or deleted images, use multipart update
    if (hasImages || hasDeletedImages) {
      const formData = new FormData();

      // Append vehicle fields
      Object.entries(vehicleData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Append new image files
      images.forEach((file) => {
        formData.append("images", file);
      });

      // Append deleted image IDs
      deletedImageIds.forEach((id) => {
        formData.append("deletedImageIds", id.toString());
      });

      updateVehicleWithImages(
        { id: vehicleId, data: vehicleData as VehicleInput, images },
        {
          onError: handleErrorResponse,
          onSuccess: () => {
            setLocationDescription("");
            setImages([]);
            setDeletedImageIds([]);
          },
        }
      );
    } else {
      // No image changes — use normal JSON update
      updateVehicleMutation(
        { id: vehicleId, data: vehicleData },
        {
          onError: handleErrorResponse,
          onSuccess: () => {
            setLocationDescription("");
            setImages([]);
            setDeletedImageIds([]);
          },
        }
      );
    }
  };

  return {
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
    imageFiles,
    setImageFiles,
  };
}
