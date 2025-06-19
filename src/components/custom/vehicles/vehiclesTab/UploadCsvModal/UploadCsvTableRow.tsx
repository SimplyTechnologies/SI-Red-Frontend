import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ConflictField } from "./ConflictField";
import { Switch } from "@/components/ui/switch";
import type { ParsedVehicleUpload } from "@/api/schemas";
import { useDebounce } from "use-debounce";
import { useValidateMakeModel, useValidateVin } from "@/api/vehicle/vehicle";
import { useEffect, useState } from "react";

interface Props {
  row: ParsedVehicleUpload;
  index: number;
  onChange: (index: number, updated: ParsedVehicleUpload) => void;
}

type FieldKey =
  | "make"
  | "model"
  | "vin"
  | "year"
  | "combinedLocation"
  | "coordinates";
type FieldWithMismatch = "model" | "year";

const fieldOrder = [
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "vin", label: "VIN" },
  { key: "year", label: "Year" },
  { key: "combinedLocation", label: "Location" },
  { key: "coordinates", label: "Coordinates" },
] as const;

export function UploadCsvTableRow({ row, index, onChange }: Props) {
  const [localMake, setLocalMake] = useState(row.make);
  const [localModel, setLocalModel] = useState(row.model);
  const [localVin, setLocalVin] = useState(row.vin);

  const [debouncedMake] = useDebounce(localMake, 500);
  const [debouncedModel] = useDebounce(localModel, 500);
  const [debouncedVin] = useDebounce(localVin, 500);

  const { data: makeModelValidation } = useValidateMakeModel(
    { makeName: debouncedMake ?? "", modelName: debouncedModel ?? "" },
    {
      query: {
        enabled: !!debouncedMake && !!debouncedModel,
      },
    }
  );

  const { data: vinValidation, isFetching: isVinFetching } = useValidateVin(
    {
      vin: debouncedVin,
      make: localMake,
      model: localModel,
      year: row.year,
    },
    {
      query: {
        enabled: debouncedVin.length === 17,
      },
    }
  );

  useEffect(() => {
    if (vinValidation) {
      const updatedRow: ParsedVehicleUpload = {
        ...row,
        mismatch: vinValidation.mismatch,
        error: vinValidation.error,
        vinExists: vinValidation.vinExists,
      };

      onChange(index, updatedRow);
    }
  }, [vinValidation]);

  useEffect(() => {
    if (row.vin !== localVin) {
      onChange(index, { ...row, vin: localVin });
    }
  }, [localVin]);

  useEffect(() => {
    if (row.make !== localMake) {
      onChange(index, { ...row, make: localMake });
    }
  }, [localMake]);

  useEffect(() => {
    if (row.model !== localModel) {
      onChange(index, { ...row, model: localModel });
    }
  }, [localModel]);

  const isMismatchValid =
    !row.mismatch || Object.keys(row.mismatch).length === 0;
  const isVinValid = !vinValidation?.error && !vinValidation?.vinExists;
  const isValid =
    isMismatchValid &&
    !makeModelValidation?.makeMsg &&
    !makeModelValidation?.modelMsg &&
    isVinValid;

  const renderField = (field: FieldKey) => {
    const mismatch = row.mismatch as Partial<
      Record<FieldWithMismatch, { original: string; actual: string }>
    >;

    if (mismatch?.[field as FieldWithMismatch]) {
      const { original, actual } = mismatch[field as FieldWithMismatch]!;
      return (
        <ConflictField
          original={original}
          actual={actual}
          selected={row[field]}
          onSelect={(val) => onChange(index, { ...row, [field]: val })}
        />
      );
    }

    if (field === "make") {
      return (
        <div>
          <Input
            value={localMake}
            onChange={(e) => setLocalMake(e.target.value)}
            className={makeModelValidation?.makeMsg ? "border-red-500" : ""}
          />
          {makeModelValidation?.makeMsg && (
            <p className="text-xs text-red-500 mt-1">
              {makeModelValidation.makeMsg}
            </p>
          )}
        </div>
      );
    }

    if (field === "model") {
      return (
        <div>
          <Input
            value={localModel}
            onChange={(e) => setLocalModel(e.target.value)}
            className={makeModelValidation?.modelMsg ? "border-red-500" : ""}
          />
          {makeModelValidation?.modelMsg && (
            <p className="text-xs text-red-500 mt-1">
              {makeModelValidation.modelMsg}
            </p>
          )}
        </div>
      );
    }

    if (field === "vin") {
      return (
        <div>
          <Input
            value={localVin}
            onChange={(e) => setLocalVin(e.target.value)}
            className={
              debouncedVin.length > 0 && debouncedVin.length < 17
                ? "border-red-500"
                : vinValidation?.error
                ? "border-red-500"
                : ""
            }
            disabled={isVinFetching}
          />
          {debouncedVin.length >= 0 && debouncedVin.length < 17 && (
            <p className="text-xs text-red-500 mt-1">
              VIN must be exactly 17 characters long
            </p>
          )}
          {row.vinExists && (
            <p className="text-xs text-red-500 mt-1">VIN already exist</p>
          )}
          {!debouncedVin || debouncedVin.length < 17
            ? null
            : vinValidation?.error && (
                <p className="text-xs text-red-500 mt-1">
                  {vinValidation.error}
                </p>
              )}
        </div>
      );
    }

    return (
      <Input
        value={row[field]}
        onChange={(e) => onChange(index, { ...row, [field]: e.target.value })}
      />
    );
  };

  return (
    <TableRow>
      {fieldOrder.map(({ key }) => (
        <TableCell key={key}>{renderField(key)}</TableCell>
      ))}
      <TableCell className="text-center">
        <Switch
          checked={isValid}
          onCheckedChange={(checked) =>
            onChange(index, { ...row, exclude: !checked })
          }
          disabled={!isValid}
          className="bg-[#403C89]"
        />
      </TableCell>
    </TableRow>
  );
}
