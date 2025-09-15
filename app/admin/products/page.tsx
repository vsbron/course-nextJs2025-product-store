import Link from "next/link";

import EmptyList from "@/components/global/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchAdminProducts } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";

async function AdminProductsPage() {
  // Fetch all the products
  const items = await fetchAdminProducts();

  // Guard clause
  if (items.length === 0) return <EmptyList />;

  // Returned JSX
  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          Total products: {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow className="font-medium">
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(({ id: productId, name, company, price }) => (
            <TableRow key={productId}>
              <TableCell>
                <Link
                  href={`/products/${productId}`}
                  className="underline text-muted-foreground tracking-wide capitalize"
                >
                  {name}
                </Link>
              </TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell className="flex items-center gap-x-2"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default AdminProductsPage;
