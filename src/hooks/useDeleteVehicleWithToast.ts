import { useToast } from "./use-toast";
import { useDeleteVehicle } from "@/api/vehicle/vehicle";
import { useNavigate } from "react-router-dom";

export default function useDeleteVehicleWithToast() {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useDeleteVehicle({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Vehicle deleted",
          description: "Vehicle deleted successfully.",
          variant: "success",
        });
        navigate("/vehicles");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete vehicle. Please try again.",
          variant: "destructive",
        });
      },
    },
  });
}
