import { cn } from "@/lib/utils";

interface Props {
  original: string | undefined;
  actual: string | undefined;
  selected: string | undefined;
  onSelect: (value: string | undefined) => void;
}

export function ConflictField({ original, actual, selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => onSelect(original)}
        className={cn(
          "rounded-md border px-2 py-1 text-sm text-left transition-colors",
          selected === original
            ? "border-primary bg-primary/10"
            : "border-muted hover:bg-muted/50"
        )}
      >
        {original} <span className="text-xs text-muted-foreground">(CSV)</span>
      </button>
      <button
        type="button"
        onClick={() => onSelect(actual)}
        className={cn(
          "rounded-md border px-2 py-1 text-sm text-left transition-colors",
          selected === actual
            ? "border-primary bg-primary/10"
            : "border-muted hover:bg-muted/50"
        )}
      >
        {actual} <span className="text-xs text-muted-foreground">(VIN)</span>
      </button>
    </div>
  );
}
