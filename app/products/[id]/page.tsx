import { fetchSingleProduct } from "@/utils/actions";

async function SingleProductPage({ params }: { params: { id: string } }) {
  // Get the ID from the params
  const { id } = await params;

  // Get the product
  const product = await fetchSingleProduct({ id });

  // Guard clause
  if (!product) return <h1>Sorry, no item</h1>;

  // Returned JSX
  return (
    <>
      <h1>{id}</h1>
      <p>{product.name}</p>
    </>
  );
}

export default SingleProductPage;
