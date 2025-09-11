import ProductsContainer from "@/components/products/ProductsContainer";

// Type for search params
type SearchParamsType = { layout?: string; search?: string };

// The Products page
function ProductsPage({ searchParams }: { searchParams: SearchParamsType }) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  // Returned JSX
  return <ProductsContainer layout={layout} search={search} />;
}

export default ProductsPage;
