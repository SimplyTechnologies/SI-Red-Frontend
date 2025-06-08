import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "Jacqueline",
    lastName: "Morton",
    phoneNumber: "+1-484-569-1202",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: "Jacqueline",
      lastName: "Morton",
      phoneNumber: "+1-484-569-1202",
    });
  };

  return (
    <div className="p-10 h-[max] w-[max] bg-red">
      <h2 className="text-[26px] font-bold text-heading">My Profile</h2>
      <p className="text-[15px] font-normal text-muted-foreground mb-8">
        This information can be edited from your profile page.
      </p>

      <div className="mb-8">
        <h3 className="text-[16px] font-bold text-medium mb-1 text-heading">
          Jacqueline Morton
        </h3>
        <p className="text-[15px] text-muted-foreground">
          jac.morton@gmail.com
        </p>
      </div>

      <Separator className="mb-4 bg-[#F5F5F7]" />
      <div className="space-y-2 mb-5 w-[max]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-heading text-[18px] font-bold">
            Personal Information
          </h2>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                className="w-[10vw] h-[5vh] mr-5 min-w-[110px]"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="w-[10vw] h-[5vh] min-w-[110px]"
                onClick={() => setIsEditing(false)}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              className="w-[10vw] h-[5vh] min-w-[110px]"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

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
              className="block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              className="block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
            className="block h-[6vh] w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <Separator className="mb-4 bg-[#F5F5F7]" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-heading text-base font-medium">
          Change Password
          <p className="text-sm text-muted-foreground mb-3">
            Forgot your password, find back in seconds
          </p>
        </h3>

        <Button className="w-[10vw] h-[5vh] min-w-[110px]">
          Reset Password
        </Button>
      </div>
    </div>
  );
}
