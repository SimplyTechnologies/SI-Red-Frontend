import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "@/components/custom/EmptyState";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import SearchBar from "@/components/custom/customers/SearchBar";
import { useState } from "react";
import EmptyCustomersTableIcon from "@/assets/icons/emptyCustomersTable.svg?react";
import { TABLE_PAGES } from "@/constants/constants";

import CustomerRow from "@/components/custom/customers/CustomerRow";

const mockData = [
  {
    id: "1",
    name: "Ashley Russo",
    username: "russo09",
    phone: "+1-090-33-333-322",
    email: "russo@gmail.com",
    assignDate: "12:00 PM, May 17, 2023",
    vehicles: [
      { vin: "1FTEX1C85AKB", model: "Ford Mustang 2021" },
      { vin: "2C3CDXHG6KH", model: "Dodge Charger 2020" },
    ],
  },
  // ...
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const customers: any[] = mockData;

  return (
    <div className="flex flex-col h-full px-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent tableName={TABLE_PAGES.CUSTOMERS} />
            <TableBody>
              {customers.length > 0 ? (
                customers.map((c) => <CustomerRow key={c.id} customer={c} />)
              ) : (
                <EmptyState
                  text="All customers will be displayed here."
                  tableName={TABLE_PAGES.CUSTOMERS}
                  icon={EmptyCustomersTableIcon}
                />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
