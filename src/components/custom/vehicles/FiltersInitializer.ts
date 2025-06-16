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

    const make = searchParams.get("make");
    const availability = searchParams.get("availability");
    const models = searchParams.getAll("model");
    const search = searchParams.get("search");

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
