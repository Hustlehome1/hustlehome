import { NextResponse } from "next/server";
import { DELIVERY_CONTENT } from "@/lib/delivery-content";
import { PRODUCTS } from "@/lib/products";
import { stripe } from "@/lib/stripe";

// Basic in-memory brute-force guard: not durable across server restarts or
// multiple instances, but enough to stop naive session_id enumeration from
// a single request path. Resets on deploy — that's fine, it's a speed bump,
// not the source of truth on payment (Stripe is).
const requestCounts = new Map<string, number>();
const MAX_REQUESTS_PER_SESSION = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const requestCount = requestCounts.get(sessionId) ?? 0;
    if (requestCount >= MAX_REQUESTS_PER_SESSION) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    requestCounts.set(sessionId, requestCount + 1);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not verified" }, { status: 403 });
    }

    const productIds: string[] = JSON.parse(session.metadata?.productIds ?? "[]");

    const products = productIds.map((id) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return {
        name: product?.name ?? id,
        content: DELIVERY_CONTENT[id] ?? "Content unavailable — contact support with your order details.",
      };
    });

    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delivery lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
