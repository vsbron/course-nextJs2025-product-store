"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import TextAreaInput from "@/components/form/TextAreaInput";
import RatingInput from "@/components/reviews/RatingInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createReviewAction } from "@/utils/actions";

function SubmitReview({ productId }: { productId: string }) {
  // Create state for input visibility
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  // Get the user
  const { user } = useUser();

  // Guard clause
  if (!user) return;

  // Returned JSX
  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setIsFormVisible((v) => !v)}
      >
        Leave review
      </Button>
      {isFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "User"}
            />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="Rating" />
            <TextAreaInput
              name="comment"
              labelText="Feedback"
              defaultValue="Outstanding Product!"
            />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
