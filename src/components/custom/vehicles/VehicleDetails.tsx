import { Button } from "@/components/ui/button";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { getVehicleStatusIcon } from "@/utils/vehicleHelpers";
import BackIcon from "@/assets/icons/back.svg?react";
import { formatDate } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import ActionMenu from "@/components/layout/ActionMenu/ActionMenu";
import { useEffect, useState } from "react";
import AssignToCustomerDialog from "@/components/assignToCustomer/AssignToCustomerDialog";
import Map from "@/components/map/Map";
import { useGetVehicle } from "@/api/vehicle/vehicle";
import { VEHICLES_TABS } from "@/constants/constants";
import VehiclesTabListSkeleton from "./vehiclesTab/VehiclesTabListSkeleton";

export default function VehicleDetails() {
  const { selectedVehicle, setSelectedVehicle, setActiveTab } =
    useVehiclesStore((s) => ({
      selectedVehicle: s.selectedVehicle,
      setSelectedVehicle: s.setSelectedVehicle,
      setActiveTab: s.setActiveTab,
    }));

  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const { data: vehicle, isLoading } = useGetVehicle(id);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const VehicleStatusIcon = getVehicleStatusIcon(selectedVehicle?.status ?? "");
  const dateCreated = selectedVehicle?.createdAt
    ? formatDate(new Date(selectedVehicle.createdAt), "dd.MM.yyyy")
    : "";

  useEffect(() => {
    setSelectedVehicle(vehicle || null);
  }, [vehicle]);

  const backToVehicles = () => {
    navigate("/vehicles");
    setSelectedVehicle(null);
    setActiveTab(VEHICLES_TABS.VEHICLES);
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-full">
      <div>
        <div className="p-5 pb-0">
          <div className="flex justify-between">
            <BackIcon onClick={backToVehicles} className="cursor-pointer" />
            <ActionMenu />
          </div>
          <div className="py-5 flex gap-2 w-full">
            <VehicleStatusIcon />
    
            {isLoading ? <VehiclesTabListSkeleton /> :

            <div className="flex w-[350px]">
              <div className="text-[14px] ml-3 w-full">
                <p className="text-heading font-bold">{selectedVehicle?.vin}</p>
                <p className="text-text-muted">
                  {" "}
                  {selectedVehicle?.model!.name}{" "}
                  {selectedVehicle?.model!.make.name} {selectedVehicle?.year}
                </p>
                <p className="text-text-muted">
                  Location:{" "}
                  <span className="text-heading font-medium">
                    {selectedVehicle?.city}, {selectedVehicle?.street}
                  </span>
                </p>
                <p>Date Created: {dateCreated}</p>
              </div>
            </div>
            }
          </div>
          <div className="mt-2 w-full border-b pb-5">
            <Button className="w-full" onClick={() => setOpen(true)}>
              Assign to Customer
            </Button>
            <AssignToCustomerDialog open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>

      <Map className="w-full h-full" />
    </div>
  );
}
