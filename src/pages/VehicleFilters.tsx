import BackIcon from "@/assets/icons/back.svg?react";
import { Button } from "@/components/ui/button";
import { useVehicleFilters } from "@/store/useVehicleFilters";
import { MultiSelectWithTags } from "@/components/custom/vehicles/MultiselectWithTags";
import { SelectField } from "@/components/custom/SelectField";
import { useGetAllMakes } from "@/api/make/make";
import { useGetAllModelsByMakeId } from "@/api/model/model";
import { availabilityOptions } from "@/constants/constants";
import Map from "@/components/map/Map";
import { useNavigate } from "react-router-dom";

export default function VehicleFilters() {
  const {
    make,
    model,
    availability,
    setMake,
    setModel,
    setAvailability,
    resetFilters,
    setHasAppliedFilters,
  } = useVehicleFilters();
  const { data: makes = [] } = useGetAllMakes();
  const navigate = useNavigate();

  const selectedMakeId = makes.find((item) => item.name === make)?.id;
  const { data: models = [] } = useGetAllModelsByMakeId(selectedMakeId ?? 0);

  const makeOptions = [
    { id: " ", name: "Select make" },
    ...makes.map((make) => ({ id: make.name, name: make.name })),
  ];

  const modelOptions = models.map((model) => ({
    id: model.name,
    name: model.name,
  }));

  const backToVehicles = () => {
    navigate(-1);
  };

  const showSelectedFilters = () => {
    const searchParams = new URLSearchParams();

    if (make) searchParams.append("make", make);
    if (availability) searchParams.append("availability", availability);
    if (model.length > 0) {
      model.forEach((m) => searchParams.append("model", m));
    }

    setHasAppliedFilters(
      (make && make.length > 0) ||
        (model && model.length > 0) ||
        (availability && availability.length > 0)
        ? true
        : false
    );
    navigate(`/vehicles?${searchParams.toString()}`);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (make) count++;
    if (availability) count++;
    if (model.length > 0) count += model.length;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="flex flex-col lg:flex-row md:flex-row h-full">
      <div className="w-full lg:w-3/5 lg:h-full pt-5 px-5 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-heading font-semibold">
            <BackIcon
              className="cursor-pointer mr-2"
              onClick={backToVehicles}
            />
            <h1>Filters</h1>
          </div>
          <Button
            variant="link"
            className="w-max-content font-medium text-sm text-[#534F95] hover:no-underline"
            onClick={() => {
              resetFilters();
              navigate("/filters");
            }}
          >
            Clear all
          </Button>
        </div>

        <div className="mt-6">
          <SelectField
            id="Make"
            label="Make"
            placeholder="Select make"
            value={make ?? ""}
            onChange={(value) => setMake(value === " " ? null : value)}
            options={makeOptions}
          />
        </div>

        <div className="mt-6">
          <MultiSelectWithTags
            label="Model"
            placeholder="Select model"
            value={model}
            onChange={setModel}
            options={modelOptions}
            disabled={!make}
          />
        </div>

        <div className="mt-6">
          <SelectField
            id="Availability"
            label="Availability"
            placeholder="Select vehicle status"
            value={availability ?? ""}
            onChange={(value) => setAvailability(value === " " ? null : value)}
            options={availabilityOptions}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="w-full mb-4" onClick={showSelectedFilters}>
            Apply filters{" "}
            {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
          </Button>
        </div>
      </div>
      <Map className="w-full h-full" />
    </div>
  );
}
