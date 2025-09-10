import db from "@/utils/db";

// Action function that fetches only featured products
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({ where: { featured: true } });
  return products;
};

// Action function that fetches all products
export const fetchAllProducts = async () => {
  const products = await db.product.findMany({
    // Order by date
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};
