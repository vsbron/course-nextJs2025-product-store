import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ca } from "zod/v4/locales";

// The types for props
export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

// The component
function SelectProductAmount(
  props: SelectCartItemAmountProps | SelectProductAmountProps
) {
  // Destructure the props
  const { mode, amount, setAmount } = props;

  // Checking the mode of props
  const cartItem = mode === Mode.CartItem;

  // Returned JSX
  return (
    <>
      <h4 className="mb-2 font-semibold">Amount:</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger className={cartItem ? "w-[100px]" : "w-[150px]"}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;
