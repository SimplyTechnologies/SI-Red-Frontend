import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  isExpanded: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: true,
      isMobileSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
      toggleMobileSidebar: () =>
        set((state) => ({
          isMobileSidebarOpen: !state.isMobileSidebarOpen,
          isExpanded: true,
        })),
      closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
    }),
    { name: "sidebar-state" }
  )
);
