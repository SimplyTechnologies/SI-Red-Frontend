import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyToken } from "@/api/user/user";
import AccountActivationImage from "../components/custom/accountActivation/AccountActivationImage";
import AccountActivationForm from "../components/custom/accountActivation/AccountActivationForm";
import AlreadyVerifiedScreen from "./AlreadyVerifiedScreen";
import ExpiredLinkScreen from "@/components/custom/signin/ResetPasswordForm/ExpiredLinkScreen";

export default function AccountActivation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<
    "loading" | "valid" | "expired" | "alreadyVerified"
  >("loading");
  const [userInfo, setUserInfo] = useState<{
    email: string;
    name: string;
  } | null>(null);

  const { refetch } = useVerifyToken(
    { token: token || "" },
    {
      query: {
        enabled: false,
        retry: false,
      },
    }
  );

  useEffect(() => {
    if (!token) {
      setStatus("expired");
      return;
    }

    refetch().then((res) => {
      const data = res.data;
      if (!data) {
        setStatus("expired");
        return;
      }

      if (data.tokenExpired) {
        setStatus("expired");
      } else if (data.isVerified) {
        setStatus("alreadyVerified");
      } else {
        setUserInfo({
          email: data.email ?? "",
          name: data.name ?? "",
        });
        setStatus("valid");
      }
    });
  }, [token]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center px-4 md:px-10 py-8 md:py-0 bg-white h-auto md:h-full">
        <div className="w-full max-w-md space-y-6">
          {status === "valid" && userInfo && (
            <>
              <h1 className="font-bold max-w-[269px] tracking-[0px] normal-case text-[#192252] text-2xl md:text-[30px] leading-[1.2] font-dm-sans">
                Account Activation
              </h1>
              <AccountActivationForm userInfo={userInfo} />
            </>
          )}
          {status === "alreadyVerified" && <AlreadyVerifiedScreen />}
          {status === "expired" && <ExpiredLinkScreen />}
        </div>
      </div>
      <AccountActivationImage />
    </div>
  );
}
