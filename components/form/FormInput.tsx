import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Type fo Form Input
type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

// The Form Input component
function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputProps) {
  // Returned JSX
  return (
    <div className="mb-4">
      <Label htmlFor={name} className="mb-2 capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default FormInput;
