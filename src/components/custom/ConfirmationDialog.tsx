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
import type { ReactNode, ComponentType } from "react";

type Props = {
  title: string;
  description: string;
  open?: boolean;
  onConfirm: (...args: any[]) => void;
  onConfirmArgs?: any[];
  onOpenChange?: (open: boolean) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  showTrigger?: boolean;
  triggerContent?: ReactNode;
  icon?: ComponentType;
  confirmClassName?: string;
  cancelClassName?: string;
  iconClassName?: string;
};

export default function ConfirmationDialog({
  title,
  description,
  onConfirm,
  onConfirmArgs = [],
  open,
  onOpenChange,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  showTrigger = false,
  triggerContent,
  icon: Icon,
  confirmClassName,
  cancelClassName,
  iconClassName,
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
        <div
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-full p-1 mx-auto ${iconClassName}`}
        >
          {Icon ? <Icon /> : <Info />}
        </div>

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
            {cancelLabel}
          </AlertDialogCancel>

          <AlertDialogAction
            className={`flex-1 h-[56px] rounded-md font-medium text-[16px] ${confirmClassName}`}
            onClick={() => onConfirm(...onConfirmArgs)}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
