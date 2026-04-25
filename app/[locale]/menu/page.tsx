import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import MarqueeBand from "@/components/MarqueeBand";
import { images } from "@/lib/images";

type SectionKey = "coffee" | "brunch" | "toasts" | "pastry";

const SECTIONS: {
  id: SectionKey;
  image: string;
  itemKeys: string[];
  prices: Record<string, string>;
}[] = [
  {
    id: "coffee",
    image: images.espresso,
    itemKeys: ["espresso", "macchiato", "flatWhite", "cortado", "filter", "icedLatte"],
    prices: {
      espresso: "1.80",
      macchiato: "2.20",
      flatWhite: "3.20",
      cortado: "2.60",
      filter: "3.80",
      icedLatte: "3.80",
    },
  },
  {
    id: "brunch",
    image: images.brunchOverhead,
    itemKeys: ["gardenBowl", "eggsAugusto", "shakshuka", "smokedSalmon", "pancakes"],
    prices: {
      gardenBowl: "12",
      eggsAugusto: "11",
      shakshuka: "13",
      smokedSalmon: "14",
      pancakes: "10",
    },
  },
  {
    id: "toasts",
    image: images.avocadoToast,
    itemKeys: ["avocado", "ricotta", "tomate", "mushroom"],
    prices: { avocado: "9", ricotta: "8", tomate: "9", mushroom: "11" },
  },
  {
    id: "pastry",
    image: images.pastries,
    itemKeys: ["croissant", "painChocolat", "pastel", "almondCake", "bananaBread"],
    prices: {
      croissant: "2.80",
      painChocolat: "3.20",
      pastel: "1.80",
      almondCake: "4.50",
      bananaBread: "4",
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("menu") };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("menuPage");
  const marquee = t.raw("marquee") as string[];

  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MaskedHeading
            text={t("h1")}
            as="h1"
            className="text-5xl md:text-8xl lg:text-9xl text-espresso"
          />
          <ScrollReveal delay={0.4} className="mt-16 max-w-2xl">
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              {t("intro")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeBand items={marquee} tone="light" />

      {SECTIONS.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-32 md:py-48 ${idx % 2 === 0 ? "bg-cream" : "bg-warmwhite"}`}
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
              <div
                className={`md:col-span-5 ${idx % 2 === 1 ? "md:order-2" : ""}`}
              >
                <ArchedImage
                  src={section.image}
                  alt={t(`sections.${section.id}.heading`)}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>

              <div className="md:col-span-7 md:pt-12">
                <MaskedHeading
                  text={t(`sections.${section.id}.heading`)}
                  as="h2"
                  className="text-4xl md:text-6xl text-espresso mb-12 md:mb-16"
                />

                <ul className="divide-y divide-espresso/15">
                  {section.itemKeys.map((key) => (
                    <li
                      key={key}
                      className="flex items-baseline justify-between gap-6 py-5 md:py-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="heading-display text-espresso text-2xl md:text-3xl">
                            {t(`sections.${section.id}.items.${key}.name`)}
                          </span>
                          <span className="hidden md:inline flex-1 border-b border-dotted border-espresso/30 mx-2" />
                        </div>
                        <p className="text-espresso/65 text-sm md:text-base mt-1">
                          {t(`sections.${section.id}.items.${key}.desc`)}
                        </p>
                      </div>
                      <span className="heading-display text-espresso/85 text-xl md:text-2xl">
                        €{section.prices[key]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-espresso text-cream py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 text-center">
          <h2 className="heading-display text-cream text-balance text-3xl md:text-5xl max-w-3xl mx-auto">
            {t("askNote")}
            <em className="script-accent text-ochre not-italic"> {t("askNoteItalic")}</em>.
          </h2>
        </div>
      </section>
    </>
  );
}
