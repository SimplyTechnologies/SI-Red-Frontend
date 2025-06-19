import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
}

export function MakeModelField({ value, onChange, error, disabled }: Props) {
  return (
    <div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
        disabled={disabled}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
