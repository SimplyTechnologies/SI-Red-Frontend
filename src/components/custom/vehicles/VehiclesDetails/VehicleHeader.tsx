import BackIcon from "@/assets/icons/back.svg?react";
import ActionMenu from "@/components/layout/ActionMenu/ActionMenu";
import { USER_ROLE, VEHICLES_TABS } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import Roles from "@/lib/roles";

export default function VehicleHeader() {
  const navigate = useNavigate();
  const role = Roles();
  const { setSelectedVehicle, setActiveTab } = useVehiclesStore((s) => ({
    setSelectedVehicle: s.setSelectedVehicle,
    setActiveTab: s.setActiveTab,
  }));

  const backToVehicles = () => {
    navigate("/vehicles");
    setSelectedVehicle(null);
    setActiveTab(VEHICLES_TABS.VEHICLES);
  };

  return (
    <div className="flex justify-between">
      <BackIcon onClick={backToVehicles} className="cursor-pointer" />
      {role === USER_ROLE.SUPER_ADMIN ? <ActionMenu /> : ''}
    </div>
  );
}
