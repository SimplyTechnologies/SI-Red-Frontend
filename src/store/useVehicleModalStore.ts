import { create } from "zustand";
import { getAllMakes } from "../api/make/make";
import { getAllModelsByMakeId } from "../api/model/model";
import { decodeVin as decodeVinApi } from "../api/vin/vin";
import type { MakeInfo } from "../api/schemas/makeInfo";
import type { ModelInfo, ModelResponse } from "../api/schemas";
import type { VinResponse } from "../api/schemas";

interface VehicleState {
  make: MakeInfo | null;
  model: ModelResponse | ModelInfo | null;
  year: string;
  vin: string;
  location: string;
  locationDescription: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  isAddNewVehicleModalOpened: boolean;
  prefillLatLng: { lat: number; lng: number } | null;

  // Data lists
  makes: MakeInfo[];
  models: ModelResponse[];

  // Status flags
  isLoadingModels: boolean;
  isLoadingVin: boolean;
  error: string;

  // Setters
  setMake: (make: MakeInfo | null) => void;
  setModel: (model: ModelResponse | ModelInfo | null) => void;
  setYear: (year: string) => void;
  setVin: (vin: string) => void;
  setLocation: (location: string) => void;
  setLocationDescription: (locationDescription: string) => void;
  setStreet: (street: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setCountry: (country: string) => void;
  setZip: (zip: string) => void;
  setAddNewVehicleModalOpen: (isAddNewVehicleModalOpened: boolean) => void;
  prefillLatLngLocation: (lat: number, lng: number) => void;
  clearPrefillLatLng: () => void;

  // Async actions
  fetchMakes: () => Promise<void>;
  fetchModels: (makeId: number) => Promise<ModelResponse[]>;
  decodeVin: (vin: string) => Promise<VinResponse | null>;
  images: File[];
  setImages: (files: File[]) => void;

  deletedImageIds: string[];
  setDeletedImageIds: (ids: string[] | ((prev: string[]) => string[])) => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  // Initial form state
  make: null,
  model: null,
  year: "",
  vin: "",
  location: "",
  locationDescription: "",
  street: "",
  city: "",
  state: "",
  country: "",
  zip: "",
  isAddNewVehicleModalOpened: false,
  prefillLatLng: null,

  // Data lists
  makes: [],
  models: [],
  images: [],
  deletedImageIds: [],

  // Status
  isLoadingModels: false,
  isLoadingVin: false,
  error: "",

  // Setters
  setImages: (files) => set({ images: files }),
  setDeletedImageIds: (ids) =>
    set((state) => ({
      deletedImageIds:
        typeof ids === "function" ? ids(state.deletedImageIds) : ids,
    })),
  setMake: (make) => set({ make }),
  setModel: (model) => set({ model }),
  setYear: (year) => set({ year }),
  setVin: (vin) => set({ vin }),
  setLocation: (location) => set({ location }),
  setLocationDescription: (locationDescription) => set({ locationDescription }),
  setStreet: (street) => set({ street }),
  setCity: (city) => set({ city }),
  setState: (state) => set({ state }),
  setCountry: (country) => set({ country }),
  setZip: (zip) => set({ zip }),
  setAddNewVehicleModalOpen: (isAddNewVehicleModalOpened) => {
    if (!isAddNewVehicleModalOpened) {
      set({
        make: null,
        model: null,
        year: "",
        vin: "",
        location: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        prefillLatLng: null
      });
    }

    set({ isAddNewVehicleModalOpened });
  },
  prefillLatLngLocation: (lat, lng) =>
    set({
      prefillLatLng: { lat, lng },
      location: "",
    }),
  clearPrefillLatLng: () => set({ prefillLatLng: null }),

  // Fetch list of makes
  fetchMakes: async () => {
    try {
      const makes: MakeInfo[] = await getAllMakes();
      set({ makes });
    } catch (error) {
      console.error("Failed to fetch makes:", error);
      set({ error: "Failed to load makes data." });
    }
  },

  // Fetch list of models for a given make
  fetchModels: async (makeId: number) => {
    set({ isLoadingModels: true });
    try {
      const models: ModelResponse[] = await getAllModelsByMakeId(makeId);
      set({ models }); // Update the state with the fetched models
      return models; // Return the fetched models
    } catch (error) {
      console.error("Failed to fetch models:", error);
      set({ error: "Failed to load models data." });
      return []; // Return an empty array in case of an error
    } finally {
      set({ isLoadingModels: false });
    }
  },

  // Decode VIN (returns result only — does not mutate state directly)
  decodeVin: async (vin: string) => {
    set({ isLoadingVin: true });
    try {
      const vinData: VinResponse = await decodeVinApi({ vin });
      return vinData;
    } catch (error) {
      console.error("Failed to decode VIN:", error);
      return null;
    } finally {
      set({ isLoadingVin: false });
    }
  },
}));
