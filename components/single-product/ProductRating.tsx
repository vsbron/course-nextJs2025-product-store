import { FaStar } from "react-icons/fa";

import { fetchProductRating } from "@/utils/actions";

async function ProductRating({ productId }: { productId: string }) {
  // Getting the rating and the count of the reviews
  const { rating, count } = await fetchProductRating(productId);

  // Returned JSX
  return (
    <span className="flex gap-1 items-center text-md mt-1 mb-4">
      <FaStar className="w-3 h-3" />
      {rating} {`(${count}) reviews`}
    </span>
  );
}

export default ProductRating;
