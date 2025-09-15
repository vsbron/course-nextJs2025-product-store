"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { imageSchema, productSchema } from "./schema";
import { validatedWithZodSchema } from "./schemaFunctions";
import db from "@/utils/db";
import { uploadImage } from "./supabase";

// Helper function for getting the current user
const getAuthUser = async () => {
  // Get the user
  const user = await currentUser();

  // Guard clause for empty user
  if (!user) redirect("/");

  // Return the user
  return user;
}; // Helper function for getting the admin user
const getAdminUser = async () => {
  // Get the user
  const user = await getAuthUser();

  // Redirect if user is not admin
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");

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
    // Getting and validating the form values
    const rawData = Object.fromEntries(formData);
    const validatedFields = validatedWithZodSchema(productSchema, rawData);

    // Handle the image
    const file = formData.get("image") as File;
    const validatedFile = validatedWithZodSchema(imageSchema, { image: file });
    const imageURL = await uploadImage(validatedFile.image);

    // Create the product in the database
    await db.product.create({
      data: {
        ...validatedFields,
        image: imageURL,
        clerkId: user.id,
      },
    });
  } catch (err) {
    return renderError(err);
  }
  // Redirect user to admin products page
  redirect("/admin/products");
};

// Action function that fetches all products
export const fetchAdminProducts = async () => {
  // Checking whether the user is admin
  await getAdminUser();

  // Fetch all the products
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};
