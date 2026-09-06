"use client";

import { useState } from "react";
import Star from "@/components/Star";
import ReviewSnakeBorder from "@/components/ReviewSnakeBorder";
import type { Review } from "@/lib/reviews";

export default function ReviewCard({
  review,
  snake = true,
  compact = false,
}: {
  review: Review;
  /** Border-tracing snake animation — the dedicated /reviews page only. */
  snake?: boolean;
  /** Smaller variant used in the homepage reviews strip. */
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`review-card relative ${compact ? "p-6" : "p-8"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {snake && <ReviewSnakeBorder hovered={hovered} />}

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 text-lime" />
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-lime">
          <svg
            viewBox="0 0 24 24"
            width={12}
            height={12}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Verified Purchase
        </span>
      </div>

      <div className={`relative ${compact ? "mt-5" : "mt-6"}`}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-1 -top-4 select-none font-display text-[40px] leading-none text-lime/30"
        >
          &ldquo;
        </span>
        <p
          className={`relative px-2 font-display text-white ${
            compact ? "text-[15px] sm:text-[16px]" : "text-[16px] sm:text-[18px]"
          }`}
        >
          {review.quote}
        </p>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-1 select-none font-display text-[40px] leading-none text-lime/30"
        >
          &rdquo;
        </span>
      </div>

      <p className={`relative font-sans font-medium text-white ${compact ? "mt-6" : "mt-8"}`}>
        {review.name} <span className="text-ash">&middot; {review.city}</span>
      </p>
      <p className="relative mt-1 font-mono text-meta text-lime">Bought: {review.product}</p>
    </article>
  );
}
