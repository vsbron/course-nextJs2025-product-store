import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type for the props
type RatingInputType = {
  name: string;
  labelText?: string;
};

// The component
function RatingInput({ name, labelText }: RatingInputType) {
  // Set the array with the grades
  const numbers = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    return value.toString();
  }).reverse();

  // Returned JSX
  return (
    <div className="mb-4 max-w-xs">
      <Label htmlFor={name} className="capitalize mb-2">
        {labelText || name}
      </Label>
      <Select defaultValue={numbers[0]} name={name} required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingInput;
