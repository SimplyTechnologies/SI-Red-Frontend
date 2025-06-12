import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Info } from "lucide-react";

type Props = {
  itemId: string;
  handleDelete: (id: string) => void;
  title: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean; // optional: whether to show the default trash icon trigger
};

export default function ConfirmationDialog({
  handleDelete,
  itemId,
  title,
  open,
  onOpenChange,
  showTrigger,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <div className="flex justify-center items-center w-full cursor-pointer">
          <AlertDialogTrigger asChild>
            <Trash2 className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out" />
          </AlertDialogTrigger>
        </div>
      )}

      <AlertDialogContent>
        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#FFE0EA] p-1 mx-auto">
          <Info className="w-[28px] h-[28px] text-[#FA5087]" />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this {title.toLowerCase()}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex-1"
            onClick={() => handleDelete(itemId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
