import { useSidebarStore } from "../../../store/useSidebarStore";
import { cn } from "../../../lib/utils";

import SidebarContent from "./SidebarContent";

import MainLogoCollapsed from "../../../assets/icons/mainLogoCollapsed.svg?react";
import MainLogoExpanded from "../../../assets/icons/mainLogoExpanded.svg?react";
import CollapseButton from "../../../assets/icons/collapseButton.svg?react";
import ExpandButton from "../../../assets/icons/expandButton.svg?react"; //TODO: try to resolve problem with @ insteed of using ../../../

export default function SidebarDesktop() {
  const { isExpanded, toggleSidebar } = useSidebarStore();

  const Logo = isExpanded ? MainLogoExpanded : MainLogoCollapsed;
  const CollapseExpandIcon = isExpanded ? CollapseButton : ExpandButton;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-full transition-all duration-300 relative",
        isExpanded ? "w-[250px] bg-white" : "w-[90px] bg-[#403C89]"
      )}
    >
      <div
        className={cn(
          "h-16 border-b px-4 flex items-center",
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
            ? "right-[4px] bg-[#EDF1FE] text-[#403C89]"
            : "right-[-9px] bg-white text-[#403C89]"
        )}
      >
        <CollapseExpandIcon />
      </button>
      <SidebarContent />
    </aside>
  );
}
