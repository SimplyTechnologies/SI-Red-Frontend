import AccountActivationImage from "../components/custom/accountActivation/AccountActivationImage.tsx";
import AccountActivationForm from "../components/custom/accountActivation/AccountActivationForm.tsx";

function AccountActivation() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center px-4 md:px-10 py-8 md:py-0 bg-white h-auto md:h-full">
        <div className="w-full max-w-md space-y-6">
          <h1 className="font-bold max-w-[269px] tracking-[0px] normal-case text-[#192252] text-2xl md:text-[30px] leading-[1.2] font-dm-sans">
            Account Activation
          </h1>
          <AccountActivationForm />
        </div>
      </div>

      <AccountActivationImage />
    </div>
  );
}

export default AccountActivation;
