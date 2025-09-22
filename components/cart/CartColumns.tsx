import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

export function FirstColumn({ name, image }: { name: string; image: string }) {
  // Returned JSX
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
        priority
        className="w-full rounded-md object-cover"
      />
    </div>
  );
}
export function SecondColumn({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) {
  // Returned JSX
  return (
    <div className="sm:w-48">
      <Link href={`/products/${productId}`}>
        <h3 className="capitalize font-medium hover:underline">{name}</h3>
      </Link>
      <h4 className="mt-2 capitalize text-xs">{company}</h4>
    </div>
  );
}
export function ThirdColumn({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {
  // Returned JSX
  return <div>{quantity}</div>;
}
export function FourthColumn({ price }: { price: number }) {
  // Returned JSX
  return <p className="font-semibold md:ml-auto">{formatCurrency(price)}</p>;
}
