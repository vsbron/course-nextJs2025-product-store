import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";

async function FavoritesPage() {
  // Fetch user's favorite products
  const favorites = await fetchUserFavorites();

  // Guard clause
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />;

  // Returned JSX
  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites.map((fav) => fav.product)} />
    </div>
  );
}

export default FavoritesPage;
