import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { AddVehicleDialog } from "@/components/custom/AddVehicleDialog";
import { useVehicleStore } from "@/store/useVehicleModalStore";
import { Toaster } from "@/components/ui/toaster";
import { useVehiclesWithStore } from "@/hooks/useVehiclesWithStore";
import { VEHICLE_DIALOG_TITLE } from "@/constants/constants";

export default function Layout() {
  useVehiclesWithStore();
  const { setAddNewVehicleModalOpen, isAddNewVehicleModalOpened } =
    useVehicleStore();
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <Header />
        <main className="flex-1 overflow-auto p-0 bg-main-bg">
          <Outlet />
        </main>
      </div>

      <AddVehicleDialog
        title={VEHICLE_DIALOG_TITLE.ADD}
        open={isAddNewVehicleModalOpened}
        onOpenChange={setAddNewVehicleModalOpen} //TODO: we can use store instead of using props here
      ></AddVehicleDialog>

      <Toaster />
    </div>
  );
}
