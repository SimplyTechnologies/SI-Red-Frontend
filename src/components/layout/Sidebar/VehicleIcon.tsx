import VehiclesExpanded from "@/assets/icons/vehicles_expanded.svg?react";
import VehiclesCollapsed from "@/assets/icons/vehicles_collapsed.svg?react";
import Vehicles from "@/assets/icons/vehicles.svg?react";

type Props = {
  isActive: boolean;
  isExpanded: boolean;
};

export default function VehicleIcon({ isActive, isExpanded }: Props) {
  if (isExpanded && !isActive) {
    return <Vehicles className="w-[24px] h-[24px] text-[#403c89]" />;
  } else if (!isExpanded && isActive) {
    return <VehiclesCollapsed className="w-[24px] h-[24px]" />;
  } else if (isActive && isExpanded) {
    return <VehiclesExpanded className="w-[24px] h-[24px]" />;
  } else {
    return <Vehicles className="w-[24px] h-[24px] text-white" />;
  }
}
