import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";

// Props type
type ReviewCardProps = {
  reviewInfo: { comment: string; rating: number; image: string; name: string };
  children?: React.ReactNode;
};

// The component
function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  // Destructuring the data
  const { comment, rating, image, name } = reviewInfo;

  // Returned JSX
  return (
    <Card className="relative p-4">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">{name}</h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}

export default ReviewCard;
