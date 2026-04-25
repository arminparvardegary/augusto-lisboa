import type { Metadata } from "next";
import { format } from "date-fns";
import Link from "next/link";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { prisma, isDbConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reservation confirmed",
  description: "Your table at Augusto Lisboa is held. See you soon.",
};

export default async function Confirmed({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const reservation =
    isDbConfigured && id
      ? await prisma.reservation
          .findUnique({ where: { id } })
          .catch(() => null)
      : null;

  const firstName = reservation?.name?.split(" ")[0] ?? "friend";

  return (
    <section className="relative bg-cream pt-40 md:pt-56 pb-32 md:pb-48 min-h-[85vh]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12 text-center">
        <MaskedHeading
          text={`See you soon, ${firstName}.`}
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl text-espresso"
        />
        <ScrollReveal delay={0.3} className="mt-12 max-w-2xl mx-auto space-y-8">
          {reservation ? (
            <>
              <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
                Table for <strong>{reservation.partySize}</strong> on{" "}
                <strong>{format(reservation.date, "EEEE d MMMM")}</strong> at{" "}
                <strong>{reservation.timeSlot}</strong>.
              </p>
              <p className="text-espresso/70 leading-relaxed">
                A confirmation is on its way to{" "}
                <span className="text-espresso">{reservation.email}</span>. The
                kitchen&apos;s already excited.
              </p>
            </>
          ) : (
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              Your table is held. A confirmation should arrive in your inbox
              shortly — if not, email{" "}
              <a
                href="mailto:ola@augustolisboa.pt"
                className="border-b border-ochre hover:text-ochre transition-colors"
              >
                ola@augustolisboa.pt
              </a>
              .
            </p>
          )}

          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-espresso px-8 py-4 text-xs tracking-[0.25em] uppercase text-espresso hover:bg-espresso hover:text-cream transition-colors duration-300"
            >
              Back to Augusto
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
