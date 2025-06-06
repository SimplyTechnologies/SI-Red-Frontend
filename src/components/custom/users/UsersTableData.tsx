import { TableCell, TableRow } from "@/components/ui/table";
import { USER_STATUS } from "@/constants/constants";
import { getUserStatus } from "@/utils/userHelper";
import Avatar from "@/assets/icons/avatar.svg?react";
import ConfirmationDialog from "../ConfirmationDialog";

type Props = {
  user: any;
  handleDelete: (id: string) => void;
};

export default function UsersTableData({ user, handleDelete }: Props) {
  return (
    <>
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
            {user.isVerified ? USER_STATUS.ACTIVATED : USER_STATUS.PENDING}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex justify-center items-center w-full cursor-pointer">
            <ConfirmationDialog handleDelete={handleDelete} userId={user.id} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
