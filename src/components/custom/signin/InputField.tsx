import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
}

export const InputField = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
}: InputFieldProps) => (
  <div className="mb-2 w-full max-w-[450px]">
    <Label
      htmlFor={id}
      className={`block mb-1 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 ${
        value ? "text-heading" : "text-text-muted"
      }`}
    >
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-[48px] md:h-[56px] rounded-[8px] border border-[#DBDDE1] bg-white focus:border-2 focus:border-[#3652E0] focus:outline-none transition-colors peer"
    />
  </div>
);
