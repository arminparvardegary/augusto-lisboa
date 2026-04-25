import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma, isDbConfigured } from "@/lib/prisma";
import {
  HOLD_FEE_PER_PERSON_CENTS,
  TABLES_PER_SLOT,
  isWednesday,
} from "@/lib/availability";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getResend, FROM_EMAIL, isResendConfigured } from "@/lib/resend";
import { renderConfirmationEmail } from "@/emails/Confirmation";

export const dynamic = "force-dynamic";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  partySize: z.number().int().min(1).max(8),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().max(500).optional().or(z.literal("")),
  language: z.enum(["en", "pt"]).default("en"),
});

export async function POST(req: Request) {
  if (!isDbConfigured) {
    return NextResponse.json(
      {
        error:
          "Reservations are not yet enabled. Please email ola@augustolisboa.pt to book.",
        setupNeeded: true,
      },
      { status: 503 },
    );
  }

  let body: z.infer<typeof Schema>;
  try {
    body = Schema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (isWednesday(body.date)) {
    return NextResponse.json(
      { error: "We're closed on Wednesdays — please pick another day." },
      { status: 400 },
    );
  }

  const reservationDate = new Date(`${body.date}T${body.timeSlot}:00`);

  try {
    const taken = await prisma.reservation.count({
      where: {
        date: reservationDate,
        timeSlot: body.timeSlot,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (taken >= TABLES_PER_SLOT) {
      return NextResponse.json(
        { error: "That slot was just taken. Please pick another." },
        { status: 409 },
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        partySize: body.partySize,
        date: reservationDate,
        timeSlot: body.timeSlot,
        notes: body.notes || null,
        language: body.language,
        status: "PENDING",
        holdFeePaid: 0,
      },
    });

    // If Stripe is wired up, redirect to Checkout for the hold fee.
    if (isStripeConfigured) {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: body.email,
        line_items: [
          {
            price_data: {
              currency: "eur",
              unit_amount: HOLD_FEE_PER_PERSON_CENTS,
              product_data: {
                name: "Augusto Lisboa — Hold your table",
                description:
                  "€3 per person to hold your table — comes off your bill on the day.",
              },
            },
            quantity: body.partySize,
          },
        ],
        metadata: { reservationId: reservation.id },
        success_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/reserve/confirmed?id=${reservation.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/reserve?cancelled=1`,
      });

      await prisma.reservation.update({
        where: { id: reservation.id },
        data: { stripeId: session.id },
      });

      return NextResponse.json({
        mode: "stripe",
        url: session.url,
        reservationId: reservation.id,
      });
    }

    // No Stripe configured — confirm directly and send email if Resend is set up.
    const confirmed = await prisma.reservation.update({
      where: { id: reservation.id },
      data: { status: "CONFIRMED" },
    });

    if (isResendConfigured) {
      try {
        const html = await renderConfirmationEmail({
          name: confirmed.name,
          partySize: confirmed.partySize,
          date: confirmed.date,
          timeSlot: confirmed.timeSlot,
          holdFeePaid: confirmed.holdFeePaid,
        });
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: confirmed.email,
          subject: "We've saved your table at Augusto",
          html,
        });
      } catch (err) {
        console.error("email send failed", err);
      }
    }

    return NextResponse.json({
      mode: "direct",
      reservationId: confirmed.id,
      url: `/reserve/confirmed?id=${confirmed.id}`,
    });
  } catch (err) {
    console.error("reservation error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
