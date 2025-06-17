import { useEffect, useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import EmptyState from "@/components/custom/EmptyState";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import EmptyCustomersTableIcon from "@/assets/icons/emptyCustomersTable.svg?react";
import SearchBar from "@/components/custom/customers/SearchBar";
import CustomersTableData from "@/components/custom/customers/CustomersTableData";
import { EMPTY_TABLE_TEXT, TABLE_PAGES } from "@/constants/constants";
import { PaginationDemo } from "@/components/custom/Pagination";
import { useGetAllCustomers } from "@/api/customer/customer";
import type { CustomerResponse } from "@/api/schemas";
import { useDebounce } from "use-debounce";
import { mapCustomerToTableData } from "@/utils/mapCustomerToTableData";

export type CustomerWithVehicles = CustomerResponse & {
  vehicles: {
    vin: string;
    year: string;
    assignedDate?: string;
    model?: {
      name: string;
      make?: {
        name: string;
      };
    };
  }[];
};

export default function Customers() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetAllCustomers({
    page,
    limit,
    search: debouncedSearch,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const customers = data?.customers ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col h-full px-6">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col mb-2">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent tableName={TABLE_PAGES.CUSTOMERS} />
            <TableBody>
              {isLoading ? null : customers.length > 0 ? (
                <>
                  {(customers as CustomerWithVehicles[]).map((c) => (
                    <CustomersTableData
                      key={c.id}
                      customer={mapCustomerToTableData(c)}
                      page={page}
                      setPage={setPage}
                      totalCustomers={customers.length}
                    />
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
                  text={EMPTY_TABLE_TEXT.CUSTOMERS}
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
