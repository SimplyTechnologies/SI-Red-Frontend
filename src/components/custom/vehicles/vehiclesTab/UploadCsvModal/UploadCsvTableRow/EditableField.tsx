import { Input } from "@/components/ui/input";

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function EditableField({
  value,
  onChange,
  error,
  disabled,
  placeholder,
}: Props) {
  return (
    <div>
      <Input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
      <p
        className={`text-xs text-red-500 mt-1 transition-opacity duration-200 h-[16px] ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error || "⠀"}
      </p>
    </div>
  );
}
