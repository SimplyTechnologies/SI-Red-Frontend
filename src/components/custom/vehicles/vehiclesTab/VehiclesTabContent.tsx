import { TabsContent } from "@/components/ui/tabs";
import { VEHICLES_TABS } from "@/constants/constants";
import VehiclesList from "../VehiclesList";
import EmptyVehicles from "../EmptyVehicles";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useVehiclesWithStore } from "@/hooks/useVehiclesWithStore";
import VehiclesTabListSkeleton from "./VehiclesTabListSkeleton";

export default function VehiclesTabContent() {
  const { vehicles } = useVehiclesStore();
  const { isLoading } = useVehiclesWithStore();

  return (
    <>
      {isLoading ? (
        <VehiclesTabListSkeleton />
      ) : (
        <TabsContent
          value={VEHICLES_TABS.VEHICLES}
          className="h-full overflow-auto"
        >
          {vehicles.length ? <VehiclesList /> : <EmptyVehicles />}
        </TabsContent>
      )}
    </>
  );
}
