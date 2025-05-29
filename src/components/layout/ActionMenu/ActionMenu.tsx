import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Points from "@/assets/icons/points.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import Delete from "@/assets/icons/delete.svg?react";

export default function ActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Points />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex flex-col justify-center align-center p-[12px] border-none rounded-[16px] w-[219px] h-[102px]"
      >
        <DropdownMenuItem className="px-4 py-2 hover:bg-[#F4F6F9] rounded-[8px] cursor-pointer">
          <Edit /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="px-4 py-2 hover:bg-[#F4F6F9] rounded-[8px] cursor-pointer">
          <Delete /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
