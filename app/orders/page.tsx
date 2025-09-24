import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

async function OrdersPage() {
  // Get the user's orders
  const orders = await fetchUserOrders();

  // Returned JSX
  return (
    <>
      <SectionTitle text="Your orders" />
      <Table>
        <TableCaption>Total orders: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Order total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(
            ({ shipping, tax, createdAt, id, orderTotal, products }) => (
              <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default OrdersPage;
