import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CustomerFormDialog from "@/components/assignToCustomerCreateUserDialog/FormDialog";
import CustomerForm from "@/components/assignToCustomerCreateUserDialog/Form";
import { toast } from "@/hooks/use-toast";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useAssignCustomerWithDataMutation } from "@/api/vehicle/vehicle.custom";
import { useQueryClient } from "@tanstack/react-query";
import { getGetAllCustomersQueryKey } from "@/api/customer/customer"; // adjust path if needed

export default function AssignCustomerSection() {
  const [open, setOpen] = useState(false);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>({});
  const { id = "" } = useParams<{ id: string }>();
  const setSelectedVehicle = useVehiclesStore((s) => s.setSelectedVehicle);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (open) {
      setExternalErrors({});
    }
  }, [open]);

  const assignCustomerMutation = useAssignCustomerWithDataMutation();

  return (
    <div className="mt-2 w-full border-b pb-5">
      <Button className="w-full" onClick={() => setOpen(true)}>
        Assign to Customer
      </Button>

      <CustomerFormDialog open={open} onOpenChange={setOpen} title="Assign to Customer">
        <CustomerForm
          submitLabel="Assign"
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);

            if (values.documents && values.documents.length > 0) {
              values.documents.forEach((file) => {
                formData.append("documents", file);
              });
            }

            assignCustomerMutation.mutate(
              { id, data: formData },
              {
                onSuccess: async (data) => {
                   queryClient.invalidateQueries({
                queryKey: getGetAllCustomersQueryKey(),
              });

                  const message =
                    data?.message || "Vehicle has been assigned successfully.";

                  toast({
                    title: "Success",
                    description: message,
                    variant: "success",
                  });

                  setOpen(false);
                  await setSelectedVehicle(data.vehicle);
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
              }
            );
          }}
          externalErrors={externalErrors}
          emailAutocomplete={true}
          showUploadField={true}
        />
      </CustomerFormDialog>
    </div>
  );
}
