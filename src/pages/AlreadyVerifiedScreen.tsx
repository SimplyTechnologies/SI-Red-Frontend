import VerifiedIcon from "@/assets/icons/already-verified.svg?react";
import { useEffect } from "react";
export default function AlreadyVerifiedScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col  justify-center    h-screen px-4">
      <VerifiedIcon className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-[36px] font-bold text-[#192252] mb-2">
        Account Already Activated
      </h2>
      <h3 className="text-[36px] font-normal text-[#192252] mb-2">Hold on!</h3>
      <p className="text-gray-600 mb-6">
        You’re being redirected to another page...
      </p>
    </div>
  );
}
