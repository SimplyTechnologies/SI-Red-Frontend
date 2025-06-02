import SigninImage from "./SigninImage.tsx";
import SigninForm from "./SigninForm.tsx";

function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
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
          <SigninForm />
        </div>
      </div>

      <SigninImage />
    </div>
  );
}

export default LoginPage;
