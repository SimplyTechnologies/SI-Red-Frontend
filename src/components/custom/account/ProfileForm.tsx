import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

export default function ProfileForm({
  formData,
  handleChange,
  isEditing,
}: Props) {
  return (
    <div className="space-y-2 mb-5 w-[max]">
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
            onChange={handleChange}
            readOnly={!isEditing}
            className="block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg"
          />
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
            onChange={handleChange}
            readOnly={!isEditing}
            className="block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg"
          />
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
          onChange={handleChange}
          readOnly={!isEditing}
          className="block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
}
