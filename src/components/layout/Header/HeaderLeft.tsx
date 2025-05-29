import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSidebarStore } from "@/store/useSidebarStore";
import MenuLineHorizontal from "@/assets/icons/menu-line-horizontal.svg?react";

import AssignToCustomerDialog from "@/components/assignToCustomer/AssignToCustomerDialog";
import { useState } from "react";

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

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleMobileSidebar}
        className="block md:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-sidebar-collapsed" />
      </button>

      <MenuLineHorizontal />
      <h1 className="text-lg font-semibold text-sidebar-collapsed">
        {pageTitle}
      </h1>

      {/* TODO: move to assign to customer when details will be ready. Temprory modal button */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm"
      >
        Assign
      </button>

      <AssignToCustomerDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
