import ProductsContainer from "@/components/products/ProductsContainer";

// Type for search params
type SearchParamsType = { searchParams: { layout?: string; search?: string } };

// The Products page
async function ProductsPage({ searchParams }: SearchParamsType) {
  // Get the values from search params
  const { layout, search } = await searchParams;

  // Check if empty, assign defaults
  const receivedLayout = layout || "grid";
  const receivedSearch = search || "";

  // Returned JSX
  return <ProductsContainer layout={receivedLayout} search={receivedSearch} />;
}

export default ProductsPage;
