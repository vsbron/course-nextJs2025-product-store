import { fetchProductReviews } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  // Get the reviews from the database
  const reviews = await fetchProductReviews(productId);

  // TODO: No reviews scenario
  // ********************** //

  // Returned JSX
  return (
    <div className="mt-16">
      <SectionTitle text="Product reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map(({ id, comment, rating, authorImageUrl, authorName }) => (
          <ReviewCard
            key={id}
            reviewInfo={{
              comment,
              rating,
              image: authorImageUrl,
              name: authorName,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;
