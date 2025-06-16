import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { InputField } from "./InputField";
import { useForgotPassword } from "@/api/authentication/authentication";
import type { ForgotPasswordBody } from "@/api/schemas";

export default function ForgotPasswordForm() {
  const { email, setEmail, setShowForgotPassword } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPasswordMutation = useForgotPassword({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
      },
      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.";
        setError(message);
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    forgotPasswordMutation.mutate({
      data: { email } satisfies ForgotPasswordBody,
    });
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl md:text-[36px] leading-[1.2] font-dm-sans text-[#192252]">
          Forgot Password
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          We’ve just sent an email to{" "}
          <span className="text-[#0dcf89] font-medium">{email}</span>
          <br />
          If the email doesn’t show up soon, check your spam folder.
        </p>
        <Button
          className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
          onClick={() => setShowForgotPassword(false)}
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="font-bold text-2xl md:text-[36px] leading-[1.2] font-dm-sans mb-[50px] text-[#192252]">
        Forgot Password
        <p className="text-[16px] text-gray-500 font-normal mt-[10px]">
          Enter your email account to reset your password
        </p>
      </h2>

      <div className="mb-4">
        <InputField
          id="email"
          type="text"
          label="Your Email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error || ""}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
      >
        Send Reset Link
      </Button>

      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-[#EAEAEA]" />
        <div className="text-center text-[15px] font-medium text-[#192252]">
          Or
        </div>
        <div className="flex-1 h-px bg-[#EAEAEA]" />
      </div>

      <Button
        type="button"
        className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
        onClick={() => setShowForgotPassword(false)}
      >
        Back to Sign In
      </Button>
    </form>
  );
}
