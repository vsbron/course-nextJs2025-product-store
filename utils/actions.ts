"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { imageSchema, productSchema } from "./schema";
import { validatedWithZodSchema } from "./schemaFunctions";
import db from "@/utils/db";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

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

// Delete product action
export const deleteProductAction = async (prevState: { productId: string }) => {
  // Get the product ID
  const { productId } = prevState;

  // Checking whether the user is admin
  await getAdminUser();

  try {
    const product = await db.product.delete({
      where: { id: productId },
    });

    // Delete the image from Supabase
    deleteImage({ url: product.image });

    // Revalidate products
    revalidatePath("/admin/products");

    return { message: "Product successfully removed" };
  } catch (err) {
    return renderError(err);
  }
};

// Fetch admin product details action
export const fetchAdminProductDetails = async (productId: string) => {
  // Checking whether the user is admin
  await getAdminUser();

  // Get the product by its ID
  const product = await db.product.findUnique({ where: { id: productId } });

  // Guard clause
  if (!product) redirect("/admin/products");

  // Return the product
  return product;
};

// Update product action
export const updateProductAction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  // Checking whether the user is admin
  await getAdminUser();

  try {
    // Get the product ID from hidden input
    const productId = formData.get("id") as string;

    // Get and validate the form data
    const rawData = Object.fromEntries(formData);
    const validatedFields = validatedWithZodSchema(productSchema, rawData);

    // Update the product in the database
    await db.product.update({
      where: { id: productId },
      data: {
        ...validatedFields,
      },
    });

    // Revalidate product page
    revalidatePath(`/admin/products/${productId}/edit`);

    // Return success message
    return { message: "Product updated successfully" };
  } catch (err) {
    return renderError(err);
  }
};

// Update product image action
export const updateProductImageAction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  // Checking whether the user is admin
  await getAdminUser();

  try {
    // Get some data from form
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    // Handle the image upload
    const validatedFile = validatedWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);

    // Delete the old image from Supabase
    deleteImage({ url: oldImageUrl });

    // Edit the product in the database
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });

    // Revalidate product page
    revalidatePath(`/admin/products/${productId}/edit`);

    // Return success message
    return { message: "Product image updated successfully" };
  } catch (err) {
    return renderError(err);
  }
};

// Action function that checks if the product is in user's favorites
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  // Get the current user
  const user = await getAuthUser();

  // Get the favorite
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: { id: true },
  });

  // Return the ID or the null
  return favorite?.id || null;
};

// Toggle Favorite action function
export const toggleFavoriteAction = async () => {
  return { message: "Toggle favorite action" };
};
