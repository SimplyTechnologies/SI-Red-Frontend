import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Points from "@/assets/icons/points.svg?react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import ConfirmationDialog from "@/components/custom/ConfirmationDialog";
import { DELETE_TITLE, VEHICLE_DIALOG_TITLE } from "@/constants/constants";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useDeleteVehicleWithToast from "@/hooks/useDeleteVehicleWithToast";
import { AddVehicleDialog } from "@/components/custom/AddVehicleDialog";

export default function ActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, onOpenChange] = useState(false);
  const params = useParams();
  const vehicle_id = params.id;

  const handleEdit = () => {
    onOpenChange(true);
  };

  const deleteVehicleMutation = useDeleteVehicleWithToast();

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteVehicleMutation.mutate({ id });
  };

  return (
    <>
      <AddVehicleDialog open={open} onOpenChange={onOpenChange} title={VEHICLE_DIALOG_TITLE.EDIT} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Points className="cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="flex flex-col justify-center align-center p-[12px] border-none rounded-[16px] w-[219px] h-[102px]"
        >
          <DropdownMenuItem
            className="group px-4 py-2 hover:bg-[#F4F6F9] rounded-[8px] cursor-pointer"
            onClick={handleEdit}
          >
            <Pencil className="text-[#AFAFAF] group-hover:text-[#403C89]" />
            <span className="text-text-muted group-hover:text-heading group-hover:font-semibold">
              Edit
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="group px-4 py-2 hover:bg-[#F4F6F9] rounded-[8px] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="text-[#AFAFAF] group-hover:text-[#403C89]" />
            <span className="text-text-muted group-hover:text-heading group-hover:font-semibold">
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {vehicle_id && (
        <ConfirmationDialog
          handleDelete={handleDelete}
          itemId={vehicle_id}
          title={DELETE_TITLE.VEHICLE}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </>
  );
}
