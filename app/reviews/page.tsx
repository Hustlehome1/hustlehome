import type { Metadata } from "next";
import ReviewsGallery from "@/components/ReviewsGallery";
import Star from "@/components/Star";
import TrustpilotButton from "@/components/TrustpilotButton";

export const metadata: Metadata = {
  title: "Reviews — HustleHome",
  description:
    "Real Instagram DMs from HustleHome buyers — unedited, uncurated, unpaid.",
};

export default function ReviewsPage() {
  return (
    <main>
      <section className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="font-display text-display-sm text-white sm:text-display-md">
                  Excellent 4.9/5
                </h1>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-lime sm:h-7 sm:w-7" />
                  ))}
                </div>
              </div>
              <p className="mt-4 max-w-xl text-body-sm text-ash">
                Real DMs from real buyers. Not curated. Not paid.
              </p>
            </div>
            <TrustpilotButton className="self-start" />
          </div>
        </div>
      </section>

      <section aria-label="Review screenshots">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <ReviewsGallery />
        </div>
      </section>
    </main>
  );
}
