import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { uploadCsvWithFormData } from "@/utils/uploadCsvWithFormData";
import type { ParsedVehicleUpload } from "@/api/schemas";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadCsvTableRow } from "./UploadCsvTableRow/UploadCsvTableRow";
import { Button } from "@/components/ui/button";
import { useBulkCreateVehicles } from "@/api/vehicle/vehicle";

const DEFAULT_LOCATION = "48 Leo Street, Yerevan, Yerevan, Armenia";
const DEFAULT_COORDINATES = "40.1801922,44.5029779";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null;
  isUploadingCsv: boolean;
  setIsUploadingCsv: (val: boolean) => void;
}
export default function UploadCsvModal({
  open,
  onOpenChange,
  file,
  setIsUploadingCsv,
  isUploadingCsv,
}: Props) {
  const [rows, setRows] = useState<ParsedVehicleUpload[] | null>(null);
  const setIsUploading = setIsUploadingCsv;

  const { toast } = useToast();
  const [includeMap, setIncludeMap] = useState<Record<number, boolean>>({});

  const handleRowChange = (
    index: number,
    updated: ParsedVehicleUpload,
    include?: boolean
  ) => {
    setRows((prev) =>
      prev ? prev.map((row, i) => (i === index ? updated : row)) : null
    );
    if (include !== undefined) {
      setIncludeMap((prev) => ({ ...prev, [index]: include }));
    }
  };

  useEffect(() => {
    const upload = async () => {
      if (!file) return;
      setIsUploading(true);
      try {
        const result = await uploadCsvWithFormData(file);
        setRows(result);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Incorrect file format",
        });
        onOpenChange(false);
      } finally {
        setIsUploading(false);
      }
    };

    upload();
  }, [file]);

  const setDefaultLocationForEmpty = () => {
    setRows(
      (prev) =>
        prev?.map((row) => {
          const isLocationEmpty = !row.combinedLocation?.trim();
          const isCoordinatesEmpty = !row.coordinates?.trim();

          const updatedRow = {
            ...row,
            combinedLocation: isLocationEmpty
              ? DEFAULT_LOCATION
              : row.combinedLocation,
            coordinates: isCoordinatesEmpty
              ? DEFAULT_COORDINATES
              : row.coordinates,
          };

          return updatedRow;
        }) ?? null
    );
  };

  const { mutate: bulkCreate, isPending } = useBulkCreateVehicles({
    mutation: {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Vehicles imported successfully",
          description: "All selected vehicles were added.",
        });
        onOpenChange(false);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Import failed",
          description: (error as Error).message || "Unknown error",
        });
      },
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setRows(null);
          setIncludeMap({});
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="max-w-5xl sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Vehicles CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isUploadingCsv && (
            <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
          )}

          {rows && (
            <>
              <div className="flex justify-end gap-2 mb-2">
                <Button
                  variant="link"
                  onClick={setDefaultLocationForEmpty}
                  className="text-[#534f95] hover:no-underline"
                >
                  Use Default for Empty Locations
                </Button>
              </div>

              <ScrollArea className="max-h-[400px] overflow-y-auto border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Make</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>VIN</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Coordinates</TableHead>
                      <TableHead className="text-center">Include</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row, i) => (
                      <UploadCsvTableRow
                        key={i}
                        row={row}
                        index={i}
                        onChange={handleRowChange}
                      />
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              <div className="flex justify-end gap-2 mb-2">
                <Button
                  onClick={() => {
                    if (!rows) return;

                    const included = rows.filter(
                      (_, index) => includeMap[index] === true
                    );

                    const vehicles = included.map((r) => ({
                      make: r.make!,
                      model: r.model!,
                      vin: r.vin,
                      year: r.year!,
                      combinedLocation: r.combinedLocation!,
                      coordinates: r.coordinates!,
                    }));

                    bulkCreate({ data: { vehicles } });
                  }}
                  disabled={
                    isPending || !Object.values(includeMap).some(Boolean)
                  }
                >
                  {isPending ? "Importing..." : "Submit Vehicles"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
