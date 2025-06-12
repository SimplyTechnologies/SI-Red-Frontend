import { getGetVehicleQueryKey, useUpdateVehicle } from "@/api/vehicle/vehicle";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateVehicleMutation = (onSuccessClose: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useUpdateVehicle({
    mutation: {
      onSuccess: (_data, variables) => {
        const vehicleId = variables.id;
        toast({
          title: "Vehicle updated",
          description: "Vehicle updated successfully.",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: getGetVehicleQueryKey(vehicleId),
        });
        onSuccessClose();
      },
      onError: (error: any) => {
        if (error.status !== 400) {
          toast({
            title: "Error",
            description: "Failed to update vehicle. Please try again.",
            variant: "destructive",
          });
        }
      },
    },
  });
};
