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
import { Info } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  onConfirm: (...args: any[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  showTrigger?: boolean;
  triggerContent?: ReactNode;
  icon?: ReactNode;
  confirmClassName?: string;
  cancelClassName?: string;
};

export default function ConfirmationDialog({
  title,
  description,
  onConfirm,
  open,
  onOpenChange,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  showTrigger = false,
  triggerContent,
  icon,
  confirmClassName,
  cancelClassName,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <AlertDialogTrigger asChild>
          <div className="cursor-pointer w-full h-full flex justify-center items-center">
            {triggerContent || (
              <span className="text-[#403C89] underline font-medium text-sm">
                Open
              </span>
            )}
          </div>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent className="sm:h-[280px] text-center">
        {icon !== null && (
          <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#E9E6FF] p-1 mx-auto">
            {icon ?? <Info className="w-[28px] h-[28px] text-[#403C89]" />}
          </div>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle className="text-[20px] mt-4">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] mt-2 text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row gap-4">
          <AlertDialogCancel
            className={`flex-1 h-[56px] rounded-md font-medium text-[16px] ${cancelClassName}`}
          >
            {cancelLabel || "Cancel"}
          </AlertDialogCancel>

          <AlertDialogAction
            className={`flex-1 h-[56px] rounded-md font-medium text-[16px] ${confirmClassName}`}
            onClick={onConfirm}
          >
            {confirmLabel || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
