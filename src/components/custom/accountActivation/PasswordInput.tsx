import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputField } from "./InputField";
import { Check, X, Circle } from "lucide-react";
import { passwordRules } from "@/constants/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { FormData } from "./AccountActivationForm";
import type { makeActivationInputProps } from "@/utils/makeActivationInputProps";

type Props = {
  formData: FormData;
  inputProps: ReturnType<typeof makeActivationInputProps>;
  hasTriedSubmit: boolean;
};

const PasswordInput = ({ inputProps, formData, hasTriedSubmit }: Props) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Popover open={isPasswordFocused}>
      <PopoverTrigger asChild>
        <InputField
          {...inputProps}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px]  bg-[#2E2A61] text-white mt-2 p-3 rounded-lg shadow-lg z-50 space-y-2 border-none"
        side={isMobile ? "top" : "right"}
        align={isMobile ? "end" : "start"}
        alignOffset={-8}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {passwordRules.map((rule, index) => {
          const passed = rule.test(formData.password);
          const showRed =
            hasTriedSubmit && !passed && formData.password.length > 0;

          const icon = passed ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : showRed ? (
            <X className="w-4 h-4 text-red-400" />
          ) : (
            <Circle className="w-4 h-4 text-white" />
          );

          return (
            <div
              key={index}
              className={`flex items-center gap-2  ${
                showRed
                  ? "text-red-400"
                  : passed
                  ? "text-green-400"
                  : "text-white"
              }`}
            >
              {icon}
              <span className="text-sm sm:text-xs md:text-sm">
                {rule.label}
              </span>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default PasswordInput;
