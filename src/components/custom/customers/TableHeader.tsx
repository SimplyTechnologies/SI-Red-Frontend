import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import {
  customersTableHeaders,
  usersTableHeaders,
} from "@/constants/constants";
import { useTableSortStore } from "@/store/useTableSortStore";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  tableName: string;
}

export default function Header({ tableName }: Props) {
  const headers =
    tableName === "users" ? usersTableHeaders : customersTableHeaders;
  const { setUsers, setCustomers, users, customers } = useTableSortStore();

  const currentSort = tableName === "users" ? users : customers;

  const getNextSortOrder = (
    current: "ASC" | "DESC" | null
  ): "ASC" | "DESC" | null => {
    if (current === "ASC") return "DESC";
    if (current === "DESC") return null;
    return "ASC";
  };

  const handleSort = (key: string) => {
    const isSameColumn = currentSort.sortBy === key;
    const nextSortOrder = isSameColumn
      ? getNextSortOrder(currentSort.sortOrder)
      : "ASC";

    const update = {
      sortBy: nextSortOrder ? key : null,
      sortOrder: nextSortOrder,
    };

    tableName === "users" ? setUsers(update) : setCustomers(update);
  };

  return (
    <TableHeader>
      <TableRow className="!border-b-0">
        {headers.map((header) => (
          <TableHead
            key={header.label}
            className="px-5 pb-5 pt-6 text-[16px] font-bold leading-[140%] text-[#858C98]"
          >
            <div
              onClick={() =>
                header.sortable && handleSort(header.sortKey || "")
              }
              className={`flex items-center transition duration-300 ease-in-out cursor-pointer ${
                currentSort.sortBy === header.sortKey
                  ? "text-heading"
                  : "hover:text-heading text-[#858C98]"
              }`}
            >
              {header.sortable && (
                <>
                  {currentSort.sortBy === header.sortKey &&
                    currentSort.sortOrder === "ASC" && <ChevronUp />}
                  {currentSort.sortBy === header.sortKey &&
                    currentSort.sortOrder === "DESC" && <ChevronDown />}
                  {(!currentSort.sortBy ||
                    currentSort.sortBy !== header.sortKey) && (
                    <ChevronsUpDown />
                  )}
                </>
              )}
              &nbsp;{header.label}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
