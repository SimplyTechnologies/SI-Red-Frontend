import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadIcon from "@/assets/icons/download.svg?react";
import ExportIcon from "@/assets/icons/export.svg?react";
import { VEHICLES_TABS } from "@/constants/constants";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import UploadCsvModal from "./UploadCsvModal/UploadCsvModal";

export default function VehiclesTabList() {
  const { setActiveTab, search, downloadVehiclesCsv, isDownloadingCsv } =
    useVehiclesStore();
  const { toast } = useToast();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      await downloadVehiclesCsv(search);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Could not download vehicles data. Please try again.",
      });
    }
  };

  return (
    <>
      {search ? null : (
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

          <div className="flex gap-4 items-center mr-14">
            <button
              onClick={handleDownload}
              disabled={isDownloadingCsv}
              className="disabled:opacity-50"
            >
              <DownloadIcon className="cursor-pointer hover:opacity-80" />
            </button>

            <button onClick={() => setIsUploadModalOpen(true)}>
              <ExportIcon className="cursor-pointer hover:opacity-80" />
            </button>
          </div>
        </TabsList>
      )}

      <UploadCsvModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </>
  );
}
