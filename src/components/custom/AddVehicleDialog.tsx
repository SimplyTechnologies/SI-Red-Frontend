import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useEffect, useRef, useState } from 'react';
import { useVehicleStore } from '../../store/useVehicleStore';

export function AddVehicleDialog() {
  const {
    make,
    model,
    year,
    vin,
    location,
    street,
    city,
    state,
    country,
    zip,
    makes,
    models,
    isLoadingModels,
    isLoadingVin,
    error,
    setMake,
    setModel,
    setYear,
    setVin,
    setLocation,
    setStreet,
    setCity,
    setState,
    setCountry,
    setZip,
    fetchMakes,
    fetchModels,
    decodeVin,
  } = useVehicleStore();

  const vinRef = useRef<HTMLInputElement>(null);
  const [vinError, setVinError] = useState('');
  const [vinDecoded, setVinDecoded] = useState(false);

  useEffect(() => {
    fetchMakes();
    setTimeout(() => vinRef.current?.focus(), 300);
  }, [fetchMakes]);

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trim();
    setVin(value);

    if (value.length < 17) {
      setVinError('VIN must be 17 characters.');
      setVinDecoded(false);
    } else {
      setVinError('');
      decodeVin(value);
      setVinDecoded(true);
    }
  };

  const handleMakeChange = (value: string) => {
    if (vinDecoded) {
      setModel('');
      setYear('');
    }
    setMake(value);
    fetchModels(value);
  };

  const handleModelChange = (value: string) => {
    if (vinDecoded) {
      setMake('');
      setYear('');
    }
    setModel(value);
  };

  const handleYearChange = (value: string) => {
    if (vinDecoded) {
      setMake('');
      setModel('');
    }
    setYear(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year || vin.length !== 17 || error) {
      alert('Please fill all required fields.');
      return;
    }
    alert('Vehicle added successfully!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#3E368E] hover:bg-[#2F2B6A] text-white font-semibold text-sm py-2 px-4 rounded">
          + Add New Vehicle
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:w-[516px] max-w-[90vw] max-h-[90vh] overflow-y-auto rounded-[16px] p-5">
        {error && (
          <DialogDescription className="text-red-500 text-xs mb-2 font-dm-sans">
            {error}
          </DialogDescription>
        )}

        <DialogHeader className="text-center flex flex-col items-center">
          <DialogTitle className="text-[#192252] text-[24px] font-bold leading-[130%] font-dm-sans">
            Add New Vehicle
          </DialogTitle>
        </DialogHeader>

        <h4 className="text-[#192252] text-[18px] font-bold leading-[140%] mb-1 font-dm-sans">
          General
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                className="text-[#636777] text-[12px] font-medium font-dm-sans"
                htmlFor="make"
              >
                Make
              </Label>
              <Select value={make} onValueChange={handleMakeChange}>
                <SelectTrigger
                  id="make"
                  className="w-full h-[44px] rounded-[8px] border border-[#DBDDE1]"
                >
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((opt) => (
                    <SelectItem key={opt.id} value={String(opt.id)}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                className="text-[#636777] text-[12px] font-medium font-dm-sans"
                htmlFor="model"
              >
                Model
              </Label>
              <Select
                value={model}
                onValueChange={handleModelChange}
                disabled={isLoadingModels}
              >
                <SelectTrigger
                  id="model"
                  className="w-full h-[44px] rounded-[8px] border border-[#DBDDE1]"
                >
                  <SelectValue
                    placeholder={
                      isLoadingModels ? 'Loading...' : 'Select model'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {models.map((opt) => (
                    <SelectItem key={opt.id} value={String(opt.id)}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                className="text-[#636777] text-[12px] font-medium font-dm-sans"
                htmlFor="year"
              >
                Year
              </Label>
              <Select value={year} onValueChange={handleYearChange}>
                <SelectTrigger
                  id="year"
                  className="w-full h-[44px] rounded-[8px] border border-[#DBDDE1]"
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 26 }, (_, i) =>
                    (2000 + i).toString()
                  ).map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                className="text-[#636777] text-[12px] font-medium font-dm-sans"
                htmlFor="vin"
              >
                VIN
              </Label>
              <Input
                id="vin"
                ref={vinRef}
                value={vin}
                onChange={handleVinChange}
                placeholder="Enter VIN"
                maxLength={17}
                className="w-full h-[44px] rounded-[8px] border border-[#DBDDE1]"
              />
              {vinError && (
                <div className="text-red-500 text-[11px] mt-1 font-dm-sans">
                  {vinError}
                </div>
              )}
              {isLoadingVin && (
                <div className="text-xs text-gray-500 mt-1 font-dm-sans">
                  Decoding VIN...
                </div>
              )}
            </div>

            {[
              {
                id: 'location',
                label: 'Location',
                value: location,
                setValue: setLocation,
              },
              {
                id: 'street',
                label: 'Street',
                value: street,
                setValue: setStreet,
              },
              {
                id: 'city',
                label: 'City',
                value: city,
                setValue: setCity,
              },
              {
                id: 'state',
                label: 'State',
                value: state,
                setValue: setState,
              },
              {
                id: 'country',
                label: 'Country',
                value: country,
                setValue: setCountry,
              },
              {
                id: 'zip',
                label: 'Zip Code',
                value: zip,
                setValue: setZip,
              },
            ].map(({ id, label, value, setValue }) => (
              <div key={id}>
                <Label
                  className="text-[#636777] text-[12px] font-medium font-dm-sans"
                  htmlFor={id}
                >
                  {label}
                </Label>
                <Input
                  id={id}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-[44px] rounded-[8px] border border-[#DBDDE1]"
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full h-[44px] bg-[#3E368E] hover:bg-[#2F2B6A] text-white text-sm font-semibold rounded-[12px] mt-3 font-dm-sans"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddVehicleDialog;