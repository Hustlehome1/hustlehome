"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SnakeCheckoutButton from "@/components/SnakeCheckoutButton";
import VerifiedTick from "@/components/VerifiedTick";
import { useHydratedCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const {
    items,
    count,
    subtotalCents,
    isOpen,
    closeCart,
    incrementItem,
    decrementItem,
    removeItem,
  } = useHydratedCart();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);

    // Pin body to the current scroll position rather than just
    // `overflow: hidden` — plain overflow-hidden lets a fixed drawer's hit
    // area desync from where it's painted on iOS Safari once the page has
    // been scrolled, which reads as "taps do nothing."
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, closeCart]);

  function handleCheckout() {
    closeCart();
    router.push("/checkout");
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`cart-backdrop fixed inset-0 z-[60] bg-void/60 ${isOpen ? "open" : ""}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`cart-drawer fixed inset-y-0 right-0 z-[70] flex w-full flex-col border-l border-lime bg-void sm:w-[400px] ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-iron px-6 py-5">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-h3 text-white">Your Cart</h2>
            <span className="font-mono text-meta text-ash">
              {count} item{count === 1 ? "" : "s"}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="-mr-2.5 flex min-h-[44px] min-w-[44px] items-center justify-center font-mono text-body text-bone transition-colors hover:text-lime"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-h3 text-white">Cart&apos;s empty.</p>
            <p className="text-body-sm text-ash">
              Nothing in here yet — go find your next vendor.
            </p>
            <Link href="/products" onClick={closeCart} className="btn-underline text-lime">
              Shop products →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <ul className="divide-y divide-iron">
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
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-display text-body-sm text-bone">
                          {product.name}
                        </p>
                        <VerifiedTick className="shrink-0" />
                      </div>
                      <p className="mt-1 font-mono text-body-sm text-lime">
                        {formatPrice(product.priceCents)}
                      </p>
                      <div className="-ml-2.5 mt-1 flex items-center gap-1 font-mono text-body-sm">
                        <button
                          type="button"
                          onClick={() => decrementItem(product.id)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="flex min-h-[44px] min-w-[36px] items-center justify-center text-ash transition-colors hover:text-lime"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-bone">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => incrementItem(product.id)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="flex min-h-[44px] min-w-[36px] items-center justify-center text-ash transition-colors hover:text-lime"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="-mr-2 -mt-2 flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center self-start font-mono text-body-sm text-ash transition-colors hover:text-lime"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-iron px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-center justify-between font-mono text-body-sm text-bone">
                <span>Subtotal</span>
                <span className="text-lime">{formatPrice(subtotalCents)}</span>
              </div>
              <SnakeCheckoutButton
                onClick={handleCheckout}
                className="mt-4 min-h-[56px] w-full justify-center"
              >
                Checkout
              </SnakeCheckoutButton>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
