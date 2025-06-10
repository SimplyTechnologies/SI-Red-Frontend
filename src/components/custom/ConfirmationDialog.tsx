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
} from "@/components/ui/alert-dialog"
import { Trash2, Info } from "lucide-react"

type Props = {
  userId: string;
  handleDelete: (id: string) => void;
  title: string;
};

export default function ConfirmationDialog ({handleDelete, userId, title}: Props) {
    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex justify-center items-center w-full cursor-pointer">
              <Trash2
                className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out"
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#FFE0EA] p-1 mx-auto">
                <Info className="w-[28px] h-[28px] text-[#FA5087]" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {title}</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure that you would like to delete this {title.toLowerCase()}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
              <AlertDialogAction className="flex-1" onClick={() => handleDelete(userId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
}