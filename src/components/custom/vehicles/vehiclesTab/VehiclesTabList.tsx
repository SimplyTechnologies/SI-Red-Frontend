import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadIcon from '@/assets/icons/download.svg?react';
import { VEHICLES_TABS } from "@/constants/constants";

export default function VehiclesTabList() {
  return (
    <TabsList className="w-full md:w-2/3 p-0 bg-background justify-between border-b rounded-none ">
                <div>
                    {VEHICLES_TABS.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={`rounded-none h-full font-normal data-[state=active]:shadow-none pb-[10px]  border-b-[3px] border-transparent data-[state=active]:border-sidebar-collapsed data-[state=active]:text-sidebar-collapsed data-[state=active]:font-bold`}
                        >
                            <p className="text-[16px]">{tab.name}</p>
                        </TabsTrigger>
                    ))}
                </div>

                <DownloadIcon className="mr-14" />
            </TabsList>
  )
}
