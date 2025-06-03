import EmptyState from "@/components/custom/EmptyState";
import SearchBar from "@/components/custom/customers/SearchBar";
import AddNewUserDialog from "@/components/custom/users/AddNewUserDialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import { useState } from "react";
import EmptyCustomersTableIcon from "@/assets/icons/emptyUsersTable.svg?react";
import { useUserStore } from "@/store/useUserStore";

export default function Users() {
  const [search, setSearch] = useState("");
  const { users, setUsers } = useUserStore();

  return (
    <>
      <div className="flex flex-col h-full px-6">
        <div className="flex justify-between items-center">
          <SearchBar search={search} setSearch={setSearch} />
          <AddNewUserDialog title={"Add New User"} />
        </div>

        <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeaderComponent />
              <TableBody>
                {users.length ? 
                  users.map((user) => (
                  <TableRow>
                    <TableCell>
                      {user.userName}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.phoneNumber}
                    </TableCell>
                  </TableRow>
                  )) :
                  <EmptyState
                    text={
                      "At the moment, there are no users listed. However, you have the option to manually add new users."
                    }
                    info={"users"}
                    icon={EmptyCustomersTableIcon}
                  />}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
