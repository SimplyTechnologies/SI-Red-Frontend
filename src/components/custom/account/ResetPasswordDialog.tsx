import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import ChangePasswordIcon from "@/assets/icons/change-password-icon.svg?react";

export function ResetPasswordDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="min-h-[300px]">
        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full p-1 mx-auto text-[#403C89] bg-[#E0DFFA]">
          <ChangePasswordIcon />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-[10px] text-[18px] text-black font-bold">
            Password Reset Email Sent
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] font-normal">
            A password reset link has been sent to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full border-[#403C89] text-[#403C89]">
            OK
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
