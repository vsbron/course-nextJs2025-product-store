import { Label } from "../ui/label";
import { Input } from "../ui/input";

// Default name for the form input
const name = "price";

// Type for PriceInput
type PriceInputProps = {
  defaultValue?: number;
};

// The Price Input component
function PriceInput({ defaultValue }: PriceInputProps) {
  // Returned JSX
  return (
    <div className="mb-4">
      <Label htmlFor={name} className="mb-2 capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}

export default PriceInput;
