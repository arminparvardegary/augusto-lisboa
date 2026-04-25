import type { Metadata } from "next";
import { format } from "date-fns";
import { pt as ptLocale, enGB } from "date-fns/locale";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "@/i18n/routing";
import { prisma, isDbConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "confirmed" });
  return { title: t("h1", { name: "" }).replace(",", "") };
}

export default async function Confirmed({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("confirmed");
  const { id } = await searchParams;
  const reservation =
    isDbConfigured && id
      ? await prisma.reservation
          .findUnique({ where: { id } })
          .catch(() => null)
      : null;

  const dateFnsLocale = locale === "pt" ? ptLocale : enGB;
  const firstName = reservation?.name?.split(" ")[0] ?? "amigo";
  const dateLabel = reservation
    ? format(reservation.date, "EEEE d MMMM", { locale: dateFnsLocale })
    : "";

  return (
    <section className="relative bg-cream pt-40 md:pt-56 pb-32 md:pb-48 min-h-[85vh]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12 text-center">
        <MaskedHeading
          text={t("h1", { name: firstName })}
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl text-espresso"
        />
        <ScrollReveal delay={0.3} className="mt-12 max-w-2xl mx-auto space-y-8">
          {reservation ? (
            <>
              <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
                {t("tableFor")} <strong>{reservation.partySize}</strong>{" "}
                {t("on")} <strong>{dateLabel}</strong> {t("at")}{" "}
                <strong>{reservation.timeSlot}</strong>.
              </p>
              <p className="text-espresso/70 leading-relaxed">
                {t("emailSent", { email: reservation.email })}
              </p>
            </>
          ) : (
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              {t("fallback")}{" "}
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
              {t("back")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
