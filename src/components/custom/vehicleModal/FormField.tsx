import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
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
        className="h-11 rounded-md border text-sm w-full"
      />
    </div>
  );
}
