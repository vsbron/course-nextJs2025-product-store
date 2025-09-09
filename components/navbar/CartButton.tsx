import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

import { Button } from "@/components/ui/button";

function CartButton() {
  // Temp
  const itemsInCart = 9;

  // Returned JSX
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart className="w-6 h-6" />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {itemsInCart}
        </span>
      </Link>
    </Button>
  );
}

export default CartButton;
