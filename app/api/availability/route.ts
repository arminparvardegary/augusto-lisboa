import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";
import { isDbConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!isDbConfigured) {
    return NextResponse.json(
      { error: "Reservations are temporarily unavailable.", setupNeeded: true },
      { status: 503 },
    );
  }

  try {
    const data = await getAvailability();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("availability error", err);
    return NextResponse.json(
      { error: "Could not load availability." },
      { status: 500 },
    );
  }
}
