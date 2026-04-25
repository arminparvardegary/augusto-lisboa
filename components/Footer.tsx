import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import MarqueeBand from "./MarqueeBand";
import { site } from "@/lib/content";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const linkClass =
    "text-xs tracking-[0.2em] uppercase text-cream/70 hover:text-ochre transition-colors";

  return (
    <footer className="relative bg-espresso text-cream">
      <MarqueeBand
        items={[
          t("marquee.specialtyCoffee"),
          t("marquee.brunch"),
          t("marquee.belemLisboa"),
          t("marquee.since2021"),
          t("marquee.betterFood"),
          site.brand.instagramHandle,
        ]}
        tone="dark"
      />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-24 md:py-32">
        <Link
          href="/"
          aria-label="Augusto Lisboa"
          className="inline-block mb-16 md:mb-20"
        >
          <Image
            src="/images/logo.png"
            alt="Augusto Lisboa"
            width={400}
            height={266}
            className="h-12 w-auto md:h-14 invert brightness-0"
          />
        </Link>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="heading-display text-5xl md:text-7xl text-balance">
              {t("footer.headlineA")}{" "}
              <em className="script-accent text-ochre not-italic">
                {t("footer.headlineItalic")}
              </em>{" "}
              {t("footer.headlineB")}
            </h2>
          </div>

          <div className="md:col-span-3">
            <h3 className="heading-display text-cream/80 text-2xl mb-6">
              {t("footer.visit")}
            </h3>
            <p className="leading-relaxed text-cream/85">
              {site.contact.address.street}
              <br />
              {site.contact.address.postal} {site.contact.address.city}
              <br />
              {site.contact.address.country}
            </p>
            <p className="mt-6 leading-relaxed text-cream/85">
              {site.hoursShort}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="heading-display text-cream/80 text-2xl mb-6">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3 text-cream/85">
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
        </div>

        <div className="mt-24 flex flex-col-reverse gap-6 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-[0.2em] uppercase text-cream/50">
            © {year} Augusto Lisboa · Belém, Portugal
          </p>
          <nav className="flex flex-wrap gap-6">
            <Link href="/menu" className={linkClass}>{t("nav.menu")}</Link>
            <Link href="/story" className={linkClass}>{t("nav.story")}</Link>
            <Link href="/visit" className={linkClass}>{t("nav.visit")}</Link>
            <Link href="/reserve" className={linkClass}>{t("nav.reserve")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
