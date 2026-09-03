"use client";

import { useEffect, useRef, useState } from "react";
import { useHydratedCart } from "@/contexts/CartContext";

export default function CartButton() {
  const { count, openCart } = useHydratedCart();
  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 200);
      prevCount.current = count;
      return () => window.clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={count > 0 ? `Open cart, ${count} item${count === 1 ? "" : "s"}` : "Open cart"}
      className="relative flex h-8 w-8 items-center justify-center text-bone transition-colors hover:text-lime"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path d="M6 8h12l-1 12H7L6 8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span
          className={`cart-badge absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 font-mono text-[10px] font-bold leading-none text-void ${
            bump ? "bump" : ""
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
