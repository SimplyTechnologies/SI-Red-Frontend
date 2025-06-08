import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useUpdateUser } from "@/api/user/user";
import { ProfileHeader } from "@/components/custom/account/ProfileHeader";
import { ProfileActions } from "@/components/custom/account/ProfileActions";
import { ProfileForm } from "@/components/custom/account/ProfileForm";

export default function Account() {
  const {
    firstName,
    lastName,
    phoneNumber,
    setFirstName,
    setLastName,
    setPhoneNumber,
  } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    phoneNumber,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ firstName, lastName, phoneNumber });
    setErrors({});
  };

  const { mutate: updateUser } = useUpdateUser({
    mutation: {
      onSuccess: (data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setIsEditing(false);
        setErrors({});
      },
      onError: (err: any) => {
        const newErrors: typeof errors = {};

        if (Array.isArray(err?.data?.errors)) {
          err.data.errors.forEach((e: any) => {
            if (e.path in formData) {
              newErrors[e.path as keyof typeof formData] = e.msg;
            }
          });
        }

        setErrors(newErrors);
      },
    },
  });

  const handleSave = () => {
    updateUser({
      data: formData,
    });
  };

  return (
    <div className="p-5 h-[max] w-[max] bg-[#F8F9F9] bg-red">
      <div className="bg-white rounded-[16px] p-7 shadow-sm">
        <h2 className="text-[26px] font-bold text-heading">My Profile</h2>
        <p className="text-[15px] font-normal text-muted-foreground mb-8">
          This information can be edited from your profile page.
        </p>

        <ProfileHeader
          firstName={formData.firstName}
          lastName={formData.lastName}
        />

        <Separator className="mb-4 bg-[#F5F5F7]" />
        <div className="space-y-2 mb-5 w-[max]">
          <ProfileActions
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={handleCancel}
          />
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            onChange={handleChange}
            errors={errors}
          />
        </div>

        <Separator className="mb-4 bg-[#F5F5F7]" />

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-heading text-base font-medium">
            Change Password
            <p className="text-[14px] font-normal text-muted-foreground mb-3">
              Forgot your password, find back in seconds
            </p>
          </h3>

          <Button className="w-[10vw] h-[5vh] min-w-[110px]">
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
}
