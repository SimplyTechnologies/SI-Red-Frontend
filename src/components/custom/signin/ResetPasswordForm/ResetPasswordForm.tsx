import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PasswordInput from "../../accountActivation/PasswordInput";
import ConfirmationDialog from "../../ConfirmationDialog";
import ChangePasswordIcon from "@/assets/icons/change-password-icon.svg?react";
import ConfirmPasswordField from "./ConfirmPasswordField";
import useResetPasswordForm from "./useResetPasswordForm";
import ExpiredLinkScreen from "./ExpiredLinkScreen";
import { useVerifyResetToken } from "@/api/authentication/authentication"; // путь зависит от генерации orval

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const {
    formData,
    errors,
    hasTriedSubmit,
    showDialog,
    setShowDialog,
    passwordInputProps,
    handleChange,
    handleValidateAndOpenDialog,
    handleResetConfirmed,
  } = useResetPasswordForm();

  const { mutate: verifyToken, status } = useVerifyResetToken({
    mutation: {
      onSuccess: () => setIsTokenValid(true),
      onError: () => setIsTokenValid(false),
    },
  });

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }
    verifyToken({ data: { token } });
  }, [token]);

  const isLoading = status === "pending";

  if (isTokenValid === null || isLoading) {
    return <p>Loading...</p>; // или заменить на спиннер
  }

  if (!isTokenValid) {
    return <ExpiredLinkScreen />;
  }

  return (
    <>
      <h2 className="font-bold text-2xl md:text-[36px] leading-[1.2] font-dm-sans text-[#192252]">
        Reset Password
      </h2>
      <form className="space-y-6" onSubmit={handleValidateAndOpenDialog}>
        <PasswordInput
          formData={formData}
          inputProps={passwordInputProps}
          hasTriedSubmit={hasTriedSubmit}
        />

        <ConfirmPasswordField
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          hasTriedSubmit={hasTriedSubmit}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
        >
          Reset Password
        </Button>
      </form>

      <ConfirmationDialog
        title="Reset Password"
        description="Are you sure that you would like to reset password? You will be logged out from all devices!"
        confirmLabel="Reset"
        cancelLabel="Cancel"
        open={showDialog}
        onOpenChange={setShowDialog}
        onConfirm={handleResetConfirmed}
        icon={ChangePasswordIcon}
        iconClassName="text-[#403C89] bg-[#E0DFFA]"
        confirmClassName="border border-[#403C89] bg-[#403C89] hover:bg-[#474396] text-white"
        cancelClassName="border border-[#403C89] text-[#403C89] hover:bg-[#ebeaf7]"
      />
    </>
  );
}
