import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useSignIn } from "../../api/authentication/authentication";
import type { SignInRequest } from "../../api/schemas";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginPage() {
  const { email, password, setEmail, setPassword, reset } = useAuthStore();
  const [checked, setChecked] = useState<CheckedState>(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const { mutate: signIn, status } = useSignIn({
    mutation: {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        reset();
        navigate("/"); // Redirect to the dashboard
      },
      onError: (error: any) => {
        setError(error?.response?.data?.message || "Login failed");
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
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Form Section */}
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center px-4 md:px-10 py-8 md:py-0 bg-white h-auto md:h-full">
        <div className="w-full max-w-md space-y-6">
          <h1
            className="font-bold text-2xl md:text-[36px] leading-[1.2] font-dm-sans"
            style={{
              maxWidth: "269px",
              letterSpacing: "0px",
              textTransform: "none",
              color: "#192252",
            }}
          >
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <div className="mb-2 w-full max-w-[450px]">
              <Label
                htmlFor="email"
                className={
                  "block mb-1 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 " +
                  (email.length > 0 ? "text-[#192252]" : "text-[#636777]")
                }
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full h-[48px] md:h-[56px] rounded-[8px]
                  border border-[#DBDDE1] bg-[#FFFFFF]
                  focus:border-2 focus:border-[#3652E0] focus:outline-none
                  transition-colors
                  peer
                "
              />
            </div>
            <div className="mb-2 w-full max-w-[450px]">
              <Label
                htmlFor="password"
                className={
                  "block mb-1 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 " +
                  (password.length > 0 ? "text-[#192252]" : "text-[#636777]")
                }
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full h-[48px] md:h-[56px] rounded-[8px]
                  border border-[#DBDDE1] bg-[#FFFFFF]
                  focus:border-2 focus:border-[#3652E0] focus:outline-none
                  transition-colors
                  peer
                "
              />
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
        </div>
      </div>
      {/* Image Section */}
      <div className="w-full md:w-[50%] h-full flex justify-center items-center bg-white">
        <img
          src="/auto.png"
          alt="Car Image"
          className="w-full h-full object-cover"
          style={{
            display: "block",
            margin: 0,
            padding: 0,
            objectPosition: "right",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;