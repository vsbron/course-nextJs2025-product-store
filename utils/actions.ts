"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Cart } from "@prisma/client";

import db from "@/utils/db";

import { imageSchema, productSchema, reviewSchema } from "./schema";
import { validatedWithZodSchema } from "./schemaFunctions";
import { deleteImage, uploadImage } from "./supabase";

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
export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  // Get the current user
  const user = await getAuthUser();

  // Destructure the passed data
  const { productId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      // If it's already in favorites - remove it
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      // Add it otherwise
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    // Revalidate the page
    revalidatePath(pathname);

    // Return the result message
    return {
      message: favoriteId ? "Removed from favorites" : "Added to Favorites",
    };
  } catch (err) {
    return renderError(err);
  }
};

// Action function for fetching the user's favorite products
export const fetchUserFavorites = async () => {
  // Get the current user
  const user = await getAuthUser();

  // Fetch the favorites that assigned to user
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: { product: true },
  });

  // Return the favorites
  return favorites;
};

// REVIEWS
// Create review action function
export const createReviewAction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  // Get the current user from Clerk
  const user = await getAuthUser();

  try {
    // Getting and validating the form values
    const rawData = Object.fromEntries(formData);
    const validatedFields = validatedWithZodSchema(reviewSchema, rawData);

    // Create the product in the database
    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review submitted successfully" };
  } catch (err) {
    return renderError(err);
  }
};

// Fetch product reviews action function
export const fetchProductReviews = async (productId: string) => {
  // Get all the reviews associated with the product
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Return the reviews
  return reviews;
};

// Fetching the product reviews count and rating action function
export const fetchProductRating = async (productId: string) => {
  // Get the product rating and reviews count
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // Return the stats or 0
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

// Fetch all the reviews from user
export const fetchProductReviewsByUser = async () => {
  // Get the current user from Clerk
  const user = await getAuthUser();

  // Get the reviews from the database (select custom fields)
  const reviews = await db.review.findMany({
    where: { clerkId: user.id },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  // Return the reviews
  return reviews;
};

// Delete the review action function
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  // Get the ID from the props
  const { reviewId } = prevState;

  // Get the current user from Clerk
  const user = await getAuthUser();

  try {
    // Delete the review if id and user match
    await db.review.delete({ where: { id: reviewId, clerkId: user.id } });

    // Revalidate the page
    revalidatePath("/reviews");

    // Return success message
    return { message: "Review deleted successfully" };
  } catch (err) {
    return renderError(err);
  }
};

// Getting the existing review from the user on the current product
export const findExistingReview = async (userId: string, productId: string) => {
  // Return the review if found one
  return await db.review.findFirst({
    where: {
      clerkId: userId,
      productId: productId,
    },
  });
};

// CART & CART ITEMS
// Getting all items in the cart action function
export const fetchCartItems = async () => {
  // Get the user id and fetch user's cart
  const { userId } = await auth();
  const cart = await db.cart.findFirst({
    where: { clerkId: userId ?? "" },
    select: {
      numItemsInCart: true,
    },
  });

  // Return the cart
  return cart?.numItemsInCart || 0;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addToCartAction = async (prevState: any, formData: FormData) => {
  // Check if user logged in
  const user = await getAuthUser();

  try {
    // Get the product data from the form
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));

    // Check if product exists
    await fetchProduct(productId);

    // Get the cart for the user
    const cart = await fetchOrCreateCart({ userId: user.id });

    // Add a product to the cart or update the existing one
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });

    // Update the cart
    await updateCart(cart);

    // Get the product
  } catch (err) {
    renderError(err);
  }

  // Redirect user to the cart
  redirect("/cart");
};

// Helper function that fetches the product
const fetchProduct = async (productId: string) => {
  // Fetch the product data from API
  const product = await db.product.findUnique({ where: { id: productId } });

  // Guard clause
  if (!product) {
    throw new Error("Product not found");
  }

  // Return the product
  return product;
};

// Helper function that checks whether there is a cart, and creates it if absent
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};
const includeProductClause = {
  cartItems: {
    include: { product: true },
  },
};

// Helper function that creates cart item in the cart, or updates the existing ones
const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });
  // Update the existing one
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: { amount: cartItem.amount + amount },
    });
  } else {
    // Create the new one
    cartItem = await db.cartItem.create({
      data: {
        amount,
        productId,
        cartId,
      },
    });
  }
};

// Updating the cart action function
export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  // Iterate over cartItems
  for (const item of cartItems) {
    // Update the values
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;

  // Calculate the total
  const orderTotal = cartTotal + tax + shipping;

  // Update the cart in the database
  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: { numItemsInCart, cartTotal, tax, orderTotal },
    include: includeProductClause,
  });

  // Return the cart
  return currentCart;
};

// TODO:
export const removeCartItemAction = async () => {};
export const updateCartItemAction = async () => {};
