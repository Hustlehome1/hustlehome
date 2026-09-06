export type Review = {
  name: string;
  city: string;
  quote: string;
  product: string;
};

// 8 buyer reviews — verified purchases, spread across the bundle lineup.
export const REVIEWS: Review[] = [
  {
    name: "Jake M.",
    city: "Dublin",
    quote: "I vouch. Got another pair — CMON!",
    product: "Shoes Bundle",
  },
  {
    name: "Carlos R.",
    city: "London",
    quote: "The P600 just arrived. Amazing quality bro. Vouch 100%.",
    product: "Shoes Bundle",
  },
  {
    name: "Aidan K.",
    city: "Manchester",
    quote:
      "Arrived with box, perfect label and packaging. Trainers in perfect condition. Great design, really surprised me!",
    product: "Sportswear Bundle",
  },
  {
    name: "Liam D.",
    city: "Leeds",
    quote: "Can vouch for it. Legit if you wish.",
    product: "Electronics Bundle",
  },
  {
    name: "Tyler W.",
    city: "Birmingham",
    quote: "Bro how do you even find guys these good? Big product, big profits.",
    product: "All In One Bundle",
  },
  {
    name: "Declan O.",
    city: "Cork",
    quote: "Absolutely leng. 100% vouched. The shoes are so fire.",
    product: "Shoes Bundle",
  },
  {
    name: "Marcus J.",
    city: "Bristol",
    quote: "That vendor was cold bro. Made some profit already.",
    product: "Accessories Bundle",
  },
  {
    name: "Oisin F.",
    city: "Dublin",
    quote:
      "Was thinking to just get the all supplier set. It's all legit, the Asics supplier was great.",
    product: "All In One Bundle",
  },
];
