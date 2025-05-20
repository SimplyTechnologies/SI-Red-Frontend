import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../../components/ui/sheet";

import SidebarContent from "./SidebarContent";
import { useSidebarStore } from "../../../store/useSidebarStore";

export default function SidebarMobile() {
  const { isMobileSidebarOpen, toggleMobileSidebar } = useSidebarStore();

  return (
    <Sheet open={isMobileSidebarOpen} onOpenChange={toggleMobileSidebar}>
      <SheetContent side="left" className="p-4 w-[250px]">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Navigation panel
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
