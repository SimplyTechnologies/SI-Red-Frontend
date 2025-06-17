import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { getGetUsersQueryKey, useGetUsers } from "@/api/user/user";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import EmptyState from "@/components/custom/EmptyState";
import TableHeaderComponent from "@/components/custom/customers/TableHeader";
import EmptyCustomersTableIcon from "@/assets/icons/emptyUsersTable.svg?react";
import UsersListHeader from "@/components/custom/users/UsersListHeader";
import UsersTableData from "@/components/custom/users/UsersTableData";
import { EMPTY_TABLE_TEXT, TABLE_PAGES } from "@/constants/constants";
import { PaginationDemo } from "@/components/custom/Pagination";
import { useDebounce } from "use-debounce";
import useDeleteUserWithToast from "@/hooks/useDeleteUserWithToast";
import type { User } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";

export default function Users() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const limit = 5;
  const queryClient = useQueryClient();

  const { data } = useGetUsers(
    { page, limit, search: debouncedSearch },
    { query: { select: (res) => res } }
  );

  const setUsers = useUserStore((state) => state.setUsers);
  const users = data?.users ?? [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  useEffect(() => setPage(1), [debouncedSearch]);
  useEffect(() => setUsers(users), [users, setUsers]);

  const queryKey = getGetUsersQueryKey({
    page,
    limit,
    search: debouncedSearch,
  });
  const deleteUserMutation = useDeleteUserWithToast(queryKey);

  const handleDelete = (id: string) => {
    deleteUserMutation.mutate(
      { id },
      {
        onSuccess: () => {
          if (users.length === 1 && page > 1) {
            setPage(page - 1);
          } else {
            queryClient.invalidateQueries({ queryKey });
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-full px-6">
      <UsersListHeader search={search} setSearch={setSearch} />
      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col mb-2">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeaderComponent tableName={TABLE_PAGES.USERS} />
            <TableBody>
              {users.length ? (
                <>
                  {users.map((user: User) => (
                    <UsersTableData
                      key={user.id}
                      user={user}
                      handleDelete={handleDelete}
                    />
                  ))}
                  <TableRow>
                    <TableCell colSpan={5}>
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
                  text={EMPTY_TABLE_TEXT.USERS}
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
