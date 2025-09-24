import Stripe from "stripe";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import db from "@/utils/db";

// Get the stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// GET function
export const GET = async (req: NextRequest) => {
  // Get the session ID from search params
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    // Get the session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Get the order and cart IDs
    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    // If session is completed, update the order with isPaid: true
    if (session.status === "complete") {
      await db.order.update({ where: { id: orderId }, data: { isPaid: true } });
    }

    // Delete the cart in the end
    await db.cart.delete({ where: { id: cartId } });
  } catch (err) {
    // If fails - throw error
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  // Redirect user to orders page
  redirect("/orders");
};
