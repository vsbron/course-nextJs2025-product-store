import Breadcrumbs from "@/components/single-product/Breadcrumbs";
import { fetchSingleProduct } from "@/utils/actions";

async function SingleProductPage({ params }: { params: { id: string } }) {
  // Get the ID from the params
  const { id } = await params;

  // Get the product
  const product = await fetchSingleProduct({ id });

  // Returned JSX
  return (
    <>
      <Breadcrumbs name={product.name} />
      <h1>{id}</h1>
      <p>{product.name}</p>
    </>
  );
}

export default SingleProductPage;
