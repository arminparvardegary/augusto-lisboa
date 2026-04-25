import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import MarqueeBand from "@/components/MarqueeBand";
import Image from "next/image";
import { images } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("story") };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("story");
  const marquee = t.raw("marquee") as string[];

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

      <section className="bg-cream pb-32 md:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="relative w-full aspect-[16/9] arched bg-sand overflow-hidden">
            <Image
              src={images.exterior}
              alt="Augusto Lisboa exterior"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4 md:col-start-2">
              <MaskedHeading
                text={t("chapterOne")}
                as="h2"
                className="text-4xl md:text-5xl text-espresso mb-8"
              />
            </div>
            <div className="md:col-span-6">
              <ScrollReveal>
                <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
                  {t("chapterOneA")}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="mt-6">
                <p className="text-espresso/80 text-base md:text-lg leading-relaxed">
                  {t("chapterOneB")}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmwhite py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <ArchedImage
                src={images.founder}
                alt="The Augusto kitchen team"
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
            <div className="md:col-span-4 md:col-start-9 md:pt-32">
              <MaskedHeading
                text={t("chapterTwo")}
                as="h2"
                className="text-4xl md:text-5xl text-espresso mb-8"
              />
              <ScrollReveal>
                <p className="text-espresso/85 leading-relaxed">
                  {t("chapterTwoA")}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="mt-5">
                <p className="text-espresso/80 leading-relaxed">
                  {t("chapterTwoB")}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand items={marquee} tone="ochre" />

      <section className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <MaskedHeading
                text={t("chapterThree")}
                as="h2"
                className="text-4xl md:text-5xl text-espresso mb-8"
              />
              <ScrollReveal>
                <p className="text-espresso/85 leading-relaxed">
                  {t("chapterThreeA")}
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                <ArchedImage
                  src={images.greenJuice}
                  alt="Cold-pressed juice"
                  aspect="aspect-[3/4]"
                  sizes="(min-width: 768px) 30vw, 50vw"
                />
                <div className="md:pt-24">
                  <ArchedImage
                    src={images.detail}
                    alt="Plate detail"
                    aspect="aspect-[3/4]"
                    sizes="(min-width: 768px) 30vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-espresso text-cream py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <blockquote className="max-w-4xl">
            <p className="heading-display text-cream text-balance text-3xl md:text-5xl lg:text-6xl leading-[1.1]">
              <em className="script-accent text-ochre not-italic">&ldquo;</em>
              {t("quote")}
              <em className="script-accent text-ochre not-italic">&rdquo;</em>
            </p>
            <footer className="mt-10 text-xs tracking-[0.2em] uppercase text-cream/60">
              {t("quoteSig")}
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
