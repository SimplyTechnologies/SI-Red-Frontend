import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileFormError } from "./ProfileFormError";

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

interface Props {
  formData: FormData;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<keyof FormData, string>>;
}

export function ProfileForm({ formData, isEditing, onChange, errors }: Props) {
  const inputClass =
    "block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 w-[42vw]">
        <div>
          <Label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-[#636777]"
          >
            First Name
          </Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            readOnly={!isEditing}
            className={inputClass}
          />
          <ProfileFormError data={errors.firstName}></ProfileFormError>
        </div>

        <div>
          <Label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-[#636777]"
          >
            Last Name
          </Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            readOnly={!isEditing}
            className={inputClass}
          />
          <ProfileFormError data={errors.lastName}></ProfileFormError>
        </div>
      </div>

      <div className="mt-3 w-[42vw]">
        <Label
          htmlFor="phoneNumber"
          className="block mb-2 text-sm font-medium text-[#636777]"
        >
          Phone Number
        </Label>
        <Input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          readOnly={!isEditing}
          className={inputClass}
        />
        <ProfileFormError data={errors.phoneNumber}></ProfileFormError>
      </div>
    </>
  );
}
