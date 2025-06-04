import { useVehiclesStore } from "@/store/useVehiclesStore";
import { getVehicleStatusIcon } from "@/utils/vehicleHelpers";
import BackIcon from "@/assets/icons/back.svg?react";
import { formatDate } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ActionMenu from "@/components/layout/ActionMenu/ActionMenu";
import CustomerFormDialog from "@/components/assignToCustomerCreateUserDialog/FormDialog";
import CustomerForm from "@/components/assignToCustomerCreateUserDialog/Form";
import Map from "@/components/map/Map";
import {
  useAssignCustomerWithData,
  useGetVehicle,
} from "@/api/vehicle/vehicle";
import { VEHICLES_TABS } from "@/constants/constants";
import VehiclesTabListSkeleton from "./vehiclesTab/VehiclesTabListSkeleton";
import { toast } from "@/hooks/use-toast";

export default function VehicleDetails() {
  const { selectedVehicle, setSelectedVehicle, setActiveTab } =
    useVehiclesStore((s) => ({
      selectedVehicle: s.selectedVehicle,
      setSelectedVehicle: s.setSelectedVehicle,
      setActiveTab: s.setActiveTab,
    }));

  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {}
  );
  const [open, setOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const id = params.id || "";

  const { data: vehicle, isLoading } = useGetVehicle(id);
  const navigate = useNavigate();

  const VehicleStatusIcon = getVehicleStatusIcon(selectedVehicle?.status ?? "");
  const dateCreated = selectedVehicle?.createdAt
    ? formatDate(new Date(selectedVehicle.createdAt), "dd.MM.yyyy")
    : "";

  useEffect(() => {
    setSelectedVehicle(vehicle || null);
  }, [vehicle]);

  useEffect(() => {
    if (open) {
      setExternalErrors({});
    }
  }, [open]);

  const assignCustomerMutation = useAssignCustomerWithData({
    mutation: {
      onSuccess: (data) => {
        const message =
          data?.message || "Vehicle has been assigned successfully.";

        toast({
          title: "Success",
          description: message,
          variant: "default",
        });

        setOpen(false);
      },
      onError: (error: any) => {
        const response = error?.data;
        const rawFieldErrors = response?.errors;

        if (Array.isArray(rawFieldErrors)) {
          const mappedErrors: Record<string, string> = {};

          rawFieldErrors.forEach((err: any) => {
            if (err?.path && err?.msg) {
              mappedErrors[err.path] = err.msg;
            }
          });

          if (Object.keys(mappedErrors).length > 0) {
            setExternalErrors(mappedErrors);
            return;
          }
        }
        const msg =
          error.status === 409
            ? "Vehicle already assigned to another customer"
            : response?.message || "Something went wrong";
        toast({
          title: "Assignment failed",
          description: msg,
          variant: "destructive",
        });
      },
    },
  });

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
            {isLoading ? (
              <VehiclesTabListSkeleton />
            ) : (
              <div className="flex w-[350px]">
                <div className="text-[14px] ml-3 w-full">
                  <p className="text-heading font-bold">
                    {selectedVehicle?.vin}
                  </p>
                  <p className="text-text-muted">
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
            )}
          </div>

          <div className="mt-2 w-full border-b pb-5">
            <Button className="w-full" onClick={() => setOpen(true)}>
              Assign to Customer
            </Button>

            <CustomerFormDialog
              open={open}
              onOpenChange={setOpen}
              title="Assign to Customer"
            >
              <CustomerForm
                onSubmit={(values) => {
                  assignCustomerMutation.mutate({ id, data: values });
                }}
                externalErrors={externalErrors}
              />
            </CustomerFormDialog>
          </div>
        </div>
      </div>

      <Map className="w-full h-full" />
    </div>
  );
}
