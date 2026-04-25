import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import ReserveFlow from "@/components/ReserveFlow";
import { images } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("reserve") };
}

export default async function ReservePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reserve");

  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MaskedHeading
            text={t("h1")}
            as="h1"
            className="text-5xl md:text-8xl lg:text-9xl text-espresso"
          />
          <ScrollReveal delay={0.4} className="mt-12 max-w-2xl">
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              {t("intro")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-4 hidden md:block">
              <ArchedImage
                src={images.table}
                alt="A long oak table at Augusto Lisboa"
                aspect="aspect-[3/4]"
                sizes="40vw"
                priority
              />
              <ScrollReveal delay={0.2} className="mt-10 space-y-6">
                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-2">
                    {t("smallerGroups")}
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    {t("smallerGroupsBody")}
                  </p>
                </div>
                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-2">
                    {t("largerTables")}
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    {t("largerTablesBody")}
                  </p>
                </div>
                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-2">
                    {t("cancellation")}
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    {t("cancellationBody")}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="md:col-span-8">
              <ReserveFlow />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
