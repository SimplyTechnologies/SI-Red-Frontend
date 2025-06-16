import { useDeleteUser } from "@/api/user/user";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function useDeleteUserWithToast(queryKey: any) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useDeleteUser({
    mutation: {
      onSuccess: () => {
        toast({
          title: "User deleted",
          description: "User deleted successfully.",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete user. Please try again.",
          variant: "destructive",
        });
      },
    },
  });
}
