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

export default function VehicleDetails() {
  const { selectedVehicle, setSelectedVehicle, setActiveTab } =
    useVehiclesStore((s) => ({
      selectedVehicle: s.selectedVehicle,
      setSelectedVehicle: s.setSelectedVehicle,
      setActiveTab: s.setActiveTab,
    }));

  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const { data: vehicle } = useGetVehicle(id);

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
    <>
      <div className="p-5 pb-0">
        <div className="flex justify-between">
          <BackIcon onClick={backToVehicles} className="cursor-pointer" />
          <ActionMenu />
        </div>
        <div className="py-5 flex gap-2 w-full">
          <VehicleStatusIcon />
          <div className="flex w-full">
            <div className="text-[14px] ml-3 w-full">
              <p className="text-[#192252] font-bold">{selectedVehicle?.vin}</p>
              <p className="text-[#636777]">
                {" "}
                {selectedVehicle?.model!.name}{" "}
                {selectedVehicle?.model!.make.name} {selectedVehicle?.year}
              </p>
              <p className="text-[#636777]">
                Location:{" "}
                <span className="text-[#192252] font-medium">
                  {selectedVehicle?.city}, {selectedVehicle?.street}
                </span>
              </p>
              <p>Date Created: {dateCreated}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full border-b pb-5">
          <Button className="w-full" onClick={() => setOpen(true)}>
            Assign to Customer
          </Button>
        </div>
      </div>

      <AssignToCustomerDialog open={open} onOpenChange={setOpen} />

      <Map className="w-full h-full" />
    </>
  );
}
