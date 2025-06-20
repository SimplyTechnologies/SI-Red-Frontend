import { useRef, useState, useEffect } from "react";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import AsyncAutocompleteField from "./AsyncAutocompleteField";
import {
  validateUserField,
  clearUserFieldError,
} from "@/utils/validations/validateUserField";

interface Props {
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) => void;
  submitLabel?: string;
  externalErrors?: Record<string, string>;
  emailAutocomplete?: boolean;
}

export default function Form({
  onSubmit,
  submitLabel = "Save",
  externalErrors = {},
  emailAutocomplete = false,
}: Props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  }>({});

  useEffect(() => {
    const hasExternal =
      externalErrors && Object.keys(externalErrors).length > 0;
    if (
      hasExternal &&
      JSON.stringify(errors) !== JSON.stringify(externalErrors)
    ) {
      setErrors(externalErrors);
    }
  }, [externalErrors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = firstNameRef.current?.value.trim() || "";
    const lastName = lastNameRef.current?.value.trim() || "";
    const phoneNumber = phoneRef.current?.value.trim() || "";
    const resolvedEmail = emailAutocomplete
      ? email.trim()
      : emailRef.current?.value.trim() || "";

    setErrors({});
    onSubmit({
      firstName,
      lastName,
      email: resolvedEmail,
      phoneNumber,
    });
  };

  const isFormValid = () => {
    const requiredFields = [
      firstNameRef.current?.value.trim(),
      lastNameRef.current?.value.trim(),
      phoneRef.current?.value.trim(),
      emailAutocomplete ? email.trim() : emailRef.current?.value.trim(),
    ];

    const hasEmptyField = requiredFields.some((val) => !val);
    const hasErrors = Object.keys(errors).length > 0;

    return !hasEmptyField && !hasErrors;
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-4">
        <FormField
          id="firstName"
          label="First Name"
          placeholder="Enter Name"
          className="flex-1"
          inputRef={firstNameRef}
          error={errors.firstName}
          onBlur={(e) =>
            validateUserField("firstName", e.target.value, setErrors)
          }
          onChange={() => clearUserFieldError("firstName", setErrors)}
        />
        <FormField
          id="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          className="flex-1"
          inputRef={lastNameRef}
          error={errors.lastName}
          onBlur={(e) =>
            validateUserField("lastName", e.target.value, setErrors)
          }
          onChange={() => clearUserFieldError("lastName", setErrors)}
        />
      </div>

      <FormField
        id="phoneNumber"
        label="Phone Number"
        placeholder="+1XXXXXXXXXX"
        type="tel"
        inputRef={phoneRef}
        error={errors.phoneNumber}
        onBlur={(e) =>
          validateUserField("phoneNumber", e.target.value, setErrors)
        }
        onChange={() => clearUserFieldError("phoneNumber", setErrors)}
      />

      {emailAutocomplete ? (
        <AsyncAutocompleteField
          id="email"
          label="Mail"
          placeholder="Enter Mail"
          value={email}
          setValue={(val) => {
            setEmail(val);
            clearUserFieldError("email", setErrors);
          }}
          error={errors.email}
          onCustomerSelect={(customer) => {
            setEmail(customer.email ?? "");
            if (firstNameRef.current)
              firstNameRef.current.value = customer.firstName ?? "";
            clearUserFieldError("firstName", setErrors);
            if (lastNameRef.current)
              lastNameRef.current.value = customer.lastName ?? "";
            clearUserFieldError("lastName", setErrors);
            if (phoneRef.current)
              phoneRef.current.value = customer.phoneNumber ?? "";
            clearUserFieldError("phoneNumber", setErrors);
          }}
          onBlur={() => validateUserField("email", email, setErrors)}
        />
      ) : (
        <FormField
          id="email"
          label="Mail"
          placeholder="Enter Mail"
          type="text"
          inputRef={emailRef}
          error={errors.email}
          onBlur={(e) => validateUserField("email", e.target.value, setErrors)}
          onChange={() => clearUserFieldError("email", setErrors)}
        />
      )}

      <Button
        type="submit"
        className="w-full h-12 rounded-md bg-sidebar-collapsed text-white hover:bg-[#2f2e78]"
        disabled={!isFormValid()}
      >
        {submitLabel}
      </Button>
    </form>
  );
}
