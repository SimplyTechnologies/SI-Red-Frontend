import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { forwardRef } from "react";

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  label: string;
  error?: string;
  disabled?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { id, type, value, onChange, onFocus, onBlur, placeholder, label, error, disabled = false },
    ref
  ) => {
    return (
      <div className="w-full max-w-[450px]">
        <Label
          htmlFor={id}
          className={`block mb-1 mt-7 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 ${
            error ? "text-red-500" : "text-[#192252]"
          }
          `}
        >
          {label}
        </Label>

        <Input
          ref={ref}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-[48px] md:h-[56px] rounded-[8px] border bg-white focus:outline-none transition-colors peer
            ${
              error
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-[#DBDDE1] focus:border-2 focus:border-[#3652E0]"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
