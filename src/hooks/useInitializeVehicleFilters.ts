import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useVehicleFilters } from "@/store/useVehicleFilters";

export const useInitializeVehicleFilters = () => {
  const location = useLocation();
  const { setMake, setModel, setAvailability, setHasAppliedFilters } = useVehicleFilters();

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
};
