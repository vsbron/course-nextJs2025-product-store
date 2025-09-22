import { Cart } from "@prisma/client";

import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { createOrderAction } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";

function CartTotals({ cart }: { cart: Cart }) {
  // Destructure some cart values
  const { cartTotal, shipping, tax, orderTotal } = cart;

  // Returned JSX
  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="Subtotal" amount={cartTotal} />
        <CartTotalRow label="Shipping" amount={shipping} />
        <CartTotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-4">
          <CartTotalRow
            label="Order total:"
            amount={orderTotal}
            lastRow={true}
          />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="Place order" className="w-full mt-6" />
      </FormContainer>
    </div>
  );
}

// Helper component for table row
function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-0.5" />}
    </>
  );
}

export default CartTotals;
