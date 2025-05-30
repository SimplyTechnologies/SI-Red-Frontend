import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadIcon from "@/assets/icons/download.svg?react";
import { VEHICLES_TABS } from "@/constants/constants";
import { useVehiclesStore } from "@/store/useVehiclesStore";

export default function VehiclesTabList() {
  const setActiveTab = useVehiclesStore((s) => s.setActiveTab);

  return (
    <TabsList className="w-full md:w-2/3 p-0 bg-background justify-between border-b rounded-none">
      <div>
        {Object.values(VEHICLES_TABS).map((tabLabel) => (
          <TabsTrigger
            key={tabLabel}
            value={tabLabel}
            onClick={() => setActiveTab(tabLabel)}
            className="rounded-none h-full font-normal data-[state=active]:shadow-none pb-[10px] border-b-[3px] border-transparent data-[state=active]:border-sidebar-collapsed data-[state=active]:text-sidebar-collapsed data-[state=active]:font-bold"
          >
            {tabLabel}
          </TabsTrigger>
        ))}
      </div>

      <DownloadIcon className="mr-14" />
    </TabsList>
  );
}
