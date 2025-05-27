import { NavLink } from "react-router-dom";
import { useSidebarStore } from "@/store/useSidebarStore";
import { cn } from "@/lib/utils";

import Dashboard from "@/assets/icons/dashboard.svg?react";
import Vehicles from "@/assets/icons/vehicles.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Customers from "@/assets/icons/customers.svg?react";

import Tooltip from "@/components/tooltip";

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
              "group relative flex items-center rounded-2xl transition-all",
              isExpanded
                ? "gap-3 px-[1vw] py-[1vh] w-[234px] h-[40px] hover:bg-sidebar-active-expanded"
                : "justify-center h-[46px] w-[74px] mx-auto hover:bg-sidebar-active-collapsed",
              isActive && isExpanded ? "bg-sidebar-active-expanded" : "",
              isActive && !isExpanded ? "bg-sidebar-active-collapsed" : "",
              isActive ? "text-primary font-medium" : ""
            )
          }
        >
          <Icon
            className={cn(
              "w-[24px] h-[24px] stroke-current",
              isExpanded ? "text-sidebar-collapsed" : "text-white"
            )}
          />
          {isExpanded && (
            <span className="text-sm text-text-muted">{label}</span>
          )}
          {!isExpanded && <Tooltip label={label} />}
        </NavLink>
      ))}
    </nav>
  );
}
