import { useSidebarStore } from "@/store/useSidebarStore";
import { cn } from "@/lib/utils";

import SidebarContent from "./SidebarContent";

import MainLogoCollapsed from "@/assets/icons/mainLogoCollapsed.svg?react";
import MainLogoExpanded from "@/assets/icons/mainLogoExpanded.svg?react";
import CollapseButton from "@/assets/icons/collapseButton.svg?react";
import ExpandButton from "@/assets/icons/expandButton.svg?react";

export default function SidebarDesktop() {
  const { isExpanded, toggleSidebar } = useSidebarStore();

  const Logo = isExpanded ? MainLogoExpanded : MainLogoCollapsed;
  const CollapseExpandIcon = isExpanded ? CollapseButton : ExpandButton;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col transition-all duration-150 relative",
        isExpanded
          ? "w-[17vw] bg-white"
          : "w-[6vw] bg-sidebar-collapsed min-w-[80px]"
      )}
    >
      <div
        className={cn(
          "h-16 border-b px-4 flex items-center shrink-0",
          isExpanded ? "justify-start" : "justify-center"
        )}
      >
        <Logo className="w-auto h-[42px]" />
      </div>
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute top-4 z-10 rounded-full shadow-md transition-all",
          isExpanded
            ? "right-[4px] bg-sidebar-active-expanded text-sidebar-collapsed"
            : "right-[-9px] bg-white text-sidebar-collapsed"
        )}
      >
        <CollapseExpandIcon />
      </button>
      <SidebarContent />
    </aside>
  );
}
