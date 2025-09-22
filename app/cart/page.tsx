import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";

async function CartPage() {
  // Get the user ID
  const { userId } = await auth();

  // Guard clause
  if (!userId) redirect("/");

  // Get or create cart and then pull it from database
  const prevCart = await fetchOrCreateCart({ userId });
  const cart = await updateCart(prevCart);

  // Guard clause if empty cart
  if (cart.numItemsInCart === 0) return <SectionTitle text="Empty Cart" />;

  // Returned JSX
  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cart.cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={cart} />
        </div>
      </div>
    </>
  );
}

export default CartPage;
