"use client";
import { usePathname } from "next/navigation";

import { CardSubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";

// Type for Favorite Toggle Form props
type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

// The Favorite Toggle Form component
function FavoriteToggleForm({
  productId,
  favoriteId,
}: FavoriteToggleFormProps) {
  // Get the current url
  const pathname = usePathname();

  // Get the action by binding the needed data to the toggle action
  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname,
  });

  // Returned JSX
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={!!favoriteId} />
    </FormContainer>
  );
}

export default FavoriteToggleForm;
