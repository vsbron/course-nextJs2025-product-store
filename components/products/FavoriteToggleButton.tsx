import { auth } from "@clerk/nextjs/server";

import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ productId }: { productId: string }) {
  // Check if user is signed in
  const { userId } = await auth();

  // Guard clause
  if (!userId) return <CardSignInButton />;

  // Check if product is in user's favorites
  const favoriteId = await fetchFavoriteId({ productId });

  // Returned JSX
  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
}

export default FavoriteToggleButton;
