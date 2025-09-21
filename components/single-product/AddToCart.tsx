"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import { ProductSignInButton, SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/actions";

function AddToCart({ productId }: { productId: string }) {
  // Create state value for amount
  const [amount, setAmount] = useState<number>(1);

  // Get the user Id
  const { userId } = useAuth();

  // Returned JSX
  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="Add to Cart" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}

export default AddToCart;
