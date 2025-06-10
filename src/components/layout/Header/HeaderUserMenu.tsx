import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";

import Profile from "@/assets/icons/profile.svg?react";
import Logout from "@/assets/icons/logout.svg?react";
import { useAuthStore } from "@/store/authStore";
import { getFirstLttersAvatar } from "@/utils/getFirstLttersAvatar";

export default function HeaderUserMenu() {
  const { logout, firstName, lastName } = useAuthStore();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer bg-[#3E368E] text-white font-bold font-sans rounded-full w-9 h-9 text-sm">
          <div className="flex justify-center items-center w-full rounded-full">
            {getFirstLttersAvatar(firstName, lastName)}
          </div>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigate("/account")}
          className="hover:bg-userMenu-hover cursor-pointer group"
        >
          <Profile className="mr-2 w-5 h-5 stroke-icon-default group-hover:stroke-icon-hover" />{" "}
          My Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            logout();
            navigate("/signin");
          }}
          className="hover:bg-userMenu-hover cursor-pointer group"
        >
          <Logout className="mr-2 w-5 h-5 stroke-icon-default group-hover:stroke-icon-hover" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
