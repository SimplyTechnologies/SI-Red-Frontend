import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import DownloadIcon from '@/assets/icons/download.svg?react';
import { VEHICLES_TABS } from '@/constants/constants';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useToast } from '@/hooks/use-toast';
import { useVehicleFilters } from '@/store/useVehicleFilters';

export default function VehiclesTabList() {
    const { setActiveTab, search, downloadVehiclesCsv, isDownloadingCsv } = useVehiclesStore();
    const { make, model, availability, hasAppliedFilters } = useVehicleFilters();
    const filters = {
        make: Array.isArray(make) ? make.join(',') : make,
        model: Array.isArray(model) ? model.join(',') : model,
        availability,
        };
        
    const { toast } = useToast();

    const handleDownload = async () => {
        try {
            await downloadVehiclesCsv(search, filters);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Download failed",
                description: "Could not download vehicles data. Please try again."
            });
        }
    };

    return (
        <>
            <TabsList className="w-full md:w-2/3 p-0 bg-background justify-between border-b rounded-none">
                {search || hasAppliedFilters ? 
                    <TabsTrigger
                        key={VEHICLES_TABS.VEHICLES}
                        value={VEHICLES_TABS.VEHICLES}
                        onClick={() => {}}
                        className="rounded-none cursor-default h-full font-normal data-[state=active]:shadow-none pb-[10px] border-b-[3px] border-transparent data-[state=active]:border-sidebar-collapsed data-[state=active]:text-sidebar-collapsed data-[state=active]:font-bold"
                        >
                            {VEHICLES_TABS.VEHICLES}
                    </TabsTrigger> :
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
            }
                <button 
                    onClick={handleDownload} 
                    disabled={isDownloadingCsv}
                    className="mr-14"
                >
                    <DownloadIcon 
                        className={`cursor-pointer hover:opacity-80 ${
                            isDownloadingCsv ? 'opacity-50' : ''
                        }`}
                    />
                </button>
            </TabsList>
        </>
    );
}