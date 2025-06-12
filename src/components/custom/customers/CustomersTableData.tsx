import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Avatar from "@/assets/icons/avatar.svg?react";
import {
  getGetAllCustomersQueryKey,
  useDeleteCustomer,
} from "@/api/customer/customer";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationDialog from "../ConfirmationDialog";
import { DELETE_TITLE } from "@/constants/constants";

interface Vehicle {
  vin: string;
  model: string;
  assignedDate?: string;
}

interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  assignedDate: string;
  vehicles: Vehicle[];
}

function formatDateTime(dateString: string | undefined) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function CustomersTableData({
  customer,
}: {
  customer: Customer;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const extraVehicleCount = customer.vehicles.length - 1;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: deleteCustomer } = useDeleteCustomer({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Customer deleted",
          description: "Customer deleted.",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: getGetAllCustomersQueryKey(),
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete customer.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              disabled={extraVehicleCount <= 0}
              className={`transition-transform ${
                expanded ? "rotate-180" : ""
              } ${
                extraVehicleCount <= 0 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              <ChevronDown />
            </button>
            <Avatar />
            <div>
              <p className="font-bold text-[#192252]">{customer.name}</p>
            </div>
          </div>
        </TableCell>

        <TableCell>
        <div className="flex items-center gap-2">
          <div>
            <p className="text-primary font-medium text-[#192252]">
              {customer.vehicles[0]?.vin ?? 'No Vehicle'}
            </p>
            <p className="text-sm">{customer.vehicles[0]?.model ?? 'N/A'}</p>
          </div>

          {extraVehicleCount > 0 && (
            <div className="rounded-full bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 text-xs font-semibold select-none">
              +{extraVehicleCount}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>
        {customer.vehicles[0] ? formatDateTime(customer.vehicles[0].assignedDate) : 'N/A'}
      </TableCell>

        <TableCell className="font-bold">{customer.email}</TableCell>
        <TableCell>{customer.phoneNumber}</TableCell>
        <TableCell>
          <ConfirmationDialog
            itemId={customer.id}
            handleDelete={(id) => deleteCustomer({ id })}
            title={DELETE_TITLE.CUSTOMER}
            open={isOpen}
            onOpenChange={setIsOpen}
            showTrigger={true}
          />
        </TableCell>
      </TableRow>

      {expanded &&
        customer.vehicles.slice(1).map((vehicle) => (
          <TableRow key={vehicle.vin} className="bg-[#F9FAFB] transition-all">
            <TableCell />
            <TableCell>
              <p className="text-primary font-medium">{vehicle.vin}</p>
              <p className="text-sm">{vehicle.model}</p>
            </TableCell>
            <TableCell>{formatDateTime(vehicle.assignedDate)}</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        ))}
    </>
  );
}
