import type { Metadata } from "next";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import MarqueeBand from "@/components/MarqueeBand";
import Image from "next/image";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Augusto became a sunlit room on Rua de Belém — a small family of cooks, baristas and gardeners building a slow morning ritual.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="label-micro text-espresso/70">Our Story</div>
              <div className="label-micro text-espresso/70 mt-3">
                Belém · Since 2021
              </div>
            </div>
            <div className="md:col-span-8">
              <MaskedHeading
                text="A small family, a sunlit room, and the slow start of a neighbourhood."
                as="h1"
                className="text-5xl md:text-7xl lg:text-8xl text-espresso"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="relative w-full aspect-[16/9] arched bg-sand overflow-hidden">
            <Image
              src={images.exterior}
              alt="Augusto Lisboa exterior on Rua de Belém"
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
              <div className="label-micro text-espresso/65 mb-6">Chapter One</div>
              <MaskedHeading
                text="The Room"
                as="h2"
                className="text-4xl md:text-5xl text-espresso mb-8"
              />
            </div>
            <div className="md:col-span-6">
              <ScrollReveal>
                <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
                  In 2021 we found an empty corner shop on Rua de Belém —
                  cracked tile, a forgotten back garden, and a single tall
                  window that filled the room with afternoon light.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="mt-6">
                <p className="text-espresso/80 text-base md:text-lg leading-relaxed">
                  We saved the tiles. Plastered the walls a soft cream. Built a
                  long oak counter with a fluted base, and laid a terracotta
                  floor that warms in the morning sun. The room rebuilt itself
                  almost — we simply kept what was already beautiful.
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
              <div className="label-micro text-espresso/65 mb-6">Chapter Two</div>
              <MaskedHeading
                text="The People"
                as="h2"
                className="text-4xl md:text-5xl text-espresso mb-8"
              />
              <ScrollReveal>
                <p className="text-espresso/85 leading-relaxed">
                  Augusto is family in the small sense — five people who learned
                  to cook from grandmothers, who roast their own coffee in a
                  garage two streets over, and who tend a tiny garden of herbs
                  out back.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="mt-5">
                <p className="text-espresso/80 leading-relaxed">
                  We hire slowly. We stay open daily. We keep the menu short so
                  the cooking can stay generous.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand
        items={[
          "Slow Mornings",
          "Sunlit Rooms",
          "Considered Plates",
          "Made Carefully",
        ]}
        tone="ochre"
      />

      <section className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <div className="label-micro text-espresso/65 mb-6">Chapter Three</div>
              <MaskedHeading
                text="The Way We Cook"
                as="h2"
                className="text-4xl md:text-5xl text-espresso mb-8"
              />
              <ScrollReveal>
                <p className="text-espresso/85 leading-relaxed">
                  We buy from three farms in the Tagus valley, bake bread daily
                  and make our own jam in summer. Our coffee is roasted on
                  Tuesdays. The eggs come from a family in Sintra who name
                  their hens.
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
              <em className="script-accent text-ochre not-italic">"</em>
              We wanted a place where breakfast lasts as long as the coffee, and
              the coffee lasts as long as the conversation.
              <em className="script-accent text-ochre not-italic">"</em>
            </p>
            <footer className="mt-10 label-micro text-cream/60">
              — The Augusto Family
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
