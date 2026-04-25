import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroParallax from "@/components/HeroParallax";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import ProjectCard from "@/components/ProjectCard";
import HorizontalScroll from "@/components/HorizontalScroll";
import MarqueeBand from "@/components/MarqueeBand";
import StickyBadge from "@/components/StickyBadge";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/lib/images";
import { site } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const cards = site.signatureCards.map((c) => ({
    title: c.title,
    subtitle: c.subtitle,
    image: images[c.imageKey],
  }));

  return (
    <>
      <StickyBadge />

      <HeroParallax
        image={images.heroInterior}
        imageAlt="Sunlit interior at Augusto Lisboa, Belém"
        headline={t("hero.headlineA")}
        scriptWord={t("hero.scriptWord")}
        tail={t("hero.headlineB")}
        cta={{ href: "#story", label: t("hero.cta") }}
      />

      <section id="story" className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-12">
              <MaskedHeading
                text={t("home.storyHeading")}
                as="h2"
                className="text-4xl md:text-6xl lg:text-7xl text-espresso leading-[1.05]"
              />
              <ScrollReveal delay={0.4} className="mt-12 max-w-2xl">
                <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
                  {t("home.storyBody")}
                </p>
                <Link
                  href="/story"
                  className="mt-10 inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
                >
                  {t("home.readStory")} <span className="text-ochre">→</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="relative w-full aspect-[16/10] arched bg-sand overflow-hidden">
            <Image
              src={images.archesInterior}
              alt="Café interior at Augusto Lisboa"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <HorizontalScroll
        heading={t("home.horizontalHeading")}
        cards={cards}
      />

      <section className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5 md:pt-32">
              <MaskedHeading
                text={t("home.spaceHeading")}
                as="h2"
                className="text-4xl md:text-6xl text-espresso"
              />
              <ScrollReveal delay={0.3} className="mt-8 max-w-md">
                <p className="text-espresso/85 leading-relaxed">
                  {t("home.spaceBody")}
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7">
              <ArchedImage
                src={images.interiorWide}
                alt="Wide interior of Augusto Lisboa"
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand
        items={[
          t("marquee.specialtyCoffee"),
          t("marquee.brunch"),
          t("marquee.belemLisboa"),
          t("marquee.since2021"),
        ]}
        tone="ochre"
      />

      <section className="bg-warmwhite py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 md:mb-24">
            <h2 className="heading-display text-espresso text-4xl md:text-6xl text-balance max-w-3xl">
              {t("home.menuPreviewHeadingA")}{" "}
              <em className="script-accent text-ochre not-italic">
                {t("home.menuPreviewHeadingItalic")}
              </em>
              {t("home.menuPreviewHeadingB")}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
            <ProjectCard
              title={t("home.categoryBar")}
              href="/menu#coffee"
              image={images.espresso}
            />
            <ProjectCard
              title={t("home.categoryAllDay")}
              href="/menu#brunch"
              image={images.brunchOverhead}
            />
            <ProjectCard
              title={t("home.categoryToasts")}
              href="/menu#toasts"
              image={images.avocadoToast}
            />
            <ProjectCard
              title={t("home.categoryPastry")}
              href="/menu#pastry"
              image={images.croissant}
            />
          </div>

          <ScrollReveal className="mt-16 flex justify-end">
            <Link
              href="/menu"
              className="text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
            >
              {t("home.viewMenu")} →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream border-y border-espresso/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-center">
            {site.press.map((p) => (
              <ScrollReveal key={p.name} className="text-center">
                <div className="heading-display text-espresso/80 text-xl md:text-2xl">
                  {p.name}
                </div>
                <div className="text-espresso/55 text-xs mt-1 tracking-[0.15em] uppercase">
                  {p.note}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-espresso text-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20 items-end">
            <div className="md:col-span-7">
              <MaskedHeading
                text={t("home.footerHeadline")}
                as="h2"
                className="text-4xl md:text-6xl lg:text-7xl text-cream"
              />
              <ScrollReveal delay={0.3} className="mt-10 flex flex-wrap gap-6">
                <Link
                  href="/visit"
                  className="text-sm tracking-[0.2em] uppercase text-cream border-b border-ochre pb-2 hover:text-ochre transition-colors"
                >
                  {t("home.planVisit")} →
                </Link>
                <Link
                  href="/reserve"
                  className="text-sm tracking-[0.2em] uppercase text-cream border-b border-cream/40 pb-2 hover:text-ochre hover:border-ochre transition-colors"
                >
                  {t("home.reserveTable")} →
                </Link>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5">
              <ScrollReveal className="space-y-8">
                <p className="leading-relaxed text-cream/90">
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.postal} {site.contact.address.city},{" "}
                  {site.contact.address.country}
                </p>
                <p className="leading-relaxed text-cream/90">
                  {site.hoursShort}
                </p>
                <p className="leading-relaxed text-cream/90">
                  <a
                    href={site.brand.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-ochre transition-colors"
                  >
                    {site.brand.instagramHandle}
                  </a>
                  <br />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="hover:text-ochre transition-colors"
                  >
                    {site.contact.email}
                  </a>
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
