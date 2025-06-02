import AssignToCustomerField from "./AssignToCustomerField";
import { Button } from "@/components/ui/button";

export default function AssignToCustomerForm() {
  return (
    <form className="flex flex-col gap-6 sm:gap-8">
      <AssignToCustomerField
        id="email"
        label="Email"
        placeholder="Enter Email"
        type="email"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <AssignToCustomerField
          id="firstName"
          label="First Name"
          placeholder="Enter Name"
          className="flex-1"
        />
        <AssignToCustomerField
          id="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          className="flex-1"
        />
      </div>

      <AssignToCustomerField
        id="phone"
        label="Phone Number"
        placeholder="+1-XXX-XXX-XXXX"
        type="tel"
      />

      <Button
        type="submit"
        className="w-full h-12 rounded-md bg-sidebar-collapsed text-white hover:bg-[#2f2e78]"
      >
        Submit
      </Button>
    </form>
  );
}
