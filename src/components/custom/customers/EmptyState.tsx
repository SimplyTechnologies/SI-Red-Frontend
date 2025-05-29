import EmptyCustomersTableIcon from "@/assets/icons/emptyCustomersTable.svg?react";
import { TableRow, TableCell } from "@/components/ui/table";
import { customersTableHeaders } from "@/constants/constants";

export default function EmptyState() {
  return (
    <TableRow>
      <TableCell
        colSpan={customersTableHeaders.length}
        className="p-0 relative"
      >
        <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-center">
          <EmptyCustomersTableIcon className="mb-2" />
          <p className="font-sans text-[18px] font-bold leading-[140%] text-[#192252]">
            There are no customers to display
          </p>
          <p className="font-sans text-sm font-normal leading-[140%] text-[#636777] mt-1">
            All customers will be displayed here.
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
