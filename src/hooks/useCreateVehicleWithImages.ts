import { useMutation } from "@tanstack/react-query";
import { customMutator } from "@/lib/api/customMutator";
import type { VehicleInput } from "@/api/schemas";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetAnalyticsDataQueryKey } from "@/api/analytics/analytics";

interface Props {
  data: VehicleInput;
  images: File[];
}

export function useCreateVehicleWithImages(onSuccessClose: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, images }: Props) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {        
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      images.forEach((file) => {
        formData.append("images", file);
      });

      return customMutator({
        url: "/vehicles/upload-vehicle-with-images",
        method: "POST",
        data: formData,
        headers: {

        },
      });
    },

    onSuccess: () => {
      toast({
        title: "Vehicle added",
        description: "Vehicle with images was added successfully.",
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
          description: "Failed to add vehicle. Please try again.",
          variant: "destructive",
        });
      }
    },
  });
}
