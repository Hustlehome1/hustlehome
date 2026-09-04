export type CategorySlug =
  | "electronics"
  | "vinted-unbans"
  | "receipts"
  | "accessories"
  | "sportswear"
  | "shoes";

export type Category = {
  slug: CategorySlug;
  name: string;
  image: string;
  description?: string;
};

export const CATEGORIES: Category[] = [
  { slug: "electronics", name: "Electronics", image: "/images/categories/cat-electronics.jpeg" },
  { slug: "vinted-unbans", name: "Vinted Unbans", image: "/images/categories/cat-vinted.jpeg" },
  { slug: "receipts", name: "Receipts", image: "/images/categories/cat-receipts.jpeg" },
  { slug: "accessories", name: "Accessories", image: "/images/categories/cat-accessories.jpeg" },
  { slug: "sportswear", name: "Sportswear", image: "/images/categories/cat-sportswear.jpeg" },
  { slug: "shoes", name: "Shoes", image: "/images/categories/cat-shoes.jpeg" },
];

// Single source of truth for product data. UI everywhere (homepage, best
// sellers, /products, cart, checkout) reads from this array — swapping it
// for a Supabase query later shouldn't require touching any UI component.
// `priceCents` is whole euro-cents (integer) — never do currency math in
// floating-point euros, it drifts. This is also the unit Stripe expects.
// Use `formatPrice` to render it. Every product is digital: delivered by
// email after purchase, so there's no stock or grading concept to track.
// One bundle per category — categories and products are 1:1 now.
export type Product = {
  id: string;
  category: CategorySlug;
  name: string;
  priceCents: number;
  // Display-only. Not used in any calculation, cart total, or payment. UK/EU sellers should ensure this reflects a genuine reference price under Omnibus Directive rules.
  originalPrice?: number;
  discountLabel?: string;
  image: string;
  description: string;
  type: "digital";
};

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export const PRODUCTS: Product[] = [
  {
    id: "electronics-bundle",
    category: "electronics",
    name: "Electronics Bundle",
    priceCents: 100,
    originalPrice: 9999,
    discountLabel: "99% OFF",
    image: "/images/categories/cat-electronics.jpeg",
    description:
      "Every verified electronics vendor in one bundle — Dyson, PlayStation, Google Review cards, and more. Delivered instantly.",
    type: "digital",
  },
  {
    id: "vinted-unban-bundle",
    category: "vinted-unbans",
    name: "Vinted Unban Bundle",
    priceCents: 499,
    originalPrice: 998,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-vinted.jpeg",
    description:
      "Save yourself the time and stress of worrying about a mistake from the company's side. Vinted bans are extremely common — full unban methods included.",
    type: "digital",
  },
  {
    id: "receipt-bundle",
    category: "receipts",
    name: "Receipt Bundle",
    priceCents: 2499,
    originalPrice: 4998,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-receipts.jpeg",
    description: "Never get scammed again. Full breakdown of how to spot fake receipts across every major brand.",
    type: "digital",
  },
  {
    id: "accessories-bundle",
    category: "accessories",
    name: "Accessories Bundle",
    priceCents: 1799,
    originalPrice: 3598,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-accessories.jpeg",
    description:
      "Every verified accessories vendor in one bundle — BMW parts, OEM caps, and more. Wholesale-tier access.",
    type: "digital",
  },
  {
    id: "sportswear-bundle",
    category: "sportswear",
    name: "Sportswear Bundle",
    priceCents: 2499,
    originalPrice: 4998,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-sportswear.jpeg",
    description:
      "Every verified sportswear vendor in one bundle — Asics, tracksuits, and full drops. Reseller pricing throughout.",
    type: "digital",
  },
  {
    id: "shoes-bundle",
    category: "shoes",
    name: "Shoes Bundle",
    priceCents: 1499,
    originalPrice: 2998,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-shoes.jpeg",
    description: "Every verified shoe vendor in one bundle. Direct-from-source access for resellers.",
    type: "digital",
  },
];

export const BEST_SELLERS = PRODUCTS;
