import type { FormData } from "@/components/custom/accountActivation/AccountActivationForm";
import { validateActivationField } from "@/utils/validations/validateActivationField";

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
  errors: Partial<FormData> & { general?: string },
  setErrors: React.Dispatch<
    React.SetStateAction<Partial<FormData> & { general?: string }>
  >
) {
  return {
    id: input.id,
    type: input.type,
    label: input.label,
    placeholder: input.placeholder,
    value: formData[input.id],
    onChange: handleChange,
    onBlur: () =>
      validateActivationField(
        input.id,
        formData[input.id],
        formData,
        setErrors
      ),
    error: errors[input.id],
    disabled: input.id === "name" || input.id === "email",
  };
}
