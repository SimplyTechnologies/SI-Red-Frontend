import { Button } from "@/components/ui/button";
import { useVehicleStore } from "@/store/useVehicleStore";

export function AddNewVehicleButton() {
  const { setAddNewVehicleModalOpen } = useVehicleStore();
  return (
    <Button
      onClick={() => setAddNewVehicleModalOpen(true)}
      className="px-6 sm:px-8 md:px-[32px] h-12 md:h-[56px] w-full sm:w-[120px] md:w-[132px] "
    >
      <span className="text-lg sm:text-[17px] md:text-[18px] font-semibold">
        + Add
      </span>
    </Button>
  );
}
