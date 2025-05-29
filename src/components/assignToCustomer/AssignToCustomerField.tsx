import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
}

export default function AssignToCustomerField({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
}: Props) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm text-heading text-text-muted">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-12 rounded-md border border-border text-sm placeholder:text-[#858C98]"
      />
    </div>
  );
}
