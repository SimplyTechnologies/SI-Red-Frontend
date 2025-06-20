import { useVehiclesStore } from "@/store/useVehiclesStore";
import { getVehicleStatusIcon } from "@/utils/vehicleHelpers";
import { formatDate } from "date-fns";
import type { VehicleStatusKeys } from "@/constants/constants";
import VehicleInfoSkeleton from "./VehicleInfoSkeleton";
import VehicleImageIcon from "../VehicleImageIcon";

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

  const AssignedAt = selectedVehicle?.assignedDate
    ? formatDate(new Date(selectedVehicle.assignedDate), "dd.MM.yyyy")
    : "";

  return (
    <div
      className={`${
        selectedVehicle?.images?.length === 0 ? "py-5" : "pt-5"
      } flex gap-2 w-full`}
    >
      {isLoading || !selectedVehicle?.model ? (
        <VehicleInfoSkeleton />
      ) : (
        <>
          {selectedVehicle?.images!?.length > 0 ? (
            <VehicleImageIcon
              imageIcon={selectedVehicle.images![0]}
              status={selectedVehicle.status}
            />
          ) : (
            <VehicleStatusIcon />
          )}
          <div className="flex w-[350px]">
            <div className="text-[14px] ml-3 w-full">
              <p className="text-heading font-bold">{selectedVehicle?.vin}</p>
              <p className="text-text-muted">
                {selectedVehicle?.model?.name}{" "}
                {selectedVehicle?.model?.make.name} {selectedVehicle?.year}
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
                    Assigned at:{" "}
                    <span className="text-heading font-medium">
                      {AssignedAt}
                    </span>
                  </p>
                  <p className="text-text-muted">
                    Assigned to:{" "}
                    <span className="text-heading font-medium">
                      {selectedVehicle?.customer?.firstName}{" "}
                      {selectedVehicle?.customer?.lastName}
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
