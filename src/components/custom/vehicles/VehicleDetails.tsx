import { Button } from "@/components/ui/button";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { getVehicleStatusIcon } from "@/utils/vehicleHelpers";
import BackIcon from "@/assets/icons/back.svg?react";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router-dom";
import ActionMenu from "@/components/layout/ActionMenu/ActionMenu";
import { useState } from "react";
import AssignToCustomerDialog from "@/components/assignToCustomer/AssignToCustomerDialog";
import { VEHICLES_TABS } from "@/constants/constants";

export default function VehicleDetails() {
  const { selectedVehicle, setSelectedVehicle, setActiveTab } =
    useVehiclesStore((s) => ({
      selectedVehicle: s.selectedVehicle,
      setSelectedVehicle: s.setSelectedVehicle,
      setActiveTab: s.setActiveTab,
    }));

  const [open, setOpen] = useState(false);

  const VehicleStatusIcon = getVehicleStatusIcon(selectedVehicle?.status ?? "");
  const dateCreated = selectedVehicle?.createdAt
    ? formatDate(new Date(selectedVehicle.createdAt), "dd.MM.yyyy")
    : "";

  const navigate = useNavigate();

  const backToVehicles = () => {
    navigate("/vehicles");
    setSelectedVehicle(null);
    setActiveTab(VEHICLES_TABS.VEHICLES);
  };

  return (
    <>
      <div className="flex justify-between">
        <BackIcon onClick={backToVehicles} className="cursor-pointer" />
        <ActionMenu />
      </div>
      <div className="py-5 flex gap-2 border-b w-full">
        <VehicleStatusIcon />
        <div className="flex w-full">
          <div className="text-[14px] ml-3 w-full">
            <p className="text-[#192252] font-bold">{selectedVehicle?.vin}</p>
            <p className="text-[#636777]">
              {" "}
              {selectedVehicle?.model!.name} {selectedVehicle?.model!.make.name}{" "}
              {selectedVehicle?.year}
            </p>
            <p className="text-[#636777]">
              Location:{" "}
              <span className="text-[#192252] font-medium">
                {selectedVehicle?.city}, {selectedVehicle?.street}
              </span>
            </p>
            <p>Date Created: {dateCreated}</p>
            <div className="mt-2 w-full">
              <Button className="w-full" onClick={() => setOpen(true)}>
                Assign to Customer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AssignToCustomerDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
