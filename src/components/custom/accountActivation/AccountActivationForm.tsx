import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputField } from "./InputField";
import { ACCOUNT_ACTIVATION_INPUTS } from "@/constants/constants";
import { useVerifyToken, useActivateAccount } from "@/api/user/user";

import PasswordInput from "./PasswordInput";
import { makeActivationInputProps } from "@/utils/makeActivationInputProps";

export type FormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function AccountActivationForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");


  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<typeof formData> & { general?: string }
  >({});

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const { data } = useVerifyToken({
    token: token || "",
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        email: data.email,
        name: data.name,
      }));
    }
  }, [data]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const activateMutation = useActivateAccount();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    activateMutation.mutate(
      {
        data: {
          ...formData,
          token: token!,
        },
      },
      {
        onSuccess: (response) => {
          window.location.href = response.redirectUrl;
        },
        onError: (err: any) => {
          const newErrors: typeof errors = {};

          const backendErrors = err?.data?.errors;

          if (Array.isArray(backendErrors)) {
            backendErrors.forEach((error: { msg: string; path: string }) => {
              const field = error.path as keyof typeof formData;
              if (!newErrors[field]) {
                newErrors[field] = error.msg;
              }
            });
          } else if (err?.data?.message) {
            newErrors.general = err.data.message;
          } else {
            newErrors.general = "Something went wrong.";
          }

          setErrors(newErrors);
        },
      }
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {ACCOUNT_ACTIVATION_INPUTS.inputs.map((input) => {
        const inputProps = makeActivationInputProps(input, formData, handleChange, errors);

        return input.id === "password" ? (
          <PasswordInput
            key={input.id}
            hasTriedSubmit={hasTriedSubmit}
            formData={formData}
            inputProps={inputProps}
          />
        ) : (
          <InputField key={input.id} {...inputProps} />
        );
      })}

      <Button
        type="submit"
        className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
        disabled={activateMutation.isPending}
      >
        {activateMutation.isPending ? "Activating..." : "Activate"}
      </Button>
    </form>
  );
}
