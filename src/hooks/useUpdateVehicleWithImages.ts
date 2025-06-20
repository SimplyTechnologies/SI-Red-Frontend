import { useMutation } from "@tanstack/react-query";
import { customMutator } from "@/lib/api/customMutator";
import type { VehicleInput, VehicleResponse } from "@/api/schemas";
import { useVehicleStore } from "@/store/useVehicleModalStore";
import { useToast } from "@/hooks/use-toast";
import { getGetAnalyticsDataQueryKey } from "@/api/analytics/analytics";
import { useQueryClient } from "@tanstack/react-query";
import { useVehiclesStore } from "@/store/useVehiclesStore";

interface Props {
  id: string;
  data: VehicleInput;
  images: File[];
}

export function useUpdateVehicleWithImages(onSuccessClose: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data, images }: Props): Promise<VehicleResponse> => {
        const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      images.forEach((file) => {
        formData.append("images", file);
      });

      const { getState } = useVehicleStore;
      const deletedImageIds = getState().deletedImageIds;

      if (deletedImageIds.length > 0) {
        formData.append("deletedImageIds", JSON.stringify(deletedImageIds));
      }

      const res = await customMutator({
        url: `/vehicles/upload-vehicle-with-images/${id}`,
        method: "PUT",
        data: formData,
      });
    
      return res as VehicleResponse; 
    },
    onSuccess: (updatedVehicle:VehicleResponse) => {
      useVehiclesStore.getState().setSelectedVehicle(updatedVehicle);

      toast({
        title: "Vehicle added",
        description: "Vehicle was updated successfully.",
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({
        queryKey: getGetAnalyticsDataQueryKey(),
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
  });
}
