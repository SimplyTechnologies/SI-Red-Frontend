import { ConflictField } from "../ConflictField";

interface Props {
  original: string;
  actual: string;
  selected: string | undefined;
  onSelect: (val: string | undefined) => void;
}

export function ConflictFieldWrapper({
  original,
  actual,
  selected,
  onSelect,
}: Props) {
  return (
    <ConflictField
      original={original}
      actual={actual}
      selected={selected}
      onSelect={onSelect}
    />
  );
}
