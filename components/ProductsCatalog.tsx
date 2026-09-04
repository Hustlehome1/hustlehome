"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type CategorySlug } from "@/lib/products";

type Filter = "all" | CategorySlug;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "all-in-one", label: "All In One" },
  { value: "electronics", label: "Electronics" },
  { value: "vinted-unbans", label: "Vinted Unbans" },
  { value: "receipts", label: "Receipts" },
  { value: "accessories", label: "Accessories" },
  { value: "sportswear", label: "Sportswear" },
  { value: "shoes", label: "Shoes" },
];

export default function ProductsCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const visibleCategories =
    filter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.slug === filter);

  return (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={`nav-link font-mono text-meta uppercase tracking-wide ${
                active ? "nav-link-active text-lime" : "text-ash"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visibleCategories.map((category) => {
        const products = PRODUCTS.filter((p) => p.category === category.slug);
        return (
          <section
            key={category.slug}
            id={category.slug}
            aria-labelledby={`${category.slug}-heading`}
            className="mt-16 scroll-mt-24 border-t border-iron pt-12"
          >
            <h2 id={`${category.slug}-heading`} className="font-display text-h2 text-white">
              {category.name}
            </h2>
            {category.description && (
              <p className="mt-2 max-w-xl text-body-sm text-ash">{category.description}</p>
            )}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
