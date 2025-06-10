import { useAuthStore } from "@/store/authStore";

export function ProfileHeader({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const { email } = useAuthStore();

  return (
    <div className="mb-8">
      <h3 className="text-[18px] font-bold text-medium mb-1 text-heading">
        {firstName} {lastName}
      </h3>
      <p className="text-[15px] text-muted-foreground">{email}</p>
    </div>
  );
}
