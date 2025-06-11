import SigninImage from "./SigninImage";
import SigninForm from "./SigninForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { useAuthStore } from "@/store/authStore";

interface Props {
  variant?: "signin" | "forgot" | "reset";
}

function LoginPage({ variant = "signin" }: Props) {
  const { showForgotPassword } = useAuthStore();

  const renderContent = () => {
    if (variant === "reset") return <ResetPasswordForm />;
    if (variant === "forgot" || showForgotPassword)
      return <ForgotPasswordForm />;
    return (
      <>
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
        <SigninForm />
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center px-4 md:px-10 py-8 md:py-0 bg-white h-auto md:h-full">
        <div className="w-full max-w-md space-y-6">{renderContent()}</div>
      </div>

      <SigninImage />
    </div>
  );
}

export default LoginPage;
