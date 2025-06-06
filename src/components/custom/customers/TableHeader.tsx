import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { customersTableHeaders } from "@/constants/constants";
import { usersTableHeaders } from "@/constants/constants";

interface Props {
  tableName: string
}
export default function Header({tableName}: Props) {
  const headers = tableName === "users" ? usersTableHeaders : customersTableHeaders;

  return (
    <TableHeader>
      <TableRow className="!border-b-0">
        {headers.map((header) => (
          <TableHead
            key={header}
            className="px-5 pb-5 pt-6 text-[16px] font-bold leading-[140%] text-[#858C98]"
          >
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
