import { useRef, useState } from "react";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  submitLabel?: string;
}

export default function Form({ onSubmit, submitLabel = "Save" }: Props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = firstNameRef.current?.value.trim() || "";
    const lastName = lastNameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";

    const newErrors: typeof errors = {};
    if (!firstName) newErrors.firstName = "Enter the first name.";
    if (!lastName) newErrors.lastName = "Enter the last name.";
    if (!email) newErrors.email = "Enter the email address.";
    if (!phone) {
      newErrors.phone = "Enter the phone number.";
    } else if (!/^\+?\d[\d\s\-]{7,}$/i.test(phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ firstName, lastName, email, phone });
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
        id="phone"
        label="Phone Number"
        placeholder="+1-XXX-XXX-XXXX"
        type="tel"
        inputRef={phoneRef}
        error={errors.phone}
      />

      <FormField
        id="email"
        label="Mail"
        placeholder="Enter Mail"
        type="email"
        inputRef={emailRef}
        error={errors.email}
      />

      <Button
        type="submit"
        className="w-full h-12 rounded-md bg-sidebar-collapsed text-white hover:bg-[#2f2e78]"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
