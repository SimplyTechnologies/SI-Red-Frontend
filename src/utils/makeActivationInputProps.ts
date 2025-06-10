import type { FormData } from "@/components/custom/accountActivation/AccountActivationForm";

type ActivationInput = {
  id: keyof FormData;
  type: string;
  label: string;
  placeholder: string;
};

export function makeActivationInputProps(
  input: ActivationInput,
  formData: FormData,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: Partial<FormData> & { general?: string }
) {
  return {
    id: input.id,
    type: input.type,
    label: input.label,
    placeholder: input.placeholder,
    value: formData[input.id],
    onChange: handleChange,
    error: errors[input.id],
    disabled: input.id === "name" || input.id === "email",
  };
}
