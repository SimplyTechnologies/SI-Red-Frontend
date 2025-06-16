import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/icons/search.svg?react";
import { ListFilter, ListFilterPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import { useDebounce } from "use-debounce";
import { VEHICLES_TABS } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { useVehicleFilters } from "@/store/useVehicleFilters";

export default function Filter() {
  const setSearch = useVehiclesStore((s) => s.setSearch);
  const setActiveTab = useVehiclesStore((s) => s.setActiveTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { resetFilters, make, model, availability } = useVehicleFilters();
  const hasFilters = make || model || availability;

  useEffect(() => {
    setSearch(debouncedSearch);
    if (debouncedSearch.trim() !== "") {
      setActiveTab(VEHICLES_TABS.VEHICLES);
      const searchParams = new URLSearchParams();
      searchParams.append("search", debouncedSearch);
    }
  }, [debouncedSearch, setSearch, setActiveTab]);

  const showFiltersPage = () => {
    navigate("/filters");
    resetFilters();
  };

  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex items-center h-[42px] w-full border border-gray-300 rounded-[8px] px-2.5 pl-6">
        <SearchIcon className="mr-2 min-w-[16px]" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-0 p-0 text-sm focus-visible:ring-0"
        />
      </div>
      {hasFilters?.length ? (
        <ListFilterPlus
          className="w-5 h-5 cursor-pointer text-heading"
          onClick={showFiltersPage}
        />
      ) : (
        <ListFilter
          className="w-5 h-5 cursor-pointer text-[#AFAFAF]"
          onClick={showFiltersPage}
        />
      )}
    </div>
  );
}
