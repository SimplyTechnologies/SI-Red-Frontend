import { useRef, useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadIcon from "@/assets/icons/download.svg?react";
import ExportIcon from "@/assets/icons/export.svg?react";
import { VEHICLES_TABS } from "@/constants/constants";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useToast } from "@/hooks/use-toast";
import UploadCsvModal from "./UploadCsvModal/UploadCsvModal";
import { Loader2 } from "lucide-react";
import { useVehicleFilters } from "@/store/useVehicleFilters";
import Tooltip from "@/components/tooltip";

export default function VehiclesTabList() {
  const { setActiveTab, search, downloadVehiclesCsv, isDownloadingCsv } =
    useVehiclesStore();
  const { toast } = useToast();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { make, model, availability, hasAppliedFilters } = useVehicleFilters();
  const filters = {
    make: Array.isArray(make) ? make.join(",") : make,
    model: Array.isArray(model) ? model.join(",") : model,
    availability,
  };

  const handleDownload = async () => {
    try {
      await downloadVehiclesCsv(search, filters);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Could not download vehicles data. Please try again.",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploadModalOpen(true);
    }
  };
  return (
    <>
      <TabsList className="w-full md:w-2/3 p-0 bg-background justify-between border-b rounded-none">
        {search || hasAppliedFilters ? (
          <TabsTrigger
            key={VEHICLES_TABS.VEHICLES}
            value={VEHICLES_TABS.VEHICLES}
            onClick={() => {}}
            className="rounded-none cursor-default h-full font-normal data-[state=active]:shadow-none pb-[10px] border-b-[3px] border-transparent data-[state=active]:border-sidebar-collapsed data-[state=active]:text-sidebar-collapsed data-[state=active]:font-bold"
          >
            {VEHICLES_TABS.VEHICLES}
          </TabsTrigger>
        ) : (
          <>
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
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </>
        )}

        <UploadCsvModal
          open={isUploadModalOpen && !isUploadingCsv}
          onOpenChange={(open) => {
            setIsUploadModalOpen(open);
            if (!open) setUploadedFile(null);
          }}
          file={uploadedFile}
          isUploadingCsv={isUploadingCsv}
          setIsUploadingCsv={setIsUploadingCsv}
        />
        <button onClick={handleDownload} disabled={isDownloadingCsv}>
          <Tooltip label="Export" variant="reversed" side="bottom">
            <DownloadIcon
              className={`cursor-pointer hover:opacity-80 ${
                isDownloadingCsv ? "opacity-50" : ""
              }`}
            />
          </Tooltip>
        </button>
        <button>
          {isUploadingCsv ? (
            <Loader2 className="animate-spin w-[21px] h-[21px] text-[#AFAFAF] cursor-default" />
          ) : (
            <Tooltip label="Import" variant="reversed" side="bottom">
              <ExportIcon
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer hover:opacity-80 w-[21px] h-[21px]"
              />
            </Tooltip>
          )}
        </button>
      </TabsList>
    </>
  );
}
