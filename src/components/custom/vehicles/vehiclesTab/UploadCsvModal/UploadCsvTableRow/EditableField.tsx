import { Input } from "@/components/ui/input";

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function EditableField({ value, onChange, error, disabled }: Props) {
  return (
    <div>
      <Input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
