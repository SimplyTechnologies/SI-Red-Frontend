import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSidebarStore } from "@/store/useSidebarStore";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/vehicles": "Vehicles",
  "/users": "Users",
  "/customers": "Customers",
  "/account": "Account",
};

export default function HeaderLeft() {
  const location = useLocation();
  const { toggleMobileSidebar } = useSidebarStore();
  const pageTitle = pageTitles[location.pathname] || "Page";

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleMobileSidebar}
        className="block md:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-sidebar-collapsed" />
      </button>

      <h1 className="text-lg font-semibold text-sidebar-collapsed">
        {pageTitle}
      </h1>
    </div>
  );
}
