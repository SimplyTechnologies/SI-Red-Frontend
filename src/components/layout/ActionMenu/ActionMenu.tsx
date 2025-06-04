import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Points from "@/assets/icons/points.svg?react";
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';

export default function ActionMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Points />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col justify-center align-center p-[12px] border-none rounded-[16px] w-[219px] h-[102px]">
        <DropdownMenuItem className="group px-4 py-2 hover:bg-[#F4F6F9] rounded-[8px] cursor-pointer">
          <Pencil className="text-[#AFAFAF] group-hover:text-[#403C89]" /> 
          <span className="text-text-muted group-hover:text-heading group-hover:font-semibold">Edit</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="group px-4 py-2 hover:bg-[#F4F6F9] rounded-[8px] cursor-pointer">
          <Trash className="text-[#AFAFAF] group-hover:text-[#403C89]" /> 
          <span className="text-text-muted group-hover:text-heading group-hover:font-semibold">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
