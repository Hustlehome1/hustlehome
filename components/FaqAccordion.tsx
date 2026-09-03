"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How do you know a vendor is actually legit?",
    a: "Every vendor we list has been personally vetted — we buy from them ourselves before they go up on the site. We don't list anything we haven't verified directly.",
  },
  {
    q: "How is the product delivered?",
    a: "Every product is a digital file or vendor link, delivered to your email inbox within 1 hour of purchase. No physical shipping.",
  },
  {
    q: "Do you offer refunds?",
    a: "Because all products are instant-access digital goods, all sales are final. No refunds, returns, or exchanges.",
  },
  {
    q: "How do I pay?",
    a: "Card or bank transfer at checkout. No deposits, no instalment schemes — you pay once, for the item you're actually getting.",
  },
];

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      data-open={open}
      className="faq-icon shrink-0 text-lime"
      aria-hidden="true"
    >
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-iron border-y border-iron">
      {FAQS.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="faq-row">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-1 py-6 text-left"
              >
                <span className="font-display text-h3 text-bone">{item.q}</span>
                <PlusMinusIcon open={open} />
              </button>
            </h3>
            <div id={`faq-panel-${i}`} className="faq-panel" data-open={open}>
              <div>
                <p className="max-w-2xl px-1 pb-6 text-body-sm text-ash">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
