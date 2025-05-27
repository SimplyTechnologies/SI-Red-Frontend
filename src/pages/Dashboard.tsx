import Map from "@/components/map/Map";
import AnalyticsComponent from "@/components/custom/analyticsComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col p-1">
      <div className="flex justify-end items-center">
        <Button className="bg-sidebar-collapsed hover:bg-sidebar-active-collapsed h-[45px] w-[200px] mr-[0.6%] mt-[0.5%]">
          <Plus className="w-4 h-4 mr-2" />
          Add New Vehicle
        </Button>
      </div>
      <AnalyticsComponent />
      <div>
        <Map
          className="flex justify-center w-full"
          style={{ width: "85%", height: "58vh" }}
        />
      </div>
    </div>
  );
}
