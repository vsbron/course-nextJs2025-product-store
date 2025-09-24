import Stripe from "stripe";
import { type NextRequest } from "next/server";

import db from "@/utils/db";

// Get the stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// POST function
export const POST = async (req: NextRequest) => {
  // Get the URL origin so it would work locally and on web
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");

  // Get the order and cart IDs from request
  const { orderId, cartId } = await req.json();

  // Find the order using its ID
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  // Find the cart using its ID, select the cart items with product data
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // If something fails - exit
  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  // Set up the line of sold items array
  const line_items = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100, // price in cents
      },
    };
  });
  try {
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Return the response
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    // If payment fails, return error
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
