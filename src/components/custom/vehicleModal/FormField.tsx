import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearFieldError } from "@/utils/validateField";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onBlur?: () => void; 
}

export default function FormField({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
  onBlur,
  setFieldErrors
}: Props) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-xs text-muted-foreground mb-1 block">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={() => clearFieldError(id, setFieldErrors)}
        className="h-11 rounded-md border text-sm w-full"
      />
    </div>
  );
}
