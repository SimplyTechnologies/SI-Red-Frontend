import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import type { ParsedVehicleUpload } from "@/api/schemas";
import { useDebounce } from "use-debounce";
import { useValidateMakeModel, useValidateVin } from "@/api/vehicle/vehicle";
import { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { EditableField } from "./EditableField";
import { MakeModelField } from "./MakeModelField";
import { VinField } from "./VinField";
import { LocationField } from "./LocationField";

interface Props {
  row: ParsedVehicleUpload;
  index: number;
  onChange: (
    index: number,
    updated: ParsedVehicleUpload,
    include?: boolean
  ) => void;
}

export function UploadCsvTableRow({ row, index, onChange }: Props) {
  const [localMake, setLocalMake] = useState(row.make ?? "");
  const [localModel, setLocalModel] = useState(row.model ?? "");
  const [localVin, setLocalVin] = useState(row.vin);
  const [localYear, setLocalYear] = useState(row.year);
  const [vinChanged, setVinChanged] = useState(false);
  const [MakeChanged, setMakeChanged] = useState(false);
  const [ModelChanged, setModelChanged] = useState(false);
  const [YearChanged, setYearChanged] = useState(false);
  const [localExclude, setLocalExclude] = useState(true);
  const [shouldValidateVin, setShouldValidateVin] = useState(false);

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

  useEffect(() => {
    setShouldValidateVin(
      localVin.length === 17 &&
        localMake === "" &&
        localModel === "" &&
        localYear === ""
    );
  }, [localMake, localModel, localYear]);

  useEffect(() => {
    setShouldValidateVin(localVin.length === 17);
  }, [localVin]);

  const { data: vinValidation, isFetching: isVinFetching } = useValidateVin(
    {
      vin: debouncedVin,
      make: row.make || "",
      model: row.model || "",
      year: row.year || "",
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
        error: vinValidation.error,
        vinExists: vinValidation.vinExists,
        make: row.make || vinValidation.make,
        model: row.model || vinValidation.model,
        year: row.year || vinValidation.year,
      };

      if (!row.make && vinValidation.make) setLocalMake(vinValidation.make);
      if (!row.model && vinValidation.model) setLocalModel(vinValidation.model);
      if (!row.year && vinValidation.year) setLocalYear(vinValidation.year);

      onChange(index, updatedRow);
    }
  }, [vinValidation]);

  useEffect(() => {
    if (row.vin !== localVin) onChange(index, { ...row, vin: localVin });
  }, [localVin]);

  useEffect(() => {
    if (row.make !== localMake) onChange(index, { ...row, make: localMake });
  }, [localMake]);

  useEffect(() => {
    if (row.model !== localModel)
      onChange(index, { ...row, model: localModel });
  }, [localModel]);

  useEffect(() => {
    if (row.year !== localYear) onChange(index, { ...row, year: localYear });
  }, [localYear]);

  useEffect(() => {
    if (
      (locationValue?.trim() || "") !== (row.combinedLocation?.trim() || "")
    ) {
      onChange(index, { ...row, combinedLocation: locationValue });
    }
  }, [locationValue]);

  useEffect(() => {
    if (row.combinedLocation && row.combinedLocation !== locationValue) {
      setValue(row.combinedLocation, false);
    }
  }, [row.combinedLocation]);

  const isLocationEmpty = locationValue?.trim() === "";
  const isCoordinatesEmpty = row.coordinates?.trim() === "";
  const isMakeEmpty = localMake.trim() === "";
  const isModelEmpty = localModel.trim() === "";
  const isYearInvalid =
    localYear && (localYear.trim() === "" || !/^\d{4}$/.test(localYear.trim()));

  const vinErrorText =
    (localVin.length >= 0 && localVin.length < 17) || localVin.length > 17
      ? "VIN must be exactly 17 characters long"
      : row.vinExists
      ? "VIN already exists"
      : vinValidation?.error || "";

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
    !isCoordinatesEmpty &&
    vinErrorText === "";

  useEffect(() => {
    onChange(index, row, isValid && localExclude);
  }, [isValid, localExclude]);

  return (
    <TableRow>
      <TableCell>
        <MakeModelField
          value={localMake}
          onChange={(val) => {
            setLocalMake(val);
            setMakeChanged(true);
          }}
          error={
            isMakeEmpty ? "Make is required" : makeModelValidation?.makeMsg
          }
          disabled={row.vinExists}
          placeholder="Make"
        />
      </TableCell>
      <TableCell>
        <MakeModelField
          value={localModel}
          onChange={(val) => {
            setLocalModel(val);
            setModelChanged(true);
          }}
          error={
            isModelEmpty ? "Model is required" : makeModelValidation?.modelMsg
          }
          disabled={row.vinExists}
          placeholder="Model"
        />
      </TableCell>
      <TableCell>
        <VinField
          value={localVin}
          onChange={(val) => {
            setLocalVin(val);
            setVinChanged(true);
          }}
          error={vinErrorText}
          isFetching={isVinFetching}
          placeholder="VIN"
        />
      </TableCell>
      <TableCell>
        <EditableField
          value={localYear}
          onChange={(val) => {
            setLocalYear(val);
            onChange(index, { ...row, year: val });
            setYearChanged(true);
          }}
          error={
            localYear?.trim() === ""
              ? "Year is required"
              : !/^\d{4}$/.test(localYear ? localYear : "")
              ? "Year must be a 4-digit number"
              : undefined
          }
          disabled={row.vinExists}
          placeholder="Year"
        />
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <EditableField
          value={row.coordinates}
          onChange={(val) => onChange(index, { ...row, coordinates: val })}
          error={isCoordinatesEmpty ? "Coordinates are required" : undefined}
          placeholder="Coordinates"
        />
      </TableCell>
      <TableCell className="text-center">
        <Switch
          checked={isValid && localExclude}
          disabled={!isValid && localExclude}
          onCheckedChange={(checked) => {
            setLocalExclude(checked);
            onChange(index, row, checked);
          }}
        />
      </TableCell>
    </TableRow>
  );
}
