import { TableCell, TableRow } from "@/components/ui/table";
import { DELETE_TITLE, USER_STATUS } from "@/constants/constants";
import { getUserStatus } from "@/utils/userHelper";
import Avatar from "@/assets/icons/avatar.svg?react";
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type Props = {
  user: any;
  handleDelete: (id: string) => void;
};

export default function UsersTableData({ user, handleDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

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
            <ConfirmationDialog
              onConfirm={handleDelete}
              title={`Delete ${DELETE_TITLE.USER}`}
              description="Are you sure that you would like to delete this user? This action cannot be undone."
              open={isOpen}
              onOpenChange={setIsOpen}
              showTrigger={true}
              iconClassName="text-[#FA5087] bg-[#FFE0EA]"
              triggerContent={
                <Trash2 className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out" />
              }
              onConfirmArgs={[user.id]}
            />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
