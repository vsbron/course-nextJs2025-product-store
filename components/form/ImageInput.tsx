import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ImageInput() {
  // Setting up the default name for the form input
  const name = "image";

  // Returned JSX
  return (
    <div className="mb-4">
      <Label htmlFor={name} className="mb-2 capitalize">
        Image
      </Label>
      <Input id={name} name={name} type="file" accept="image/*" required />
    </div>
  );
}

export default ImageInput;
