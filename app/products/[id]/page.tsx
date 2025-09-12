import Image from "next/image";

import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import Breadcrumbs from "@/components/single-product/Breadcrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { fetchSingleProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function SingleProductPage({ params }: PageProps) {
  // Get the ID from the params
  const { id } = await params; // now TS is happy

  // Get (and destructure) the product
  const { name, image, company, description, price } = await fetchSingleProduct(
    { id }
  );

  // Returned JSX
  return (
    <section>
      <Breadcrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE COLUMN */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority
            className="w-full rounded object-cover"
          />
        </div>
        {/* INFO COLUMN */}
        <div>
          <div className="flex gap-x-4 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="text-md mt-3 bg-muted inline-block px-2 pt-1 pb-2 rounded">
            {formatCurrency(price)}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
