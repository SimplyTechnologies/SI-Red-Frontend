import { NavLink } from "react-router-dom";
import { useSidebarStore } from "../../../store/useSidebarStore";
import { cn } from "../../../lib/utils";

import Dashboard from "../../../assets/icons/dashboard.svg?react";
import Vehicles from "../../../assets/icons/vehicles.svg?react";
import Users from "../../../assets/icons/users.svg?react";
import Customers from "../../../assets/icons/customers.svg?react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: Dashboard, to: "/" },
  { label: "Vehicles", icon: Vehicles, to: "/vehicles" },
  { label: "Users", icon: Users, to: "/users" },
  { label: "Customers", icon: Customers, to: "/customers" },
];

export default function SidebarContent() {
  const { isExpanded, closeMobileSidebar } = useSidebarStore();

  return (
    <nav className="flex flex-col space-y-1 mt-4">
      {navItems.map(({ label, icon: Icon, to }) => (
        <NavLink
          key={label}
          to={to}
          end
          onClick={closeMobileSidebar}
          className={({ isActive }) =>
            cn(
              "group flex items-center rounded-2xl transition-all",
              isExpanded
                ? "gap-3 px-[1vw] py-[1vh] w-[234px] h-[40px] hover:bg-[#EDF1FE]"
                : "justify-center h-[46px] w-[74px] mx-auto hover:bg-[#534f95]",
              isActive && isExpanded ? "bg-[#EDF1FE]" : "",
              isActive && !isExpanded ? "bg-[#534f95]" : "",
              isActive ? "text-primary font-medium" : ""
            )
          }
        >
          <TooltipProvider>
            {!isExpanded ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center items-center">
                    <Icon className="w-[24px] h-[24px]" stroke="#FFFFFF" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Icon className="w-[24px] h-[24px]" stroke="#403C89" />
                <span className="text-sm text-[#636777]">{label}</span>
              </>
            )}
          </TooltipProvider>
        </NavLink>
      ))}
    </nav>
  );
}
