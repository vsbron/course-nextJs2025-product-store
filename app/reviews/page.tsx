import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";

async function ReviewsPage() {
  // Fetch the reviews
  const reviews = await fetchProductReviewsByUser();

  // Guard clause
  if (reviews.length === 0)
    return <SectionTitle text="You have no reviews yet"></SectionTitle>;

  // Returned JSX
  return (
    <>
      <SectionTitle text="Your reviews" />
      <section className="grid md:grid-cols-2 gap-6 mt-8">
        {reviews.map(({ comment, rating, id, product }) => (
          <ReviewCard
            key={id}
            reviewInfo={{
              comment,
              rating,
              image: product.image,
              name: product.name,
            }}
          >
            <DeleteReview reviewId={id} />
          </ReviewCard>
        ))}
      </section>
    </>
  );
}

// Small helper component for deleting a review
function DeleteReview({ reviewId }: { reviewId: string }) {
  // Binding id to the action function
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default ReviewsPage;
