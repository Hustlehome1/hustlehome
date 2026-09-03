export type Review = {
  receipt: string;
  name: string;
  city: string;
  category: "Dyson" | "PS5" | "BMW" | "Asics";
  categorySlug: "dyson" | "ps5" | "bmw" | "asics";
  product: string;
  quote: string;
  date: string;
  grade: string;
};

// 8 placeholder reviews, 2 per category, roughly ordered newest first.
export const REVIEWS: Review[] = [
  {
    receipt: "HH-R-0142",
    name: "R. Mensah",
    city: "Manchester",
    category: "Dyson",
    categorySlug: "dyson",
    product: "Dyson V15 Detect",
    quote:
      "The runtime they listed was exactly what I got on the first charge, not an optimistic number. Battery report matched too — didn't have to take that on faith.",
    date: "2026-08-29",
    grade: "A−",
  },
  {
    receipt: "HH-R-0139",
    name: "C. Byrne",
    city: "Dublin",
    category: "PS5",
    categorySlug: "ps5",
    product: "DualSense Edge",
    quote:
      "Bought this specifically because my last controller drifted within a month. The stick-drift readout on the listing is what sold me, and it's held up six weeks in.",
    date: "2026-08-26",
    grade: "A−",
  },
  {
    receipt: "HH-R-0135",
    name: "F. Novak",
    city: "Bristol",
    category: "BMW",
    categorySlug: "bmw",
    product: "E46 wheel cap set, 68mm",
    quote:
      "Ordered two sets from other sellers before this that didn't clip in — wrong diameter both times. This one had the OEM part number checked and measured, and it just fit.",
    date: "2026-08-24",
    grade: "A−",
  },
  {
    receipt: "HH-R-0131",
    name: "L. Ferreira",
    city: "Sheffield",
    category: "Asics",
    categorySlug: "asics",
    product: "Asics GEL-Kayano 14",
    quote:
      "Gel cells still had bounce, which is the one thing you can't tell from photos. Stitching matched the reference too — I was half expecting a fake at this price.",
    date: "2026-08-21",
    grade: "A−",
  },
  {
    receipt: "HH-R-0126",
    name: "T. Sadiq",
    city: "Leeds",
    category: "Dyson",
    categorySlug: "dyson",
    product: "Dyson V11 Absolute",
    quote:
      "Not a new unit and they were upfront about it — motor hours and filter condition were both logged. Works exactly as graded, no surprises.",
    date: "2026-08-19",
    grade: "B",
  },
  {
    receipt: "HH-R-0120",
    name: "A. Kowalczyk",
    city: "Cardiff",
    category: "PS5",
    categorySlug: "ps5",
    product: "DualSense, white",
    quote:
      "There's a small mark on the shell they flagged in the listing before I even asked. That's the whole reason I'd buy secondhand from here again.",
    date: "2026-08-15",
    grade: "A",
  },
  {
    receipt: "HH-R-0114",
    name: "H. Demir",
    city: "Birmingham",
    category: "BMW",
    categorySlug: "bmw",
    product: "F30 wheel cap set, 56mm",
    quote:
      "All eight clips intact, which the report said and I actually checked myself before fitting. Finish grade was honest — a touch of clouding on one cap, as noted.",
    date: "2026-08-10",
    grade: "A",
  },
  {
    receipt: "HH-R-0108",
    name: "M. Wallace",
    city: "Nottingham",
    category: "Asics",
    categorySlug: "asics",
    product: "Asics GEL-1130, cream",
    quote:
      "Box included, tags weren't — they said so upfront rather than letting the photo do the talking. Shoes themselves are in better shape than the grade suggested.",
    date: "2026-08-06",
    grade: "B+",
  },
];
