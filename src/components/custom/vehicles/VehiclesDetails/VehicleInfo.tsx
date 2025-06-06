import { useVehiclesStore } from "@/store/useVehiclesStore";
import { getVehicleStatusIcon } from "@/utils/vehicleHelpers";
import { formatDate } from "date-fns";
import VehiclesTabListSkeleton from "../vehiclesTab/VehiclesTabListSkeleton";
import type { VehicleStatusKeys } from "@/constants/constants";

interface Props {
  isLoading: boolean;
}

export default function VehicleInfo({ isLoading }: Props) {
  const selectedVehicle = useVehiclesStore((s) => s.selectedVehicle);

  const VehicleStatusIcon = getVehicleStatusIcon(
    selectedVehicle?.status as VehicleStatusKeys
  );
  const dateCreated = selectedVehicle?.createdAt
    ? formatDate(new Date(selectedVehicle.createdAt), "dd.MM.yyyy")
    : "";

  return (
    <div className="py-5 flex gap-2 w-full">
      <VehicleStatusIcon />

      {isLoading ? (
        <VehiclesTabListSkeleton />
      ) : (
        <div className="flex w-[350px]">
          <div className="text-[14px] ml-3 w-full">
            <p className="text-heading font-bold">{selectedVehicle?.vin}</p>
            <p className="text-text-muted">
              {selectedVehicle?.model?.name} {selectedVehicle?.model?.make.name}{" "}
              {selectedVehicle?.year}
            </p>
            <p className="text-text-muted">
              Location:{" "}
              <span className="text-heading font-medium">
                {selectedVehicle?.city}, {selectedVehicle?.street}
              </span>
            </p>
            <p className="text-text-muted">
              Date Created:{" "}
              <span className="text-heading font-medium">{dateCreated}</span>
            </p>
            {selectedVehicle?.customer && (
              <>
                <p className="text-text-muted">
                  Assigned At:{" "}
                  <span className="text-heading font-medium">
                    {selectedVehicle?.assignedDate}
                  </span>
                </p>
                <p className="text-text-muted">
                  Assigned To:{" "}
                  <span className="text-heading font-medium">
                    {selectedVehicle?.customer?.firstName}{" "}
                    {selectedVehicle?.customer?.lastName}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
