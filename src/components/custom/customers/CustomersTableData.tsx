import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Avatar from "@/assets/icons/avatar.svg?react";
import { Trash2 } from "lucide-react";

interface Vehicle {
  vin: string;
  model: string;
}

interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  assignedDate: string;
  vehicles: Vehicle[];
}

export default function CustomersTableData({
  customer,
  handleDelete,
}: {
  customer: Customer;
  handleDelete?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const extraVehicleCount = customer.vehicles.length - 1;

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
                {customer.vehicles[0]?.vin}
              </p>
              <p className="text-sm">{customer.vehicles[0]?.model}</p>
            </div>

            {extraVehicleCount > 0 && (
              <div className="rounded-full bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 text-xs font-semibold select-none">
                +{extraVehicleCount}
              </div>
            )}
          </div>
        </TableCell>

        <TableCell>{customer.assignedDate}</TableCell>
        <TableCell className="font-bold">{customer.email}</TableCell>
        <TableCell>{customer.phoneNumber}</TableCell>
        <TableCell>
          <div
            className="flex justify-center items-center w-full cursor-pointer"
            onClick={() => handleDelete?.(customer.id)}
          >
            <Trash2 className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out" />
          </div>
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
            <TableCell>{customer.assignedDate}</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        ))}
    </>
  );
}
