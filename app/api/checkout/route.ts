import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";
import { stripe } from "@/lib/stripe";

type CheckoutItem = { productId: string; quantity: number };

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = items.map(({ productId, quantity }) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) throw new Error(`Unknown product: ${productId}`);
      return {
        price: product.stripePriceId,
        quantity,
      };
    });

    const productIds = items.map((item) => item.productId);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
      metadata: {
        productIds: JSON.stringify(productIds),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
