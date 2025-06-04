import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore"; // Update path as needed
import { useGetUsers } from "@/api/user/user";
import EmptyState from "@/components/custom/EmptyState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import EmptyCustomersTableIcon from "@/assets/icons/emptyUsersTable.svg?react";
import UsersListHeader from "@/components/custom/users/UsersListHeader";
import { Trash2 } from "lucide-react";
import Avatar from "@/assets/icons/avatar.svg?react";
import { getUserStatus } from "@/utils/userHelper";
import { TABLE_PAGES, USER_STATUS } from "@/constants/constants";
import { PaginationDemo } from "@/components/custom/Pagination";

export default function Users() {
  const { data: users = [] } = useGetUsers(
    { page: 1, limit: 5 },
    {
      query: {
        select: (data) => data.users ?? [],
      },
    }
  );

  const setUsers = useUserStore((state) => state.setUsers);

  useEffect(() => {
    setUsers(users);
  }, [users, setUsers]);

  return (
    <div className="flex flex-col h-full px-6">
      <UsersListHeader />

      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col mb-2">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent tableName={TABLE_PAGES.USERS} />
            <TableBody>
              {users.length ? (
                <>
                  {users.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex justify-start items-center gap-4 font-bold text-heading">
                          <Avatar />
                          {user.firstName + " " + user.lastName}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <div
                          className={`w-[80px] h-[40px] 
                        ${getUserStatus(user.isVerified)} 
                        font-semibold flex justify-center items-center rounded-[100px]`}
                        >
                          {user.isVerified
                            ? USER_STATUS.ACTIVATED
                            : USER_STATUS.PENDING}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center w-full cursor-pointer">
                          <Trash2 className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex justify-center pt-4">
                        <PaginationDemo />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <EmptyState
                  text={
                    "At the moment, there are no users listed. However, you have the option to manually add new users."
                  }
                  tableName={TABLE_PAGES.USERS}
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
