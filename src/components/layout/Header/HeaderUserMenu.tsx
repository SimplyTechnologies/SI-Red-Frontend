import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Profile from "@/assets/icons/profile.svg?react";
import Logout from "@/assets/icons/logout.svg?react";
import userDefaultPhoto from "@/assets/photos/userDefaultPhoto.png";
import { useAuthStore } from "@/store/authStore";

export default function HeaderUserMenu() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={userDefaultPhoto} alt="User" />
          <AvatarFallback>U</AvatarFallback>
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
