import { useCreateUser, getGetUsersQueryKey } from "@/api/user/user";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateUserWithToast() {
  const { setUserFormOpen } = useUserStore();
  const queryClient = useQueryClient();

  return useCreateUser({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "User created successfully",
          variant: "success",
        });
        setUserFormOpen(false);
        queryClient.invalidateQueries({ queryKey: getGetUsersQueryKey() });
      },
      onError: (error: any) => {
        toast({
          title: "Assignment failed",
          description:
            error.status === 409
              ? "User with this email already exists."
              : "Failed to create user",
          variant: "destructive",
        });
      },
    },
  });
}
