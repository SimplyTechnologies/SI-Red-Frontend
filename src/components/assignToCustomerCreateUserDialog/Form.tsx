import { useRef, useState, useEffect } from "react";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AsyncAutocompleteField from "./AsyncAutocompleteField";
import clsx from "clsx";
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
    documents?: File[];
  }) => void;
  submitLabel?: string;
  externalErrors?: Record<string, string>;
  emailAutocomplete?: boolean;
  showUploadField?: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  documents?: string;
}

export default function Form({
  onSubmit,
  submitLabel = "Save",
  externalErrors = {},
  emailAutocomplete = false,
  showUploadField = false,
}: Props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const hasExternal = Object.keys(externalErrors).length > 0;
    if (
      hasExternal &&
      JSON.stringify(errors) !== JSON.stringify(externalErrors)
    ) {
      setErrors(externalErrors);
    }
  }, [externalErrors]);

  const validateFile = (file: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Only PDF, JPEG, and PNG are allowed.";
    }

    if (file.size > maxSize) {
      return "File size should be less than 5MB.";
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newDocuments: File[] = [];
    let validationError: string | null = null;

    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        validationError = error;
        break;
      }
      newDocuments.push(file);
    }

    if (validationError) {
      setErrors((prev) => ({ ...prev, documents: validationError }));
      return;
    }

    setDocuments((prev) => [...prev, ...newDocuments]);
    setErrors((prev) => ({ ...prev, documents: undefined }));
  };

  const removeFile = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
    if (documents.length === 1) {
      setErrors((prev) => ({ ...prev, documents: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resolvedEmail = emailAutocomplete
      ? email.trim()
      : emailRef.current?.value.trim() || "";

    setErrors({});
    onSubmit({
      firstName,
      lastName,
      email: resolvedEmail,
      phoneNumber,
      documents,
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
          placeholder="Enter First Name"
          className="flex-1"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
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
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={errors.phoneNumber}
        onBlur={(e) =>
          validateUserField("phoneNumber", e.target.value, setErrors)
        }
        onChange={() => clearUserFieldError("phoneNumber", setErrors)}
      />

      {emailAutocomplete ? (
        <AsyncAutocompleteField
          id="email"
          label="Email"
          placeholder="Enter Email"
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
          label="Email"
          placeholder="Enter Email"
          type="text"
          inputRef={emailRef}
          error={errors.email}
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          onBlur={(e) => validateUserField("email", e.target.value, setErrors)}
          onChange={() => clearUserFieldError("email", setErrors)}
        />
      )}

      {showUploadField && (
        <div className="flex flex-col gap-[1px]">
          <Label
            htmlFor="documents"
            className="text-xs text-heading text-text-muted mb-[5px]"
          >
            Documents
          </Label>
          <div
            className={clsx(
              "min-h-[44px] rounded-md border border-input bg-background",
              errors.documents && "border-destructive"
            )}
          >
            <div className="flex items-center h-11 px-3">
              <Input
                id="documents"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Label
                htmlFor="documents"
                className="flex items-center gap-2 cursor-pointer hover:text-accent-foreground"
              >
                <Upload className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text-muted">
                  Upload Documents
                </span>
              </Label>
            </div>

            {documents.length > 0 && (
              <div className="px-3 py-2 border-t border-input">
                {documents.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-sm truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-muted"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4 text-text-muted" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.documents && (
            <p className="text-[11px] text-destructive ml-1 h-[14px]">
              {errors.documents}
            </p>
          )}
        </div>
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
