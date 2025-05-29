import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
}) => (
  <div>
    <Label htmlFor={id} className="text-[#636777] font-dm-sans font-medium text-[13px] leading-[140%]">
      {label}
    </Label>
    <Input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`w-full h-[48px] border border-[#DBDDE1] px-3 rounded-md ${className}`}
    />
  </div>
);