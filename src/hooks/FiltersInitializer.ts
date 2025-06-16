import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVehicleFilters } from "@/store/useVehicleFilters";
import { useVehiclesStore } from "@/store/useVehiclesStore";

const FiltersInitializer = () => {
  const location = useLocation();
  const { setMake, setModel, setAvailability } = useVehicleFilters();
  const { setSearch } = useVehiclesStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const { make, availability, search, models } = {
      make: searchParams.get("make"),
      availability: searchParams.get("availability"),
      search: searchParams.get("search"),
      models: searchParams.getAll("model"),
    };

    if (!make && !availability && models.length === 0) {
      useVehicleFilters.getState().resetFilters();
      return;
    }

    if (make) setMake(make);
    if (availability) setAvailability(availability);
    if (models.length > 0) setModel(models);
    if (search) setSearch(search);
  }, [location.search]);

  return null;
};

export default FiltersInitializer;
