import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleFormError } from "./VehicleFormError";
import { clearFieldError, validateField } from "@/utils/validateField";

interface Props {
  vin: string;
  isLoading: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setVin: (v: string) => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function VinField({
  vin,
  isLoading,
  error,
  onChange,
  setFieldErrors,
}: Props) {
  return (
    <div className="col-span-1">
      <Label
        htmlFor="vin"
        className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]"
      >
        VIN
      </Label>
      <Input
        id="vin"
        value={vin}
        onChange={onChange}
        onFocus={() => clearFieldError("vin", setFieldErrors)}
        onBlur={() => validateField("vin", vin, setFieldErrors)}
        placeholder="Enter VIN"
        disabled={isLoading}
        className={`w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md`}
        autoFocus
      />
      <VehicleFormError data={error || ""} />
    </div>
  );
}
