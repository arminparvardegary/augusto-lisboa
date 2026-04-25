import { NextResponse } from "next/server";
import { addDays, startOfDay, endOfDay, format } from "date-fns";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getResend, FROM_EMAIL, isResendConfigured } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Vercel Cron sends an Authorization header. In production, require it.
  const auth = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    auth !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured || !isResendConfigured) {
    return NextResponse.json({ skipped: true, reason: "not configured" });
  }

  const tomorrow = addDays(new Date(), 1);
  const list = await prisma.reservation.findMany({
    where: {
      date: { gte: startOfDay(tomorrow), lte: endOfDay(tomorrow) },
      status: "CONFIRMED",
    },
  });

  const resend = getResend();
  let sent = 0;
  for (const r of list) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: r.email,
        subject: "Tomorrow at Augusto",
        text: `Olá ${r.name},\n\nJust a gentle nudge — we'll see you tomorrow at ${r.timeSlot} for ${r.partySize} ${r.partySize === 1 ? "person" : "people"}. The matcha's ready. Reply if anything's changed!\n\nAugusto Lisboa\nRua de Belém, 1300-085 Lisboa\n${format(r.date, "EEEE d MMMM")}`,
      });
      sent++;
    } catch (err) {
      console.error("reminder send failed", err);
    }
  }

  return NextResponse.json({ sent, total: list.length });
}
