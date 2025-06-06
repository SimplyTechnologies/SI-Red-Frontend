import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useVehicleStore } from "../../store/useVehicleModalStore";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { useCreateVehicle } from "@/api/vehicle/vehicle";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVehicleDialog({ open, onOpenChange }: Props) {
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
    makes,
    models,
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
  } = useVehicleStore();

  const [vinError, setVinError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoadingVin, setIsLoadingVin] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const { toast } = useToast();

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
          setVinError(
            `Make "${decodedData.make}" not found in the available makes.`
          );
          return;
        }

        setMake(matchedMake);
        const fetchedModels = await fetchModels(matchedMake.id);
        const matchedModel = fetchedModels.find(
          (m) => m.name.toLowerCase() === decodedData.model.toLowerCase()
        );

        if (!matchedModel) {
          setVinError(
            `Model "${decodedData.model}" not found in the available models.`
          );
          return;
        }

        setModel(matchedModel);
        setYear(String(decodedData.year));
      } else {
        setVinError(
          "Failed to decode VIN. Please check the VIN and try again."
        );
      }
    } catch (error) {
      setVinError("Failed to decode VIN. Please check the VIN and try again.");
    } finally {
      setIsLoadingVin(false);
    }
  };

  const handleLocationSelect = async (description: string) => {
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
      setLocation(description);
    } catch (err) {
      console.error("Location fetch failed", err);
    }
  };

  const { mutate: createVehicle } = useCreateVehicle({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Vehicle added",
          description: "Vehicle added successfully.",
          variant: "success",
        });

        onOpenChange(false); // Close the modal
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add vehicle. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (
      !make ||
      !model ||
      !year ||
      !vin ||
      !location ||
      !street ||
      !city ||
      !state ||
      !country ||
      !zip
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    const zipCodeRegex = /^\d{4}$/;
    if (!zipCodeRegex.test(zip)) {
      setFormError("Zip code must contain exactly 4 digits.");
      return;
    }

    const locationString =
      coordinates.lat && coordinates.lng
        ? `${coordinates.lat},${coordinates.lng}`
        : "";

    const vehicleData = {
      model_id: model.id,
      year,
      vin,
      location: locationString,
      street,
      city,
      state,
      country,
      zipcode: zip,
    };

    createVehicle({ data: vehicleData });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogDescription>
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] bg-white rounded-[12px] px-[24px] py-[20px] shadow-md">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold text-center text-heading font-dm-sans">
              Add New Vehicle
            </DialogTitle>
          </DialogHeader>

          {formError && (
            <p className="mb-3 text-red-500 text-sm">{formError}</p>
          )}
          {vinError && <p className="mb-3 text-red-500 text-sm">{vinError}</p>}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-2.5"
          >
            <div className="col-span-2 text-[16px] font-[700] text-heading font-dm-sans mb-0.5">
              General
            </div>

            {[
              {
                id: "make",
                label: "Make",
                component: (
                  <Select
                    value={make?.id?.toString() || ""}
                    onValueChange={(val) => {
                      const selected = makes.find((m) => m.id === +val);
                      if (selected) {
                        setMake(selected);
                        setModel(null);
                        fetchModels(selected.id);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((m) => (
                        <SelectItem key={m.id} value={String(m.id)}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ),
              },
              {
                id: "model",
                label: "Model",
                component: (
                  <Select
                    value={model?.id?.toString() || ""}
                    onValueChange={(val) => {
                      const selected = models.find((m) => m.id === +val);
                      if (selected) setModel(selected);
                    }}
                  >
                    <SelectTrigger className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => (
                        <SelectItem key={m.id} value={String(m.id)}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ),
              },
              {
                id: "year",
                label: "Year",
                component: (
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                        (y) => (
                          <SelectItem key={y} value={String(y)}>
                            {y}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                ),
              },
              {
                id: "vin",
                label: "VIN",
                component: (
                  <div>
                    <Input
                      id="vin"
                      value={vin}
                      onChange={handleVinChange}
                      maxLength={17}
                      placeholder="Enter VIN"
                      className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md"
                    />
                    {isLoadingVin && (
                      <p className="text-xs text-gray-500 mt-1">
                        Decoding VIN...
                      </p>
                    )}
                  </div>
                ),
              },
            ].map(({ id, label, component }) => (
              <div key={id}>
                <Label
                  htmlFor={id}
                  className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]"
                >
                  {label}
                </Label>
                {component}
              </div>
            ))}

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
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                  {data.map(({ place_id, description }) => (
                    <li
                      key={place_id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleLocationSelect(description)}
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {[
              { id: "street", value: street, set: setStreet },
              { id: "city", value: city, set: setCity },
              { id: "state", value: state, set: setState },
              { id: "country", value: country, set: setCountry },
            ].map(({ id, value, set }) => (
              <div key={id}>
                <Label
                  htmlFor={id}
                  className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </Label>
                <Input
                  id={id}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={`Enter ${id}`}
                  className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md"
                />
              </div>
            ))}

            <div className="col-span-2">
              <Label
                htmlFor="zip"
                className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]"
              >
                Zip Code
              </Label>
              <Input
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter zip code"
                className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md"
              />
            </div>

            <div className="col-span-2">
              <Button
                type="submit"
                className="w-full h-[48px] bg-[#403C89] text-white rounded-[8px] text-[14px] font-semibold leading-[140%]"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
