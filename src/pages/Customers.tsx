import { useEffect, useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import EmptyState from "@/components/custom/EmptyState";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import EmptyCustomersTableIcon from "@/assets/icons/emptyCustomersTable.svg?react";
import SearchBar from "@/components/custom/customers/SearchBar";
import CustomersTableData from "@/components/custom/customers/CustomersTableData";
import { TABLE_PAGES } from "@/constants/constants";
import { useCustomerStore } from "@/store/useCustomerStore";
import { mockCustomers } from "@/constants/mockCustomers";
import { PaginationDemo } from "@/components/custom/Pagination";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const customers = useCustomerStore((s) => s.customers);
  const setCustomers = useCustomerStore((s) => s.setCustomers);

  const totalPages = Math.ceil(customers.length / limit);
  const paginatedCustomers = customers.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    setCustomers(mockCustomers);
  }, [setCustomers]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="flex flex-col h-full px-6">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col mb-2">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent tableName={TABLE_PAGES.CUSTOMERS} />
            <TableBody>
              {paginatedCustomers.length > 0 ? (
                <>
                  {paginatedCustomers.map((c) => (
                    <CustomersTableData key={c.id} customer={c} />
                  ))}
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="flex justify-end pt-4">
                        <PaginationDemo
                          page={page}
                          totalPages={totalPages}
                          onPageChange={setPage}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <EmptyState
                  text={"All customers will be displayed here."}
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
