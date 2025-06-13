import { Separator } from "@/components/ui/separator";
import { ProfileHeader } from "@/components/custom/account/ProfileHeader";
import { ProfileActions } from "@/components/custom/account/ProfileActions";
import { ProfileForm } from "@/components/custom/account/ProfileForm";
import { useProfileForm } from "@/hooks/useProfileForm";

export function ProfileSection() {
  const {
    formData,
    errors,
    isEditing,
    handleChange,
    handleSave,
    handleCancel,
    setIsEditing,
  } = useProfileForm();

  return (
    <>
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
    </>
  );
}
