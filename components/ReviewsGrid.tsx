import ReviewCard from "@/components/ReviewCard";
import { REVIEWS } from "@/lib/reviews";

export default function ReviewsGrid() {
  const columnOne = REVIEWS.filter((_, i) => i % 2 === 0);
  const columnTwo = REVIEWS.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
      <div className="flex flex-col gap-4 lg:gap-6">
        {columnOne.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
      <div className="flex flex-col gap-4 lg:mt-10 lg:gap-6">
        {columnTwo.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </div>
  );
}
