import Image from "next/image";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import FaqAccordion from "@/components/FaqAccordion";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import Star from "@/components/Star";
import TrustpilotButton from "@/components/TrustpilotButton";
import { BEST_SELLERS, CATEGORIES } from "@/lib/products";
import { REVIEWS } from "@/lib/reviews";

const STRIP_REVIEWS = REVIEWS.slice(0, 3);

export default function Home() {
  return (
    <main>
      {/* ---- 1. Hero — full-viewport, one orchestrated entrance ---- */}
      <section aria-labelledby="hero-heading" className="hero-min-h flex items-center border-b border-iron">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-24 text-center sm:px-8 lg:py-32">
          <div className="hero-fade-1 w-full max-w-[90vw] sm:max-w-[900px]">
            <Image
              src="/images/hero-featured.png"
              alt=""
              width={677}
              height={369}
              priority
              sizes="(max-width: 900px) 90vw, 900px"
              className="h-auto w-full"
            />
          </div>

          <h1
            id="hero-heading"
            className="hero-fade-2 mt-12 font-hero text-[36px] leading-[1.1] tracking-[0.005em] text-white sm:text-[44px] lg:text-[56px]"
          >
            The shortcut serious resellers pay for.
          </h1>

          <p className="hero-fade-3 mt-6 max-w-[600px] text-body text-ash">
            Skip the trial and error. Verified suppliers, working unban
            methods, and receipt know-how — sent to your email the moment you
            buy.
          </p>

          <div className="hero-fade-4 mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
            <Link href="/products" className="btn-primary w-full sm:w-auto">
              Shop our supplier
            </Link>
            <Link href="#faq" className="btn-underline block w-full text-center sm:inline-block sm:w-auto">
              How we grade
            </Link>
          </div>
        </div>
      </section>

      {/* ---- 2. Marquee ticker ------------------------------------- */}
      <Marquee />

      {/* ---- 3. Categories grid -------------------------------------- */}
      <section aria-labelledby="categories-heading" className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <h2 id="categories-heading" className="font-display text-h1 text-white">
            Shop by category
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {CATEGORIES.map((category) => (
              <CategoryTile
                key={category.slug}
                category={category}
                className={
                  category.slug === "all-in-one"
                    ? "order-first md:order-none md:col-span-2 lg:col-span-1 lg:col-start-2"
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- 4. Best sellers — horizontal scroll ---------------------- */}
      <section aria-labelledby="best-sellers-heading" className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="best-sellers-heading" className="font-display text-h1 text-white">
              Best sellers
            </h2>
            <Link href="/products" className="btn-underline">
              View full catalog
            </Link>
          </div>
          <div className="scroll-snap-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {BEST_SELLERS.map((product) => (
              <div key={product.id} className="w-[260px] shrink-0 snap-start sm:w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 5. Reviews strip ------------------------------------------ */}
      <section aria-labelledby="reviews-heading" className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <h2 id="reviews-heading" className="font-display text-h1 text-white">
            What buyers say
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {STRIP_REVIEWS.map((review) => (
              <div key={review.receipt}>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-lime" />
                  ))}
                </div>
                <p className="mt-4 font-display text-h3 italic leading-snug text-bone">
                  “{review.quote}”
                </p>
                <p className="mt-4 font-mono text-meta text-ash">
                  {review.name}, {review.city}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/reviews" className="btn-underline text-lime">
              Read all reviews →
            </Link>
            <TrustpilotButton />
          </div>
        </div>
      </section>

      {/* ---- 6. FAQ ------------------------------------------------------ */}
      <section id="faq" aria-labelledby="faq-heading" className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <h2 id="faq-heading" className="font-display text-h1 text-white">
            Questions buyers actually ask
          </h2>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ---- 7. Final CTA band -------------------------------------- */}
      <section aria-labelledby="final-cta-heading">
        <div className="mx-auto max-w-[1280px] px-5 py-20 text-center sm:px-8 lg:py-[120px]">
          <h2 id="final-cta-heading" className="font-display text-display-sm text-white sm:text-display-md">
            Shop our supplier.
          </h2>
          <Link href="/products" className="btn-primary mt-10 inline-flex">
            Shop the catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
