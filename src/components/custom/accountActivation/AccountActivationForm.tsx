import { Button } from "@/components/ui/button";
import { InputField } from "./InputField";
import { ACCOUNT_ACTIVATION_INPUTS } from "@/constants/constants";

export default function SigninForm() {
  return (
    <form className="space-y-4">
      {ACCOUNT_ACTIVATION_INPUTS.inputs.map((input) => {
        return (
          <InputField
            key={input.id}
            id={input.id}
            type={input.type}
            label={input.label}
            placeholder={input.placeholder}
          />
        );
      })}

      {/* <div className="h-[10px]">
        {errors.email && (
          <div className="relative -top-[10px] text-red-500 text-[11px] mb-2">{errors.email}</div>
        )}
      </div> */}

    
      {/* <div className="h-[10px]">
        {errors.password && (
          <div className="relative -top-[10px] text-red-500 text-[11px] mb-2">{errors.password}</div>
        )}
        {errors.general && (
          <div className="relative -top-[10px] text-red-500 text-[11px] mb-2">{errors.general}</div>
        )}
      </div> */}

      <Button
        type="submit"
        className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
        // disabled={isLoading}
      >
        Sign Up
        {/* {isLoading ? "Signing in..." : "Sign in"} */}
      </Button>
    </form>
  );
}
