import { Card } from "@/components/ui/card";
import { FirstColumn, SecondColumn, FourthColumn } from "./CartColumns";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  // Returned JSX
  return (
    <div>
      {cartItems.map(
        ({
          id,
          amount,
          product: { image, name, company, price, id: productId },
        }) => (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        )
      )}
    </div>
  );
}

export default CartItemsList;
