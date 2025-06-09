import { useCreateVehicle } from "@/api/vehicle/vehicle";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateVehicleMutation = (onSuccessClose: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useCreateVehicle({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Vehicle added",
          description: "Vehicle added successfully.",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        onSuccessClose();
      },
      onError: (error: any) => {
        if (error.status !== 400) {
          toast({
            title: "Error",
            description:
              error.status === 409
                ? "VIN already exists"
                : "Failed to add vehicle. Please try again.",
            variant: "destructive",
          });
        }
      },
    },
  });
};
