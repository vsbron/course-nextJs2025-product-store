import { Button } from "../ui/button";

function AddToCart({ productId }: { productId: string }) {
  // Returned JSX
  return (
    <Button className="capitalize mt-8" size="lg">
      Add to Cart
    </Button>
  );
}

export default AddToCart;
