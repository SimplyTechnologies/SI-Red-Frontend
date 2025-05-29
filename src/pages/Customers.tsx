import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "@/components/custom/customers/EmptyState";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import SearchBar from "@/components/custom/customers/SearchBar"; // ← переименовал
import { useState } from "react";

export default function Customers() {
  const [search, setSearch] = useState("");
  const customers: any[] = [];

  return (
    <div className="flex flex-col h-full p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent />
            <TableBody>
              {customers.length === 0 ? <EmptyState /> : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
