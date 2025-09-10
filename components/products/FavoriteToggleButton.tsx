import { FaHeart } from "react-icons/fa";

import { Button } from "@/components/ui/button";

function FavoriteToggleButton({ productId }: { productId: string }) {
  // Returned JSX
  return (
    <Button size="icon" variant="outline" className="p-2">
      <FaHeart />
    </Button>
  );
}

export default FavoriteToggleButton;
