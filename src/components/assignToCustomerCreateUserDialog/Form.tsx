import { useRef, useState, useEffect } from "react";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import AsyncAutocompleteField from "./AsyncAutocompleteField";

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
        />
        <FormField
          id="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          className="flex-1"
          inputRef={lastNameRef}
          error={errors.lastName}
        />
      </div>

      <FormField
        id="phoneNumber"
        label="Phone Number"
        placeholder="+1XXXXXXXXXX"
        type="tel"
        inputRef={phoneRef}
        error={errors.phoneNumber}
      />

      {emailAutocomplete ? (
        <AsyncAutocompleteField
          id="email"
          label="Mail"
          placeholder="Enter Mail"
          value={email}
          setValue={setEmail}
          error={errors.email}
          onCustomerSelect={(customer) => {
            setEmail(customer.email ?? "");
            if (firstNameRef.current)
              firstNameRef.current.value = customer.firstName ?? "";
            if (lastNameRef.current)
              lastNameRef.current.value = customer.lastName ?? "";
            if (phoneRef.current)
              phoneRef.current.value = customer.phoneNumber ?? "";
          }}
        />
      ) : (
        <FormField
          id="email"
          label="Mail"
          placeholder="Enter Mail"
          type="text"
          inputRef={emailRef}
          error={errors.email}
        />
      )}

      <Button
        type="submit"
        className="w-full h-12 rounded-md bg-sidebar-collapsed text-white hover:bg-[#2f2e78]"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
