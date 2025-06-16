import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface Option {
  id: string;
  name: string;
}

interface MultiSelectWithTagsProps {
  label: string;
  placeholder: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function MultiSelectWithTags({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: MultiSelectWithTagsProps) {
  const [open, setOpen] = useState(false);

  const isAllSelected = value.length === options.length;

  const handleToggle = (id: string) => {
    if (disabled) return;
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const handleSelectAll = () => {
    if (disabled) return;
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(options.map((opt) => opt.id));
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          if (!disabled) {
            setOpen(nextOpen);
          }
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={`w-full min-h-[48px] flex items-center flex-wrap gap-2 border border-[#DBDDE1] px-3 py-2 rounded-md cursor-pointer bg-white
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          >
            {value.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                {placeholder}
              </span>
            ) : (
              <>
                {options
                  .filter((opt) => value.includes(opt.id))
                  .slice(0, 2)
                  .map((opt) => (
                    <Badge
                      key={opt.id}
                      variant="secondary"
                      className="flex items-center gap-1 text-xs"
                    >
                      {opt.name}
                      {!disabled && (
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(opt.id);
                          }}
                        />
                      )}
                    </Badge>
                  ))}
                {value.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{value.length - 2} more
                  </Badge>
                )}
              </>
            )}
            <ChevronDown className="ml-auto w-4 h-4 text-muted-foreground" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0 rounded-md shadow-lg bg-white">
          <Command>
            <CommandInput
              placeholder="Search..."
              className="border-b p-2"
              disabled={disabled}
            />
            <CommandEmpty className="p-2 text-sm text-muted-foreground">
              No results found.
            </CommandEmpty>
            <CommandGroup className="p-1">
              <CommandItem
                onSelect={handleSelectAll}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition"
                disabled={disabled}
              >
                <span>(Select All)</span>
                {isAllSelected && <Check className="w-4 h-4 text-primary" />}
              </CommandItem>

              {options.map((opt) => (
                <CommandItem
                  key={opt.id}
                  onSelect={() => handleToggle(opt.id)}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition"
                  disabled={disabled}
                >
                  <span>{opt.name}</span>
                  {value.includes(opt.id) && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
