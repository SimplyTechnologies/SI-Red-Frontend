import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { VehicleFormError } from "./VehicleFormError";
import type { MakeInfo } from "@/api/schemas/makeInfo";
import type { ModelResponse } from "@/api/schemas";

interface Props {
  make: MakeInfo | null;
  model: ModelResponse | null;
  year: string;
  makes: MakeInfo[];
  models: ModelResponse[];
  setMake: (make: MakeInfo | null) => void;
  setModel: (model: ModelResponse | null) => void;
  setYear: (year: string) => void;
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
  setMake,
  setModel,
  setYear,
  fetchModels,
  errorModel,
  errorMake,
  errorYear,
}: Props) {
  return (
    <>
      <div>
        <Label className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]">
          Make
        </Label>
        <Select
          value={make?.id.toString() || ""}
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
          value={model?.id.toString() || ""}
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
            {Array.from({ length: 26 }, (_, i) => {
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
