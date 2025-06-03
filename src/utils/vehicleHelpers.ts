import VehicleAvatarInstock from "@/assets/icons/vehicleAvatarInstock.svg?react";
import VehicleAvatarSold from "@/assets/icons/vehicleAvatarSold.svg?react";
import LikeIcon from "@/assets/icons/like.svg?react";
import UnLikeIcon from "@/assets/icons/unLike.svg?react";

export function getVehicleStatusIcon(status: string) {
  return status.toLowerCase() === "In Stock" ? VehicleAvatarInstock : VehicleAvatarSold;
}

export function getLikeIcon(liked: boolean) {
  return liked ? LikeIcon : UnLikeIcon;
}
