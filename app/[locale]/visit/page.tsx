import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import { Link } from "@/i18n/routing";
import { images } from "@/lib/images";
import { site } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("visit") };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("visit");

  const moments = [
    { label: t("moments.morningsLabel"), desc: t("moments.morningsDesc") },
    { label: t("moments.brunchLabel"), desc: t("moments.brunchDesc") },
    { label: t("moments.afternoonsLabel"), desc: t("moments.afternoonsDesc") },
  ];

  const hours = site.hours.map((h) => ({
    days: h.days,
    time: h.time === "Closed" ? t("closed") : h.time,
  }));

  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MaskedHeading
            text={t("h1")}
            as="h1"
            className="text-5xl md:text-7xl lg:text-8xl text-espresso"
          />
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <ArchedImage
                src={images.archedDoorway}
                alt="Augusto Lisboa entrance arch"
                aspect="aspect-[3/4]"
                sizes="(min-width: 768px) 40vw, 100vw"
                priority
              />
            </div>

            <div className="md:col-span-7 md:pt-12">
              <ScrollReveal className="space-y-12">
                <div>
                  <p className="heading-display text-espresso text-3xl md:text-4xl leading-snug">
                    {site.contact.address.street}
                    <br />
                    {site.contact.address.postal} {site.contact.address.city}
                    <br />
                    {site.contact.address.country}
                  </p>
                  <a
                    href={site.contact.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
                  >
                    {t("openMaps")} <span className="text-ochre">→</span>
                  </a>
                </div>

                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-4">
                    {t("hours")}
                  </h2>
                  <ul className="space-y-3">
                    {hours.map((h) => (
                      <li
                        key={h.days}
                        className="flex justify-between gap-4 text-espresso/85 text-base md:text-lg"
                      >
                        <span>{h.days}</span>
                        <span
                          className={`heading-display ${
                            h.time === t("closed")
                              ? "text-espresso/50 italic"
                              : "text-espresso"
                          }`}
                        >
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-4">
                    {t("reachUs")}
                  </h2>
                  <ul className="space-y-2 text-espresso/85">
                    <li>
                      <a
                        href={site.brand.instagramUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-ochre transition-colors"
                      >
                        {site.brand.instagramHandle}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="hover:text-ochre transition-colors"
                      >
                        {site.contact.email}
                      </a>
                    </li>
                    {site.contact.phone && (
                      <li>
                        <a
                          href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                          className="hover:text-ochre transition-colors"
                        >
                          {site.contact.phone}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <Link
                    href="/reserve"
                    className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
                  >
                    {t("reserveCta")} <span className="text-ochre">→</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmwhite py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16">
            <h2 className="heading-display text-espresso text-3xl md:text-5xl text-balance max-w-3xl">
              {t("momentsHeading")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {moments.map((m, i) => (
              <ScrollReveal
                key={m.label}
                delay={i * 0.1}
                className="border-t border-espresso/20 pt-6"
              >
                <h3 className="heading-display text-espresso text-3xl md:text-4xl mb-4">
                  {m.label}
                </h3>
                <p className="text-espresso/80 leading-relaxed">{m.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <h2 className="heading-display text-espresso text-3xl md:text-4xl text-balance">
                {t("findHeading")}
              </h2>
              <p className="mt-6 text-espresso/80 leading-relaxed max-w-md">
                {t("findBody")}
              </p>
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
              >
                {t("getDirections")} <span className="text-ochre">→</span>
              </a>
            </div>
            <div className="md:col-span-7">
              <div className="relative w-full aspect-[4/3] md:aspect-[5/4] arched bg-sand overflow-hidden border border-espresso/10">
                <iframe
                  title="Augusto Lisboa on Google Maps"
                  src={site.contact.mapsEmbedSrc}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ filter: "sepia(0.2) saturate(0.9)", border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
