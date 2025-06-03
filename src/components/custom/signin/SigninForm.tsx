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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: signIn, status } = useSignIn({
    mutation: {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        reset();
        navigate("/");
      },
      onError: (error: any) => {
        const message =
          error?.data?.errors?.[0]?.msg || // from express-validator
          error?.message ||
          "Login failed";

        setError(message);
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <InputField
        id="email"
        type="email"
        label="Email address"
        placeholder="example@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        id="password"
        type="password"
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

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
