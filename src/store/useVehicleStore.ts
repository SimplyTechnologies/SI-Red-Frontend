import create from 'zustand';
import axios from 'axios';

interface VehicleState {
  make: string;
  model: string;
  year: string;
  vin: string;
  location: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  makes: { id: string; name: string }[];
  models: { id: string; name: string }[];
  isLoadingModels: boolean;
  isLoadingVin: boolean;
  error: string;
  setMake: (make: string) => void;
  setModel: (model: string) => void;
  setYear: (year: string) => void;
  setVin: (vin: string) => void;
  setLocation: (location: string) => void;
  setStreet: (street: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setCountry: (country: string) => void;
  setZip: (zip: string) => void;
  fetchMakes: () => Promise<void>;
  fetchModels: (makeId: string) => Promise<void>;
  decodeVin: (vin: string) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  make: '',
  model: '',
  year: '',
  vin: '',
  location: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zip: '',
  makes: [],
  models: [],
  isLoadingModels: false,
  isLoadingVin: false,
  error: '',
  setMake: (make) => set({ make }),
  setModel: (model) => set({ model }),
  setYear: (year) => set({ year }),
  setVin: (vin) => set({ vin }),
  setLocation: (location) => set({ location }),
  setStreet: (street) => set({ street }),
  setCity: (city) => set({ city }),
  setState: (state) => set({ state }),
  setCountry: (country) => set({ country }),
  setZip: (zip) => set({ zip }),
  fetchMakes: async () => {
    try {
      const res = await axios.get('/makes');
      set({ makes: res.data });
    } catch {
      set({ error: 'Failed to load makes data.' });
    }
  },
  fetchModels: async (makeId) => {
    set({ isLoadingModels: true });
    try {
      const res = await axios.get(`/models/bymake/${makeId}`);
      set({ models: res.data });
    } catch {
      set({ error: 'Failed to load models data.' });
    } finally {
      set({ isLoadingModels: false });
    }
  },
  decodeVin: async (vin) => {
    set({ isLoadingVin: true });
    try {
      const res = await axios.get(`/vin?vin=${vin}`);
      const { make, model, year } = res.data;
      const matchedMake = get().makes.find((m) => m.name.toLowerCase() === make.toLowerCase());
      if (matchedMake) {
        set({ make: matchedMake.id, year });
        await get().fetchModels(matchedMake.id);
        const matchedModel = get().models.find(
          (m) => m.name.toLowerCase().trim() === model.toLowerCase().trim()
        );
        if (matchedModel) {
          set({ model: matchedModel.id });
        } else {
          set({ model: '', error: 'Model not found from VIN' });
        }
      } else {
        set({ make: '', model: '', error: 'Make not found from VIN' });
      }
    } catch {
      set({ error: 'Failed to decode VIN' });
    } finally {
      set({ isLoadingVin: false });
    }
  },
}));