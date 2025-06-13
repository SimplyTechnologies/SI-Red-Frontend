import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { makeActivationInputProps } from "@/utils/makeActivationInputProps";
import { passwordRules } from "@/constants/constants";
import { useResetPassword } from "@/api/authentication/authentication";
import { useAuthStore } from "@/store/authStore";
import type { FormData } from "../components/custom/accountActivation/AccountActivationForm";

export default function useResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const { setShowForgotPassword } = useAuthStore();

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
        setShowForgotPassword(false);
        window.location.href = "/signin";
      },
      onError: (error: any) => {
        if (error.status === 400) {
          setErrors((prev) => ({
            ...prev,
            password:
              "New password must be different from the current password",
          }));
          return;
        }
        console.error(
          "Password reset failed:",
          error?.response?.data?.message || error.message
        );
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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

  return {
    formData,
    errors,
    hasTriedSubmit,
    showDialog,
    setShowDialog,
    passwordInputProps,
    handleChange,
    handleValidateAndOpenDialog,
    handleResetConfirmed,
  };
}
