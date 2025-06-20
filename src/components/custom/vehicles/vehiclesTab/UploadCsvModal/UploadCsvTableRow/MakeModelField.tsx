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
