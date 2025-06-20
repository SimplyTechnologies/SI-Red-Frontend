import { create } from "zustand";

type SortOrder = 'ASC' | 'DESC' | null;

interface SortInfo {
  sortBy: string | null;
  sortOrder: SortOrder;
}

interface SortState {
  customers: SortInfo;
  users: SortInfo;
  setCustomers: (sort: SortInfo) => void;
  setUsers: (sort: SortInfo) => void;
}

export const useTableSortStore = create<SortState>((set) => ({
  customers: { sortBy: null, sortOrder: null },
  users: { sortBy: null, sortOrder: null },

  setCustomers: (sort) => set({ customers: sort }),
  setUsers: (sort) => set({ users: sort }),
}));
