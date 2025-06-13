import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRequestPasswordReset } from "@/api/authentication/authentication";
import { ProfileSection } from "@/components/custom/account/ProfileSection";
import { ResetPasswordDialog } from "@/components/custom/account/ResetPasswordDialog";

export default function Account() {
  const [showResetDialog, setShowResetDialog] = useState(false);

  const { mutate: requestPasswordReset, isPending } = useRequestPasswordReset({
    mutation: {
      onSuccess: () => setShowResetDialog(true),
      onError: (err) => console.error("Failed to request password reset:", err),
    },
  });

  return (
    <div className="p-5 h-[max] w-[max] bg-[#F8F9F9] bg-red">
      <div className="bg-white rounded-[16px] p-7 shadow-sm">
        <h2 className="text-[26px] font-bold text-heading">My Profile</h2>
        <p className="text-[15px] font-normal text-muted-foreground mb-8">
          This information can be edited from your profile page.
        </p>

        <ProfileSection />

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-heading text-base font-medium">
            Change Password
            <p className="text-[14px] font-normal text-muted-foreground mb-3">
              Forgot your password, find back in seconds
            </p>
          </h3>

          <Button
            className="w-[10vw] h-[5vh] min-w-[110px]"
            onClick={() => requestPasswordReset()}
            disabled={isPending}
          >
            Reset Password
          </Button>

          <ResetPasswordDialog
            open={showResetDialog}
            onOpenChange={setShowResetDialog}
          />
        </div>
      </div>
    </div>
  );
}
