import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehicleFormError } from "./VehicleFormError";
import type { MakeInfo } from "@/api/schemas/makeInfo";
import type { ModelInfo, ModelResponse } from "@/api/schemas";
import { useParams } from "react-router-dom";
import { useGetVehicle } from "@/api/vehicle/vehicle";
import { useEffect } from "react";

interface Props {
  make: MakeInfo | null;
  model: ModelResponse | ModelInfo | null;
  year: string;
  makes: MakeInfo[];
  models: ModelResponse[];
  setMake: (make: MakeInfo | null) => void;
  setModel: (model: ModelResponse | ModelInfo | null) => void;
  setYear: (year: string) => void;
  setVin: (vin: string) => void;
  setStreet: (street: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setCountry: (country: string) => void;
  setZip: (zip: string) => void;
  setLocation: (location: string) => void;
  fetchModels: (id: number) => Promise<ModelResponse[]>;
  errorModel?: string;
  errorMake?: string;
  errorYear?: string;
}

export default function VehicleFormGeneral({
  make,
  model,
  year,
  makes,
  models,
  setVin,
  setStreet,
  setCity,
  setState,
  setCountry,
  setZip,
  setMake,
  setModel,
  setYear,
  setLocation,
  fetchModels,
  errorModel,
  errorMake,
  errorYear,
}: Props) {
  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const { data: vehicle } = useGetVehicle(id);

  useEffect(() => {
    const initialize = async () => {
      if (!vehicle) return;

      if (vehicle.model?.make) {
        setMake(vehicle.model.make);
        const fetchedModels = await fetchModels(vehicle.model.make.id);

        // After models fetched, safely set model
        const foundModel = fetchedModels.find((m) => m.id === vehicle.model_id);
        if (foundModel) {
          setModel(foundModel);
        }
      }

      if (vehicle.year) setYear(vehicle.year);
      if (vehicle.vin) setVin(vehicle.vin);
      if (vehicle.street) setStreet(vehicle.street);
      if (vehicle.city) setCity(vehicle.city);
      if (vehicle.state) setState(vehicle.state);
      if (vehicle.country) setCountry(vehicle.country);
      if (vehicle.zipcode) setZip(vehicle.zipcode);
      if (vehicle.location) setLocation(vehicle.location);
    };

    initialize();
  }, [
    vehicle,
    fetchModels,
    setMake,
    setModel,
    setYear,
    setVin,
    setStreet,
    setCity,
    setState,
    setCountry,
    setZip,
  ]);

  return (
    <>
      <div>
        <Label className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]">
          Make
        </Label>
        <Select
          value={make ? String(make.id) : ""}
          onValueChange={async (val) => {
            const selected = makes.find((m) => m.id === +val);
            if (selected) {
              setMake(selected);
              setModel(null);
              await fetchModels(selected.id);
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
        <VehicleFormError data={errorMake || ""} />
      </div>

      <div>
        <Label className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]">
          Model
        </Label>
        <Select
          value={model ? String(model.id) : ""}
          disabled={!make}
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
        <VehicleFormError data={errorModel || ""} />
      </div>

      <div>
        <Label
          htmlFor="year"
          className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]"
        >
          Year
        </Label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 40 }, (_, i) => {
              const y = String(new Date().getFullYear() - i);
              return (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <VehicleFormError data={errorYear || ""} />
      </div>
    </>
  );
}
