import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CustomerFormDialog from "@/components/assignToCustomerCreateUserDialog/FormDialog";
import CustomerForm from "@/components/assignToCustomerCreateUserDialog/Form";
import { useAssignCustomerWithData } from "@/api/vehicle/vehicle";
import { toast } from "@/hooks/use-toast";

export default function AssignCustomerSection() {
  const [open, setOpen] = useState(false);
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {}
  );
  const { id = "" } = useParams<{ id: string }>();

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
          variant: "success",
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

  return (
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
          emailAutocomplete={true}
        />
      </CustomerFormDialog>
    </div>
  );
}
