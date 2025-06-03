import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "@/components/custom/EmptyState";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import SearchBar from "@/components/custom/customers/SearchBar"; // ← переименовал
import { useState } from "react";
import EmptyCustomersTableIcon from "@/assets/icons/emptyCustomersTable.svg?react";

export default function Customers() {
  const [search, setSearch] = useState("");
  const customers: any[] = [];

  return (
    <div className="flex flex-col h-full px-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent />
            <TableBody>
              {customers.length === 0 ? (
                <EmptyState
                  text={"All customers will be displayed here."}
                  info={"customers"}
                  icon={EmptyCustomersTableIcon}
                />
              ) : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
