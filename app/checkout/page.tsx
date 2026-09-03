"use client";

// TODO: Replace mock order confirmation with Stripe Checkout redirect. See
// lib/products.ts for product data structure — will need to migrate to a
// real DB (Supabase) and pass product IDs to Stripe.

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import SnakeCheckoutButton from "@/components/SnakeCheckoutButton";
import { useHydratedCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";

function fieldClass() {
  // text-body, not text-body-sm — iOS Safari auto-zooms on focus for any
  // input under 16px, which text-body-sm's 15px would trigger.
  return "w-full border-0 border-b border-iron bg-transparent py-3 font-sans text-body text-bone outline-none transition-colors focus:border-lime";
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-meta uppercase tracking-wide text-ash">
      {children}
    </label>
  );
}

function generateOrderNumber() {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `HH-ORD-${digits}`;
}

export default function CheckoutPage() {
  const { items, subtotalCents, clearCart, isHydrated } = useHydratedCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderEmail, setOrderEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setOrderEmail(typeof email === "string" ? email : "");
    setOrderNumber(generateOrderNumber());
    clearCart();
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

  if (orderNumber) {
    return (
      <main>
        <section className="border-b border-iron">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-24 text-center sm:px-8 lg:py-32">
            <p className="font-mono text-meta uppercase tracking-wide text-lime">Order confirmed</p>
            <h1 className="font-display text-[28px] text-white sm:text-display-sm">{orderNumber}</h1>
            <p className="max-w-md text-body-sm text-ash">
              Check your inbox. Your product will be delivered to {orderEmail} within the hour.
              Stripe integration coming soon — this is a demo.
            </p>
            <Link href="/products" className="btn-underline mt-4 text-lime">
              Back to shop
            </Link>
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
            Review your order, then tell us where to send it.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:py-[120px]">
          {/* ---- Delivery form ---------------------------------------- */}
          <form onSubmit={handleSubmit} className="order-2 space-y-8 lg:order-1">
            <div className="border border-lime bg-lime/10 px-4 py-3 font-mono text-meta text-lime">
              Digital delivery. Your guide/vendor access will be sent to your email within 1 hour
              of purchase.
            </div>

            <div>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass()}
              />
            </div>

            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                className={fieldClass()}
              />
            </div>

            <div>
              <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={fieldClass()}
              />
            </div>

            <SnakeCheckoutButton type="submit" className="min-h-[56px] w-full justify-center">
              Place order
            </SnakeCheckoutButton>
          </form>

          {/* ---- Order summary ------------------------------------------ */}
          <aside aria-label="Order summary" className="order-1 lg:order-2">
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
                    <p className="shrink-0 font-mono text-body-sm text-lime">
                      {formatPrice(product.priceCents * quantity)}
                    </p>
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
          </aside>
        </div>
      </section>
    </main>
  );
}
