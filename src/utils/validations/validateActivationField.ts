import type { FormData } from "@/components/custom/accountActivation/AccountActivationForm";
import { passwordRules } from "@/constants/constants";

export function isActivationDisabled(
  formData: FormData,
  errors: Partial<FormData> & { general?: string }
): boolean {
  const hasEmptyRequiredFields =
    !formData.password || !formData.confirmPassword;

  const hasErrors = Object.values(errors).some(Boolean);

  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(formData.password)
  );
  const isConfirmPasswordValid = formData.confirmPassword === formData.password;

  return (
    hasEmptyRequiredFields ||
    hasErrors ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  );
}

export function validateActivationField(
  name: keyof FormData,
  value: string,
  formData: FormData,
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>
) {
  const setError = (msg: string) =>
    setErrors((prev) => ({ ...prev, [name]: msg }));

  const clearError = () =>
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });

  switch (name) {
    case "email":
      if (!value.trim()) setError("Email is required.");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        setError("Enter a valid email.");
      else clearError();
      break;

    case "name":
      if (!value.trim()) setError("Name is required.");
      else if (value.trim().length < 2)
        setError("Name must be at least 2 characters.");
      else clearError();
      break;

    case "password":
      const failedRule = passwordRules.find((rule) => !rule.test(value));
      if (!value.trim()) setError("Password is required.");
      else if (failedRule) setError(failedRule.label);
      else clearError();
      break;

    case "confirmPassword":
      if (!value.trim()) setError("Confirm Password is required.");
      else if (value !== formData.password) setError("Passwords do not match.");
      else clearError();
      break;

    default:
      break;
  }
}

export function clearActivationFieldError(
  name: keyof FormData,
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>
) {
  setErrors((prev) => {
    const { [name]: _, ...rest } = prev;
    return rest;
  });
}
