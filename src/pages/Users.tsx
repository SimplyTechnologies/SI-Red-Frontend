import EmptyState from "@/components/custom/EmptyState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import EmptyCustomersTableIcon from "@/assets/icons/emptyUsersTable.svg?react";
import { useUserStore } from "@/store/useUserStore";
import UsersListHeader from "@/components/custom/users/UsersListHeader";
import Delete from "@/assets/icons/recycle.svg?react";
import Avatar from "@/assets/icons/avatar.svg?react";
import { getUserStatus } from "@/utils/userHelper";

export default function Users() {
  const { users } = useUserStore();

  return (
    <>
      <div className="flex flex-col h-full px-6">
        <UsersListHeader />

        <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeaderComponent info={'user'} />
              <TableBody>
                {users.length ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex justify-start items-center gap-4 font-bold text-heading">
                          <Avatar />{user.userName}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <div className={`w-[80px] h-[40px] ${getUserStatus(user.status)} font-semibold flex justify-center items-center rounded-[100px]`}>
                          {user.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center w-full cursor-pointer">
                          <Delete />
                        </div>
                      </TableCell>
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
