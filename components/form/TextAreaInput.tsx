import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Type for Text Area props
type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  // Returned JSX
  return (
    <div className="mb-4">
      <Label htmlFor={name} className="mb-2 capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        className="leading-loose"
        defaultValue={defaultValue}
        rows={5}
        required
      />
    </div>
  );
}

export default TextAreaInput;
