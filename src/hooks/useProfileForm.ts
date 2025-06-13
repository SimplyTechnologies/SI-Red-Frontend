import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUpdateUser } from "@/api/user/user";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    updateUser({ data: formData });
  };

  return {
    formData,
    errors,
    isEditing,
    handleChange,
    handleSave,
    handleCancel,
    setIsEditing,
  };
}
