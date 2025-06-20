import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUpdateUser } from "@/api/user/user";
import {
  validateProfileField,
  clearProfileFieldError,
} from "@/utils/validations/validateProfileField";

export function useProfileForm() {
  const {
    firstName,
    lastName,
    phoneNumber,
    setFirstName,
    setLastName,
    setPhoneNumber,
  } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    phoneNumber,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearProfileFieldError(name, setErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateProfileField(name, value, setErrors);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ firstName, lastName, phoneNumber });
    setErrors({});
  };

  const { mutate: updateUser } = useUpdateUser({
    mutation: {
      onSuccess: (data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setIsEditing(false);
        setErrors({});
      },
      onError: (err: any) => {
        const newErrors: typeof errors = {};
        if (Array.isArray(err?.data?.errors)) {
          err.data.errors.forEach((e: any) => {
            if (e.path in formData) {
              newErrors[e.path as keyof typeof formData] = e.msg;
            }
          });
        }
        setErrors(newErrors);
      },
    },
  });

  const handleSave = () => {
    let hasError = false;
    Object.entries(formData).forEach(([name, value]) => {
      validateProfileField(name, value, setErrors);
      if (!value.trim()) hasError = true;
    });

    if (Object.keys(errors).length > 0 || hasError) return;

    updateUser({ data: formData });
  };

  const isSaveDisabled =
    Object.values(errors).length > 0 ||
    Object.values(formData).some((val) => !val.trim());

  return {
    formData,
    errors,
    isEditing,
    handleChange,
    handleBlur,
    handleSave,
    handleCancel,
    setIsEditing,
    isSaveDisabled,
  };
}
