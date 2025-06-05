import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";

interface Vehicle {
  vin: string;
  model: string;
}

interface Customer {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  assignDate: string;
  vehicles: Vehicle[];
}

export default function CustomerRow({ customer }: { customer: Customer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <button onClick={() => setExpanded(!expanded)}>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <div>
              <p className="font-bold">{customer.name}</p>
              <p className="text-sm text-muted">@{customer.username}</p>
              <p className="text-sm text-muted">{customer.phone}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="font-medium text-primary">
            {customer.vehicles[0]?.vin}
          </p>
          <p className="text-sm text-muted">{customer.vehicles[0]?.model}</p>
        </TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell>{customer.assignDate}</TableCell>
        <TableCell>{customer.phone}</TableCell>
        <TableCell>
          <div className="flex justify-center items-center w-full cursor-pointer">
            🗑️
          </div>
        </TableCell>
      </TableRow>

      {expanded &&
        customer.vehicles.slice(1).map((vehicle, idx) => (
          <TableRow key={idx} className="bg-[#F9FAFB]">
            <TableCell colSpan={6} className="pl-[72px]">
              <div className="flex flex-col gap-1 text-sm">
                <p>
                  <span className="font-semibold">VIN:</span> {vehicle.vin}
                </p>
                <p>
                  <span className="font-semibold">Model:</span> {vehicle.model}
                </p>
              </div>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
