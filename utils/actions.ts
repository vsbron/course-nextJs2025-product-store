import db from "@/utils/db";

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
  const products = await db.product.findUnique({ where: { id: id } });
  return products;
};
