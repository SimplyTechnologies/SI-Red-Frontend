import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVehicleFilters } from "@/store/useVehicleFilters";
import { useVehiclesStore } from "@/store/useVehiclesStore";

const FiltersInitializer = () => {
  const location = useLocation();
  const { setMake, setModel, setAvailability, setHasAppliedFilters } = useVehicleFilters();
  const { setSearch } = useVehiclesStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const hasFiltersInUrl =
      searchParams.has("make") ||
      searchParams.has("availability") ||
      searchParams.has("model");

    if (hasFiltersInUrl) {
      setHasAppliedFilters(true);
      const make = searchParams.get("make");
      const availability = searchParams.get("availability");
      const models = searchParams.getAll("model");

      if (make) setMake(make);
      if (availability) setAvailability(availability);
      if (models.length > 0) setModel(models);
    }
  }, [location.search]);

  return null;
};

export default FiltersInitializer;
