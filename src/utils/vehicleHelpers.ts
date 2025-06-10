import VehicleAvatarInstock from "@/assets/icons/vehicleAvatarInstock.svg?react";
import VehicleAvatarSold from "@/assets/icons/vehicleAvatarSold.svg?react";
import LikeIcon from "@/assets/icons/like.svg?react";
import UnLikeIcon from "@/assets/icons/unLike.svg?react";
import { VEHICLE_STATUS, type VehicleStatusKey } from "@/constants/constants";

export function getVehicleStatusIcon(status: VehicleStatusKey) {
  return VEHICLE_STATUS[status] === VEHICLE_STATUS["sold"]
    ? VehicleAvatarSold
    : VehicleAvatarInstock;
}

export function getLikeIcon(liked: boolean) {
  return liked ? LikeIcon : UnLikeIcon;
}
