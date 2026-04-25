import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getResend, FROM_EMAIL, isResendConfigured } from "@/lib/resend";
import { renderConfirmationEmail } from "@/emails/Confirmation";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isDbConfigured || !isStripeConfigured) {
    return NextResponse.json({ ok: true, skipped: true });
  }
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("webhook signature error", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const reservationId = session.metadata?.reservationId;
    if (!reservationId) {
      return NextResponse.json({ ok: true, skipped: "no metadata" });
    }

    const reservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "CONFIRMED",
        holdFeePaid: session.amount_total ?? 0,
      },
    });

    if (isResendConfigured) {
      try {
        const html = await renderConfirmationEmail({
          name: reservation.name,
          partySize: reservation.partySize,
          date: reservation.date,
          timeSlot: reservation.timeSlot,
          holdFeePaid: reservation.holdFeePaid,
        });
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: reservation.email,
          subject: "We've saved your table at Augusto",
          html,
        });
      } catch (err) {
        console.error("confirmation email failed", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
