import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  // Get the featured products
  const products = await fetchFeaturedProducts();

  // Guard clause
  if (products.length === 0) return <EmptyList />;

  // Returned JSX
  return (
    <section className="pt-24">
      <SectionTitle text="Featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;
