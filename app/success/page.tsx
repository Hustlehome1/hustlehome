"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useHydratedCart } from "@/contexts/CartContext";

type DeliveryProduct = { name: string; content: string };

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function linkify(text: string) {
  const parts = text.split(URL_PATTERN);
  return parts.map((part, i) =>
    URL_PATTERN.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lime underline decoration-lime/40 underline-offset-2 hover:decoration-lime"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function DeliveryCard({ product }: { product: DeliveryProduct }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(product.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing to fall back to, button just won't confirm
    }
  }

  return (
    <div className="border border-iron bg-graphite">
      <div className="flex items-center justify-between border-b border-iron px-6 py-4">
        <h3 className="font-display text-h3 text-lime">{product.name}</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-underline shrink-0 text-body-sm text-bone"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words bg-[#0D0D0D] p-6 font-mono text-[14px] leading-relaxed text-bone">
        {linkify(product.content)}
      </pre>
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useHydratedCart();

  const [status, setStatus] = useState<"loading" | "verified" | "failed">("loading");
  const [products, setProducts] = useState<DeliveryProduct[]>([]);

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const res = await fetch(`/api/delivery?session_id=${encodeURIComponent(sessionId!)}`);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setStatus("failed");
          return;
        }
        setProducts(data.products ?? []);
        setStatus("verified");
        clearCart();
      } catch {
        if (!cancelled) setStatus("failed");
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
    // clearCart is stable (useCallback in CartContext) — safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (status === "loading") {
    return (
      <main>
        <section className="border-b border-iron">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-24 text-center sm:px-8 lg:py-32">
            <span
              aria-hidden="true"
              className="h-8 w-8 animate-spin rounded-full border-2 border-lime border-t-transparent"
            />
            <p className="font-mono text-body-sm text-lime">Verifying your payment…</p>
          </div>
        </section>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main>
        <section className="border-b border-iron">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-24 text-center sm:px-8 lg:py-32">
            <h1 className="font-display text-h1 text-white">Payment could not be verified</h1>
            <p className="max-w-md text-body-sm text-ash">
              We couldn&apos;t confirm this payment. If you were charged, please contact support
              with your order details and we&apos;ll sort it out.
            </p>
            <Link href="/products" className="btn-underline mt-4 text-lime">
              Back to shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-iron">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-20 text-center sm:px-8 lg:py-24">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-12 w-12 text-lime"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-mono text-meta uppercase tracking-wide text-lime">Payment confirmed</p>
          <h1 className="font-display text-h1 text-white">Order complete — here&apos;s what you bought:</h1>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[720px] space-y-6 px-5 py-16 sm:px-8">
          {products.map((product, i) => (
            <DeliveryCard key={i} product={product} />
          ))}

          <p className="pt-2 text-center text-body-sm text-ash">
            A confirmation has been sent to your email.
          </p>

          <div className="pt-4 text-center">
            <Link href="/products" className="btn-underline text-lime">
              Continue shopping →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main>
          <section className="border-b border-iron">
            <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-5 py-24 text-center sm:px-8 lg:py-32">
              <p className="font-mono text-body-sm text-lime">Verifying your payment…</p>
            </div>
          </section>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
