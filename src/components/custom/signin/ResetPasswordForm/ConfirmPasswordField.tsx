import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  error?: string;
  hasTriedSubmit: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void; 
}

export default function ConfirmPasswordField({
  value,
  error,
  hasTriedSubmit,
  onChange,
  onBlur
}: Props) {
  return (
    <div className="w-full max-w-[450px]">
      <Label
        htmlFor="confirmPassword"
        className={`block mb-1 mt-7 text-left font-medium text-[14px] leading-[1.4] font-dm-sans ${
          hasTriedSubmit && error ? "text-red-500" : "text-[#192252]"
        }`}
      >
        Confirm New Password
      </Label>

      <Input
        id="confirmPassword"
        type="password"
        placeholder="Enter Password"
        value={value}
        onChange={onChange}
        onBlur={onBlur} 
        className={`w-full h-[48px] md:h-[56px] rounded-[8px] border bg-white transition-colors ${
          hasTriedSubmit && error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-[#DBDDE1] focus:border-[#3652E0]"
        }`}
      />

      <div className="h-[16px] mt-1">
        <p
          className={`text-xs text-red-500 transition-opacity duration-200 ${
            hasTriedSubmit && error ? "opacity-100" : "opacity-0"
          }`}
        >
          {error || "⠀"}
        </p>
      </div>
    </div>
  );
}
