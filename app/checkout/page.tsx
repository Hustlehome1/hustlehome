"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SnakeCheckoutButton from "@/components/SnakeCheckoutButton";
import { useHydratedCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotalCents, openCart, isHydrated } = useHydratedCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setIsProcessing(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong starting checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting checkout");
      setIsProcessing(false);
    }
  }

  // Wait for the cart's localStorage read to finish before deciding whether
  // it's empty — otherwise this renders the "empty" branch below off the
  // pre-hydration state and never gets another chance to correct itself.
  if (!isHydrated) {
    return (
      <main>
        <section className="border-b border-iron">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-24 text-center sm:px-8 lg:py-32">
            <p className="text-body-sm text-ash">Loading your cart…</p>
          </div>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main>
        <section className="border-b border-iron">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-24 text-center sm:px-8 lg:py-32">
            <h1 className="font-display text-h1 text-white">Your cart is empty</h1>
            <p className="text-body-sm text-ash">Add something to your cart before checking out.</p>
            <Link href="/products" className="btn-underline mt-4 text-lime">
              Shop products →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <h1 className="font-display text-h1 text-white">Checkout</h1>
          <p className="mt-3 max-w-2xl text-body-sm text-ash">
            Review your order, then pay securely with Stripe.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[640px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <button
            type="button"
            onClick={openCart}
            className="btn-underline mb-8 text-ash hover:text-lime"
          >
            ← Back to cart
          </button>

          <div className="border border-iron bg-graphite p-6">
            <h2 className="font-display text-h3 text-white">Order summary</h2>
            <ul className="mt-6 divide-y divide-iron">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-[60px] w-[60px] shrink-0 border border-iron">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-body-sm text-bone">{product.name}</p>
                    <p className="mt-1 font-mono text-meta text-ash">Qty {quantity}</p>
                  </div>
                  <div className="price-row shrink-0 font-mono text-body-sm">
                    <p className="text-lime">{formatPrice(product.priceCents * quantity)}</p>
                    {product.originalPrice && (
                      <p className="price-original">
                        {formatPrice(product.originalPrice * quantity)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-iron pt-6 font-mono text-body-sm">
              <div className="flex items-center justify-between text-bone">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalCents)}</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Total</span>
                <span className="text-lime">{formatPrice(subtotalCents)}</span>
              </div>
            </div>
          </div>

          <SnakeCheckoutButton
            onClick={handlePay}
            disabled={isProcessing}
            className="mt-8 min-h-[56px] w-full justify-center"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-lime border-t-transparent"
                />
                Processing…
              </span>
            ) : (
              "Pay with Stripe"
            )}
          </SnakeCheckoutButton>

          {error && (
            <p className="mt-4 text-center font-mono text-meta text-red-500" role="alert">
              {error}
            </p>
          )}

          <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-meta text-ash">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <rect x="5" y="11" width="14" height="9" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Secure checkout powered by Stripe
          </p>
        </div>
      </section>
    </main>
  );
}
