import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import type { Ref } from "react";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  inputRef?: Ref<HTMLInputElement>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: () => void
}

export default function FormField({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
  inputRef,
  error,
  onBlur,
  onChange
}: Props) {
  return (
    <div className={clsx("flex flex-col gap-[1px]", className)}>
      <Label htmlFor={id} className="text-xs text-heading mb-[5px]">
        {label}
      </Label>
      <Input
        ref={inputRef}
        id={id}
        type={type}
        placeholder={placeholder}
        className={clsx(
          "h-11 rounded-md border text-sm placeholder:text-[#858C98]",
          error ? "border-red-500" : "border-border"
        )}
        onBlur={onBlur}
        onChange={onChange}
      />
      <div className="h-[14px]">
        {error && <p className="text-[11px] text-red-500 ml-1">{error}</p>}
      </div>
    </div>
  );
}
