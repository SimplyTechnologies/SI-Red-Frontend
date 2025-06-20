import { NavLink } from "react-router-dom";
import { useSidebarStore } from "@/store/useSidebarStore";
import { cn } from "@/lib/utils";

import Dashboard from "@/assets/icons/dashboard.svg?react";
import DashboardActive from "@/assets/icons/dashboardActive.svg?react";
import DashboardActiveExpanded from "@/assets/icons/dashboardActiveExpanded.svg?react";
import Vehicles from "@/assets/icons/vehicles.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Customers from "@/assets/icons/customers.svg?react";

import Tooltip from "@/components/tooltip";
import { useAuthStore } from "@/store/authStore";
import { USER_ROLE } from "@/constants/constants";

const navItems = [
  { label: "Dashboard", icon: Dashboard, to: "/" },
  { label: "Vehicles", icon: Vehicles, to: "/vehicles" },
  { label: "Users", icon: Users, to: "/users" },
  { label: "Customers", icon: Customers, to: "/customers" },
];

export default function SidebarContent() {
  const { isExpanded, closeMobileSidebar, isMobileSidebarOpen } =
    useSidebarStore();

  const { role } = useAuthStore();
  const filteredNavItems = navItems.filter((item) => {
    if (item.label === "Users" && role !== USER_ROLE.SUPER_ADMIN) {
      return false;
    }
    return true;
  });

  return (
    <nav className="flex flex-col space-y-1 mt-4">
      {filteredNavItems.map(({ label, icon: Icon, to }) => (
        <NavLink
          key={label}
          to={to}
          onClick={closeMobileSidebar}
          className={({ isActive }) =>
            cn(
              "group relative flex items-center rounded-2xl transition-all",
              isExpanded
                ? "gap-3 px-[1vw] py-[1vh] w-[16vw] h-[46px] hover:bg-sidebar-active-expanded"
                : "justify-center h-[46px] w-[5vw] mx-auto hover:bg-sidebar-active-collapsed",
              isActive && isExpanded ? "bg-sidebar-active-expanded" : "",
              isActive && !isExpanded ? "bg-sidebar-active-collapsed" : "",
              isActive ? "text-primary font-medium" : "",
              isMobileSidebarOpen ? "min-w-[220px]" : ""
            )
          }
        >
          {({ isActive }) => (
            <>
              {label === "Dashboard" && isActive ? (
                isExpanded ? (
                  <DashboardActiveExpanded />
                ) : (
                  <DashboardActive />
                )
              ) : (
                <Icon
                  className={cn(
                    "w-[24px] h-[24px] text-white ",
                    isActive && !isExpanded ? "fill-white " : "",
                    !isActive && isExpanded ? "text-[#403c89]" : "",
                    isActive && isExpanded
                      ? "fill-[#403c89] text-[#403c89]"
                      : ""
                  )}
                />
              )}

              {isExpanded && (
                <span className="text-sm text-text-muted">{label}</span>
              )}
              {!isExpanded && <Tooltip label={label} className="ml-8" />}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
