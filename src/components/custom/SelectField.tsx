import { Label } from '../ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: { id: string | number; name: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select',
}) => (
  <div>
    <Label htmlFor={id} className="text-text-muted font-dm-sans font-medium text-[13px] leading-[140%]">
      {label}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={String(option.id)}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);