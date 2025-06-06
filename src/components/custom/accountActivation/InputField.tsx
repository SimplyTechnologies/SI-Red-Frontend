import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface InputFieldProps {
  id: string;
  type: string;
  // value: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  // error: string | undefined;
}

export const InputField = ({
  id,
  type,
  // value,
  // onChange,
  placeholder,
  label,
}: // error,
InputFieldProps) => (
  <div className=" w-full max-w-[450px]">
    <Label
      htmlFor={id}
      className={`block mb-1 mt-7 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 ${
        true ? "text-heading" : "text-text-muted" //TODO
      }`}
    >
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      // value={value}
      // onChange={onChange}
      className={`w-full h-[48px]  md:h-[56px] rounded-[8px] border bg-white focus:outline-none transition-colors peer
  `}
    />
  </div>
);

// ${
//   error
//     ? "border-red-500 focus-visible:ring-red-500"
//     : "border-[#DBDDE1] focus:border-2 focus:border-[#3652E0]"
// }
