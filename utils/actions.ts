"use server";

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Helper function for getting the current user
const getAuthUser = async () => {
  // Get the user
  const user = await currentUser();

  // Guard clause for empty user
  if (!user) redirect("/");

  // Return the user
  return user;
};
// Helper function for rendering the error message
const renderError = (err: unknown): { message: string } => {
  console.log(err);
  return { message: err instanceof Error ? err.message : "Unknown error" };
};

// Action function that fetches only featured products
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({ where: { featured: true } });
  return products;
};

// Action function that fetches all products
export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await db.product.findMany({
    // Order by date
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

// Action function that fetches single product
export const fetchSingleProduct = async ({ id }: { id: string }) => {
  // Fetch the product
  const product = await db.product.findUnique({ where: { id: id } });

  // Guard clause
  if (!product) redirect("/products");

  // Return the product
  return product;
};

// Create product action function
export const createProductAction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // Get the current user from Clerk
  const user = await getAuthUser();

  try {
    // Getting the form values
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const price = Number(formData.get("price") as string);
    const image = formData.get("image") as File; // Temp
    const description = formData.get("description") as string;
    const featured = Boolean(formData.get("featured") as string);

    // Create product in the database
    await db.product.create({
      data: {
        name,
        company,
        price,
        image: "/images/product-1.jpg",
        description,
        featured,
        clerkId: user.id,
      },
    });

    // Returned message
    return { message: "Product created" };
  } catch (err) {
    return renderError(err);
  }
};
