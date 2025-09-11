import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFeaturedProducts } from "@/utils/actions";

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
