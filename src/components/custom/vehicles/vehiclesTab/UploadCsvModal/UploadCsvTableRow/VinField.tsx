import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  isFetching: boolean;
  exists: boolean;
}

export function VinField({
  value,
  onChange,
  error,
  isFetching,
  exists,
}: Props) {
  const shortVin = value.length > 0 && value.length < 17;

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={shortVin || error ? "border-red-500" : ""}
        disabled={isFetching}
      />
      {shortVin && (
        <p className="text-xs text-red-500 mt-1">
          VIN must be exactly 17 characters long
        </p>
      )}
      {exists && <p className="text-xs text-red-500 mt-1">VIN already exist</p>}
      {!shortVin && error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
