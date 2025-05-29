import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/icons/search.svg?react";
import { useState } from "react";
import EmptyCustomersTableIcon from "@/assets/icons/emptyCustomersTable.svg?react";

export default function Customers() {
  const [search, setSearch] = useState("");
  const customers: any[] = [];

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex w-full items-center mb-5">
        <div className="flex items-center h-[42px] w-[327px] border border-[#DBDDE1] rounded-[8px] px-2.5 pl-6 bg-white">
          <SearchIcon className="mr-2 min-w-[16px] text-[#858C98] w-4 h-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search..."
            className="w-full border-0 p-0 text-sm text-[#192252] placeholder:text-[#858C98] focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-white shadow rounded-md flex flex-col rounded-[16px]">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeader>
              <TableRow className="!border-b-0">
                <TableHead className="px-5 pb-5 pt-6 text-[16px] text-base font-bold leading-[140%] text-[#858C98]">
                  Personal Info
                </TableHead>
                <TableHead className="px-5 pb-5 pt-6 text-[16px] text-base font-bold leading-[140%] text-[#858C98]">
                  Email
                </TableHead>
                <TableHead className="px-5 pb-5 pt-6 text-[16px] text-base font-bold leading-[140%] text-[#858C98]">
                  Phone Number
                </TableHead>
                <TableHead className="px-5 pb-5 pt-6 text-[16px] text-base font-bold leading-[140%] text-[#858C98]">
                  Vehicle
                </TableHead>
                <TableHead className="px-5 pb-5 pt-6 text-[16px] text-base font-bold leading-[140%] text-[#858C98]">
                  Assigned Date
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-[500px] p-0 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground">
                      <div className="text-3xl mb-2">
                        <EmptyCustomersTableIcon />
                      </div>
                      <p className="font-sans text-[18px] font-bold leading-[140%] text-[#192252]">
                        There are no customers to display
                      </p>

                      <p className="font-sans text-sm font-normal leading-[140%] text-[#636777] text-center">
                        All customers will be displayed here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
