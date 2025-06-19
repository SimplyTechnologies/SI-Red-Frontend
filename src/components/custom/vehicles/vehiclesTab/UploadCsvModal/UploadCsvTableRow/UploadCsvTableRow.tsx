import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import type { ParsedVehicleUpload } from "@/api/schemas";
import { useDebounce } from "use-debounce";
import { useValidateMakeModel, useValidateVin } from "@/api/vehicle/vehicle";
import { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { ConflictFieldWrapper } from "./ConflictFieldWrapper";
import { EditableField } from "./EditableField";
import { MakeModelField } from "./MakeModelField";
import { VinField } from "./VinField";
import { LocationField } from "./LocationField";

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
  const [localMake, setLocalMake] = useState(row.make ?? "");
  const [localModel, setLocalModel] = useState(row.model ?? "");
  const [localVin, setLocalVin] = useState(row.vin);
  const [localYear, setLocalYear] = useState(row.year);
  const [vinChanged, setVinChanged] = useState(false);
  const [localExclude, setLocalExclude] = useState(true);

  const [debouncedMake] = useDebounce(localMake, 500);
  const [debouncedModel] = useDebounce(localModel, 500);
  const [debouncedVin] = useDebounce(localVin, 500);

  const {
    ready,
    value: locationValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 400,
    defaultValue: row.combinedLocation || "",
  });

  const { data: makeModelValidation } = useValidateMakeModel(
    { makeName: debouncedMake ?? "", modelName: debouncedModel ?? "" },
    {
      query: {
        enabled: !!debouncedMake && !!debouncedModel,
      },
    }
  );

  const shouldValidateVin =
    vinChanged &&
    debouncedVin.length === 17 &&
    localMake.trim() !== "" &&
    localModel.trim() !== "" &&
    localYear?.trim() !== "";

  const { data: vinValidation, isFetching: isVinFetching } = useValidateVin(
    {
      vin: debouncedVin,
      make: row.make && row.make === "" ? undefined : row.make,
      model: row.model && row.model === "" ? undefined : row.model,
      year: row.year && row.year === "" ? undefined : row.year,
    },
    {
      query: {
        enabled: shouldValidateVin,
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
        make: row.make || vinValidation.make,
        model: row.model || vinValidation.model,
        year: row.year || vinValidation.year,
      };

      if (!row.make && vinValidation.make) {
        setLocalMake(vinValidation.make);
      }
      if (!row.model && vinValidation.model) {
        setLocalModel(vinValidation.model);
      }
      if (!row.year && vinValidation.year) {
        setLocalYear(vinValidation.year);
      }

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

  useEffect(() => {
    if (row.year !== localYear) {
      onChange(index, { ...row, year: localYear });
    }
  }, [localYear]);

  const isLocationEmpty = locationValue?.trim() === "";
  const isCoordinatesEmpty = row.coordinates?.trim() === "";

  const isMakeEmpty = localMake.trim() === "";
  const isModelEmpty = localModel.trim() === "";
  const isYearInvalid =
    localYear && (localYear.trim() === "" || !/^\d{4}$/.test(localYear.trim()));

  const isValid =
    !isMakeEmpty &&
    row.year !== "" &&
    !isModelEmpty &&
    !isYearInvalid &&
    !makeModelValidation?.makeMsg &&
    !makeModelValidation?.modelMsg &&
    !vinValidation?.error &&
    !row.vinExists &&
    !isLocationEmpty &&
    !isCoordinatesEmpty;

  const renderField = (field: FieldKey) => {
    const mismatch = row.mismatch as Partial<
      Record<FieldWithMismatch, { original: string; actual: string }>
    >;

    if (mismatch?.[field as FieldWithMismatch]) {
      const { original, actual } = mismatch[field as FieldWithMismatch]!;
      return (
        <ConflictFieldWrapper
          original={original}
          actual={actual}
          selected={row[field]}
          onSelect={(val: string | undefined) =>
            onChange(index, { ...row, [field]: val })
          }
        />
      );
    }

    if (field === "make") {
      return (
        <MakeModelField
          value={localMake}
          onChange={setLocalMake}
          error={
            isMakeEmpty ? "Make is required" : makeModelValidation?.makeMsg
          }
          disabled={row.vinExists}
        />
      );
    }

    if (field === "model") {
      return (
        <MakeModelField
          value={localModel}
          onChange={setLocalModel}
          error={
            isModelEmpty ? "Model is required" : makeModelValidation?.modelMsg
          }
          disabled={row.vinExists}
        />
      );
    }

    if (field === "vin") {
      return (
        <VinField
          value={localVin}
          onChange={(val) => {
            setLocalVin(val);
            setVinChanged(true);
          }}
          error={vinValidation?.error}
          isFetching={isVinFetching}
          exists={row.vinExists ?? false}
        />
      );
    }

    if (field === "combinedLocation") {
      return (
        <LocationField
          value={locationValue}
          ready={ready}
          status={status}
          data={data}
          setValue={setValue}
          clearSuggestions={clearSuggestions}
          index={index}
          onChange={onChange}
          row={row}
          error={isLocationEmpty ? "Location is required" : undefined}
        />
      );
    }

    if (field === "coordinates") {
      return (
        <EditableField
          value={row.coordinates}
          onChange={(val) => onChange(index, { ...row, coordinates: val })}
          error={isCoordinatesEmpty ? "Coordinates are required" : undefined}
        />
      );
    }

    if (field === "year") {
      return (
        <EditableField
          value={localYear}
          onChange={(val) => {
            setLocalYear(val);
            onChange(index, { ...row, year: val });
          }}
          error={
            localYear?.trim() === ""
              ? "Year is required"
              : !/^\d{4}$/.test(localYear ? localYear : "")
              ? "Year must be a 4-digit number"
              : undefined
          }
          disabled={row.vinExists}
        />
      );
    }

    return (
      <EditableField
        value={row[field]}
        onChange={(val) => onChange(index, { ...row, [field]: val })}
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
          checked={isValid && localExclude}
          disabled={
            !isValid &&
            (!row.mismatch || Object.keys(row.mismatch).length === 0) &&
            localExclude
          }
          onCheckedChange={(checked) => {
            setLocalExclude(checked);
          }}
          className="bg-[#403C89]"
        />
      </TableCell>
    </TableRow>
  );
}
