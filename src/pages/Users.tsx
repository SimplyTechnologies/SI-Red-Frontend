import EmptyState from "@/components/custom/EmptyState";
import SearchBar from "@/components/custom/customers/SearchBar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import { useState } from "react";
import EmptyCustomersTableIcon from "@/assets/icons/emptyUsersTable.svg?react";
import { useUserStore } from "@/store/useUserStore";
import UserFormDialog from "@/components/assignToCustomerCreateUserDialog/FormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserForm from "@/components/assignToCustomerCreateUserDialog/Form";

export default function Users() {
  const [search, setSearch] = useState("");
  const { users, userFormOpen, setUserFormOpen } = useUserStore();

  return (
    <>
      <div className="flex flex-col h-full px-6">
        <div className="flex justify-between items-center">
          <SearchBar search={search} setSearch={setSearch} />
          <Button
            onClick={() => setUserFormOpen(true)}
            className="h-[40px] w-[143px] px-[18px] py-[10px] rounded-[8px] gap-[6px] my-4 mb-5 flex items-center"
          >
            <Plus size={16} />
            Add New User
          </Button>

          <UserFormDialog
            open={userFormOpen}
            onOpenChange={setUserFormOpen}
            title={"Add New User"}
          >
            <UserForm
              onSubmit={() => {
                setUserFormOpen(false);
              }}
              submitLabel="Save"
            />
          </UserFormDialog>
        </div>

        <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeaderComponent />
              <TableBody>
                {users.length ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyState
                    text={
                      "At the moment, there are no users listed. However, you have the option to manually add new users."
                    }
                    info={"users"}
                    icon={EmptyCustomersTableIcon}
                  />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
