import { Badge } from "@/components/ui/badge";
import { VEHICLE_STATUS, type VehicleStatusKey } from "@/constants/constants";
import { cn } from "@/lib/utils";

export function getVehicleStatusBadge(status: VehicleStatusKey) {
  const badgeClass = cn(
    VEHICLE_STATUS[status] === VEHICLE_STATUS["sold"]
      ? "bg-[#23A1E9]"
      : "bg-[#0DCF89]"
  );

  return <Badge className={badgeClass}>{VEHICLE_STATUS[status]}</Badge>;
}
