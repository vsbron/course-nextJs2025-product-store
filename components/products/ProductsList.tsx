import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { formatCurrency } from "@/utils/format";

function ProductsList({ products }: { products: Product[] }) {
  // Returned JSX
  return (
    <div className="mt--12 grid gap-y-8">
      {products.map(({ name, price, image, company, id }) => (
        <article key={id} className="group relative">
          <Link href={`/products/${id}`}>
            <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
              <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                <div className="relative h-64 md:h-48 md:w-48">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                    priority
                    className="w-full rounded object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h2 className="text-xl font-semibold capitalize">{name}</h2>
                  <h4 className="text-muted-foreground">{company}</h4>
                </div>
                <p className="text-muted-foreground text-lg md:ml-auto">
                  {formatCurrency(price)}
                </p>
              </CardContent>
            </Card>
          </Link>
          <div className="absolute bottom-8 right-8 z-5">
            <FavoriteToggleButton productId={id} />
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProductsList;
