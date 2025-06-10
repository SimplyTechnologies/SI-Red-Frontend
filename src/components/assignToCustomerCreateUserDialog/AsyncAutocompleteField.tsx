import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSuggestCustomers } from "@/api/customer/customer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import type { CustomerResponse } from "@/api/schemas";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
  error?: string;
  onCustomerSelect: (customer: CustomerResponse) => void;
}

export default function AsyncAutocompleteField({
  id,
  label,
  placeholder,
  value,
  setValue,
  error,
  onCustomerSelect,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedValue] = useDebounce(value, 300);

  const { data = [] } = useSuggestCustomers(
    { email: debouncedValue },
    {
      query: {
        enabled: debouncedValue.length > 1,
      },
    }
  );

  const handleSelect = (customer: CustomerResponse) => {
    setValue(customer.email ?? "");
    onCustomerSelect(customer);
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col gap-[1px]">
      <Label
        htmlFor={id}
        className="text-xs text-heading mb-[5px]"
      >
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          placeholder={placeholder}
          className={clsx(
            "h-11 w-full rounded-md border text-sm placeholder:text-[#858C98]",
            error ? "border-red-500" : "border-border"
          )}
        />

        {isFocused && data.length > 0 && (
          <ul className="absolute left-0 top-full w-full bg-white border rounded-md shadow text-sm max-h-40 overflow-y-auto z-10">
            {data.map((customer) => (
              <li
                key={customer.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelect(customer)}
              >
                {customer.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p
        className={clsx(
          "text-[11px] ml-1 transition-all duration-200",
          error ? "text-red-500 h-[14px]" : "invisible h-[14px]"
        )}
      >
        {error ?? "placeholder"}
      </p>
    </div>
  );
}
