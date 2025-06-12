import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "../accountActivation/PasswordInput";
import { makeActivationInputProps } from "@/utils/makeActivationInputProps";
import type { FormData } from "../accountActivation/AccountActivationForm";
import { passwordRules } from "@/constants/constants";
import { useSearchParams } from "react-router-dom";
import { useResetPassword } from "@/api/authentication/authentication";
import ConfirmationDialog from "../ConfirmationDialog";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const resetPasswordMutation = useResetPassword({
    mutation: {
      onSuccess: () => {
        console.log("Password reset successful");
        window.location.href = "/signin";
      },
      onError: (error: any) => {
        console.error(
          "Password reset failed:",
          error?.response?.data?.message || error.message
        );
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      for (let rule of passwordRules) {
        if (!rule.test(formData.password)) {
          newErrors.password = rule.label;
          break;
        }
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmation is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidateAndOpenDialog = (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    if (validate()) {
      setShowDialog(true);
    }
  };

  const handleResetConfirmed = () => {
    const token = searchParams.get("token");
    if (!token) {
      setErrors((prev) => ({
        ...prev,
        password: "Token is missing from URL",
      }));
      return;
    }

    resetPasswordMutation.mutate({
      data: {
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
    });
  };

  const passwordInputProps = makeActivationInputProps(
    {
      id: "password",
      label: "New Password",
      placeholder: "Enter Password",
      type: "password",
    },
    formData,
    handleChange,
    errors
  );

  return (
    <>
      <form className="space-y-6" onSubmit={handleValidateAndOpenDialog}>
        <PasswordInput
          formData={formData}
          inputProps={passwordInputProps}
          hasTriedSubmit={hasTriedSubmit}
        />

        <div className="w-full max-w-[450px]">
          <Label
            htmlFor="confirmPassword"
            className={`block mb-1 mt-7 text-left font-medium text-[14px] leading-[1.4] font-dm-sans ${
              hasTriedSubmit && errors.confirmPassword
                ? "text-red-500"
                : "text-[#192252]"
            }`}
          >
            Confirm New Password
          </Label>

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full h-[48px] md:h-[56px] rounded-[8px] border bg-white transition-colors ${
              hasTriedSubmit && errors.confirmPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-[#DBDDE1] focus:border-[#3652E0]"
            }`}
          />

          <div className="h-[16px] mt-1 transition-opacity duration-200">
            <p
              className={`text-xs text-red-500 ${
                hasTriedSubmit && errors.confirmPassword
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              {errors.confirmPassword || "⠀"}
            </p>
          </div>
        </div>

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
        confirmClassName="border border-[#403C89] bg-[#403C89] hover:bg-[#474396] text-white"
        cancelClassName="border border-[#403C89] text-[#403C89] hover:bg-[#ebeaf7]"
        open={showDialog}
        onOpenChange={setShowDialog}
        onConfirm={handleResetConfirmed}
      />
    </>
  );
}
