export type CategorySlug =
  | "electronics"
  | "vinted-unbans"
  | "receipts"
  | "accessories"
  | "sportswear"
  | "shoes"
  | "all-in-one"
  | "starter";

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
  { slug: "all-in-one", name: "All In One", image: "/images/categories/cat-all-in-one.jpeg" },
  { slug: "starter", name: "Starter", image: "/images/categories/cat-starter.jpeg" },
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
  stripePriceId: string;
};

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export const PRODUCTS: Product[] = [
  {
    id: "electronics-bundle",
    category: "electronics",
    name: "Electronics Bundle",
    priceCents: 999,
    originalPrice: 1998,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-electronics.jpeg",
    description:
      "Every verified electronics vendor in one bundle — Dyson, PlayStation, Google Review cards, and more. Delivered instantly.",
    type: "digital",
    stripePriceId: "price_1UChJzAKwDcQfm2H9HYUEBTE",
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
    stripePriceId: "price_1UCGjBAKwDcQfm2Hau5m768L",
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
    stripePriceId: "price_1UCGjPAKwDcQfm2HXlpnZWQY",
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
    stripePriceId: "price_1UCGjeAKwDcQfm2HqmdAGGiu",
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
    stripePriceId: "price_1UCGk3AKwDcQfm2HZtua6fkf",
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
    stripePriceId: "price_1UCGkHAKwDcQfm2HqiBuvE7G",
  },
  {
    id: "all-in-one-bundle",
    category: "all-in-one",
    name: "All In One Bundle",
    priceCents: 2499,
    originalPrice: 4998,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-all-in-one.jpeg",
    description:
      "Every bundle we sell in one purchase — electronics, sportswear, shoes, accessories, receipts, and Vinted unbans. The full HustleHome stack.",
    type: "digital",
    stripePriceId: "price_1UChggAKwDcQfm2HMqfgytzV",
  },
  {
    id: "starter-bundle",
    category: "starter",
    name: "Starter Reseller Bundle",
    priceCents: 699,
    originalPrice: 1398,
    discountLabel: "50% OFF",
    image: "/images/categories/cat-starter.jpeg",
    description:
      "Stop wasting time and money trying to find the right suppliers. Your starter bundle with verified vendors to get you reselling from day one.",
    type: "digital",
    stripePriceId: "price_1UChKQAKwDcQfm2HPXuiDTdv",
  },
];

// Flagship first, starter bundle second (entry-level upsell), everything
// else in catalog order — this is the row buyers hit before they've picked
// a category, so the highest-value and lowest-friction bundles lead.
const ALL_IN_ONE_PRODUCT = PRODUCTS.find((p) => p.id === "all-in-one-bundle")!;
const STARTER_PRODUCT = PRODUCTS.find((p) => p.id === "starter-bundle")!;
export const BEST_SELLERS = [
  ALL_IN_ONE_PRODUCT,
  STARTER_PRODUCT,
  ...PRODUCTS.filter((p) => p.id !== "all-in-one-bundle" && p.id !== "starter-bundle"),
];
