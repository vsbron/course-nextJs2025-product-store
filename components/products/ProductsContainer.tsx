import Link from "next/link";
import { LuLayoutGrid, LuList } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { fetchAllProducts } from "@/utils/actions";

// Type for the Products Container
type ProductsContainerType = {
  layout: string;
  search: string;
};

// The Products Container component
async function ProductsContainer({ layout, search }: ProductsContainerType) {
  // Get the products and count them
  const products = await fetchAllProducts({ search });
  const totalProducts = products.length;

  // Set up the search term
  const searchTerm = search ? `&search=${search}` : "";

  // Returned JSX
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>

      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no product matched your search
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
