import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { UploadCsvTableRow } from "./UploadCsvTableRow";
import { Button } from "@/components/ui/button";

const DEFAULT_LOCATION = "48 Leo Street, Yerevan, Yerevan, Armenia";
const DEFAULT_COORDINATES = "40.1801922,44.5029779";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadCsvModal({ open, onOpenChange }: Props) {
  const [rows, setRows] = useState<ParsedVehicleUpload[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await uploadCsvWithFormData(file);
      setRows(result);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: (err as Error).message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRowChange = (index: number, updated: ParsedVehicleUpload) => {
    setRows((prev) =>
      prev ? prev.map((row, i) => (i === index ? updated : row)) : null
    );
  };

  const setDefaultLocationForEmpty = () => {
    setRows(
      (prev) =>
        prev?.map((row) => {
          const isLocationEmpty = !row.combinedLocation?.trim();
          const isCoordinatesEmpty = !row.coordinates?.trim();

          if (!isLocationEmpty && !isCoordinatesEmpty) return row;

          return {
            ...row,
            combinedLocation: isLocationEmpty
              ? DEFAULT_LOCATION
              : row.combinedLocation,
            coordinates: isCoordinatesEmpty
              ? DEFAULT_COORDINATES
              : row.coordinates,
          };
        }) ?? null
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Vehicles CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-upload">Select CSV File</Label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleUpload}
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
            )}
          </div>

          {rows && (
            <>
              <Button
                variant="outline"
                onClick={setDefaultLocationForEmpty}
                className="mb-2"
              >
                Set empty locations to default
              </Button>
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
