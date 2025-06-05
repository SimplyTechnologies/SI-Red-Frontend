import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputField } from "./InputField";
import { useAuthStore } from "@/store/authStore";
import { useSignIn } from "@/api/authentication/authentication";
import type { SignInRequest } from "@/api/schemas";
import type { CheckedState } from "@radix-ui/react-checkbox";

export default function SigninForm() {
  const { email, password, setEmail, setPassword, reset } = useAuthStore();
  const [checked, setChecked] = useState<CheckedState>(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const { mutate: signIn, status } = useSignIn({
    mutation: {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        reset();
        navigate("/");
      },
      onError: (error: any) => {
        const newErrors: typeof errors = {};

        if (Array.isArray(error?.data?.errors)) {
          error.data.errors.forEach((err: any) => {
            if (err.path === "email") newErrors.email = err.msg;
            if (err.path === "password") newErrors.password = err.msg;
          });
        }
        if (error?.message === "Incorrect email or password") {
          newErrors.general = "Incorrect email or password";
        }

        setErrors(newErrors);
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload: SignInRequest = {
      email,
      password,
      rememberMe: checked === true,
    };

    signIn({ data: payload });
  };

  const isLoading = status === "pending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="email"
        type="email"
        label="Email address"
        placeholder="example@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email || errors.general}
      />
      <div className="h-[10px]">
        {errors.email && (
          <div className="relative -top-[10px] text-red-500 text-[11px] mb-2">{errors.email}</div>
        )}
      </div>

      <InputField
        id="password"
        type="password"
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password || errors.general}
      />
      <div className="h-[10px]">
        {errors.password && (
          <div className="relative -top-[10px] text-red-500 text-[11px] mb-2">{errors.password}</div>
        )}
        {errors.general && (
          <div className="relative -top-[10px] text-red-500 text-[11px] mb-2">{errors.general}</div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={checked}
            onCheckedChange={setChecked}
            className="data-[state=checked]:bg-[#403C89] data-[state=checked]:border-[#403C89] border-[#403C89] bg-[#fff]"
          />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <a
          href="#"
          className="font-medium text-[14px] leading-[1.4] text-[#403C89] underline"
        >
          Forgot password
        </a>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#3E368E] hover:bg-[#2F2B6A]"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
