import { TableRow, TableCell } from "@/components/ui/table";
import { customersTableHeaders } from "@/constants/constants";
import { usersTableHeaders } from "@/constants/constants";
import type { ComponentType, SVGProps } from "react";

type EmptyStateProps = {
  text: string;
  tableName: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>
};

export default function EmptyState({ text, tableName, icon: Icon }: EmptyStateProps) {
    const headersLength = tableName === "users" ? usersTableHeaders : customersTableHeaders;
    
  return (
    <TableRow>
      <TableCell
        colSpan={headersLength.length}
        className="p-0 relative"
      >
        <div className="min-h-[calc(100vh-240px)] flex flex-col items-center justify-center text-center">
          <Icon className="mb-2" />
          <p className="font-sans text-[18px] font-bold leading-[140%] text-[#192252]">
            There are no {tableName} to display
          </p>
          <p className="font-sans text-sm font-normal leading-[140%] text-[#636777] mt-1 w-[335px]">
            {text}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
