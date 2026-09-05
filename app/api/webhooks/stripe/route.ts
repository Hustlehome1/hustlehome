import { NextResponse } from "next/server";

// TODO: Wire up email delivery (Resend/SendGrid) — verify webhook signature,
// on checkout.session.completed send delivery content to customer email
export async function POST(request: Request) {
  const event = await request.json();
  console.log("Stripe webhook event:", event.type);
  return NextResponse.json({ received: true });
}
