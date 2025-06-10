import { useState } from "react";
import { InputField } from "./InputField";
import { Button } from "@/components/ui/button";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resetting password:", password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="font-bold text-2xl md:text-[36px] leading-[1.2] font-dm-sans text-[#192252] mb-[20px]">
        Reset Password
      </h2>

      <InputField
        id="password"
        type="password"
        label="New Password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={""}
      />

      <InputField
        id="confirmPassword"
        type="password"
        label="Confirm New Password"
        placeholder="Enter Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={""}
      />

      <Button
        type="submit"
        className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
      >
        Reset Password
      </Button>
    </form>
  );
}
