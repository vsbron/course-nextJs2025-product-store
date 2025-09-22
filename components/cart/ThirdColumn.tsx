"use client";
import { useState } from "react";
import { toast } from "sonner";

import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";

function ThirdColumn({ id, quantity }: { id: string; quantity: number }) {
  // Create state value for product amount
  const [amount, setAmount] = useState(quantity);

  // Helper function for updating the amount
  const handleAmountChange = async (value: number) => {
    setAmount(value);
  };

  // Returned JSX
  return (
    <div className="md:ml-8 flex flex-col gap-4">
      <div>
        <SelectProductAmount
          amount={amount}
          setAmount={handleAmountChange}
          mode={Mode.CartItem}
          isLoading={false}
        />
      </div>
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mr-4" text="Remove" />
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;
