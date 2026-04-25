import HeroParallax from "@/components/HeroParallax";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import ProjectCard from "@/components/ProjectCard";
import HorizontalScroll from "@/components/HorizontalScroll";
import MarqueeBand from "@/components/MarqueeBand";
import StickyBadge from "@/components/StickyBadge";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      <StickyBadge />

      <HeroParallax
        image={images.heroInterior}
        imageAlt="Sunlit arches and warm interior at Augusto Lisboa, Belém"
        headline="A better"
        scriptWord="morning"
        tail="in Belém."
        cta={{ href: "#story", label: "Begin the day" }}
      />

      <section id="story" className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-12">
              <MaskedHeading
                text="Augusto is a sunlit room on Rua de Belém — slow brunches, careful coffee, and a kitchen that treats every plate as a small, generous gesture."
                as="h2"
                className="text-4xl md:text-6xl lg:text-7xl text-espresso leading-[1.05]"
              />
              <ScrollReveal delay={0.4} className="mt-12 max-w-2xl">
                <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
                  Founded by a small family of cooks, baristas and gardeners, we
                  built Augusto as a place to slow down and start over — a long
                  table under the arches, a flat white made with intention, and
                  the soft hum of a neighbourhood waking up.
                </p>
                <Link
                  href="/story"
                  className="mt-10 inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
                >
                  Read our story <span className="text-ochre">→</span>
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
              alt="Café interior with warm arches and morning light"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <HorizontalScroll
        heading="A short menu, served with intention."
        cards={[
          { title: "Flat White", subtitle: "Coffee", image: images.coffeePour },
          { title: "Avocado Toast", subtitle: "Brunch", image: images.toast },
          { title: "Matcha Latte", subtitle: "Drinks", image: images.matchaWhisk },
          { title: "Croissant Beurre", subtitle: "Pastry", image: images.croissant },
          { title: "Garden Bowl", subtitle: "Plates", image: images.brunchOverhead },
        ]}
      />

      <section className="bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5 md:pt-32">
              <MaskedHeading
                text="Tiles, oak, and a long arched window."
                as="h2"
                className="text-4xl md:text-6xl text-espresso"
              />
              <ScrollReveal delay={0.3} className="mt-8 max-w-md">
                <p className="text-espresso/85 leading-relaxed">
                  We renovated a forgotten corner of Belém into a quiet,
                  Mediterranean room. Plaster walls, fluted counters, terracotta
                  floors and a long communal table where strangers become
                  regulars.
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7">
              <ArchedImage
                src={images.interiorWide}
                alt="Wide interior of Augusto Lisboa with terracotta floors"
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand
        items={["Specialty Coffee", "Brunch", "Belém · Lisboa", "Since 2021"]}
        tone="ochre"
      />

      <section className="bg-warmwhite py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 md:mb-24">
            <h2 className="heading-display text-espresso text-4xl md:text-6xl text-balance max-w-3xl">
              Four small <em className="script-accent text-ochre not-italic">menus</em>,
              changing with the season.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
            <ProjectCard
              title="The Bar"
              href="/menu#coffee"
              image={images.espresso}
            />
            <ProjectCard
              title="All Day"
              href="/menu#brunch"
              image={images.flatlayBrunch}
            />
            <ProjectCard
              title="Open-Faced"
              href="/menu#toasts"
              image={images.toast}
            />
            <ProjectCard
              title="From the Oven"
              href="/menu#pastry"
              image={images.pastries}
            />
          </div>

          <ScrollReveal className="mt-16 flex justify-end">
            <Link
              href="/menu"
              className="text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
            >
              View the full menu →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream border-y border-espresso/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-center">
            {["Tripadvisor 2025", "Time Out Lisboa", "Conde Nast", "Monocle"].map(
              (name) => (
                <ScrollReveal
                  key={name}
                  className="heading-display text-espresso/70 text-xl md:text-2xl text-center"
                >
                  <span>{name}</span>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-espresso text-cream py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20 items-end">
            <div className="md:col-span-7">
              <MaskedHeading
                text="Open daily from eight to six. The kettle is already warm."
                as="h2"
                className="text-4xl md:text-6xl lg:text-7xl text-cream"
              />
              <ScrollReveal delay={0.3} className="mt-10 flex flex-wrap gap-6">
                <Link
                  href="/visit"
                  className="text-sm tracking-[0.2em] uppercase text-cream border-b border-ochre pb-2 hover:text-ochre transition-colors"
                >
                  Plan your visit →
                </Link>
                <Link
                  href="/reserve"
                  className="text-sm tracking-[0.2em] uppercase text-cream border-b border-cream/40 pb-2 hover:text-ochre hover:border-ochre transition-colors"
                >
                  Reserve a table →
                </Link>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5">
              <ScrollReveal className="space-y-8">
                <div>
                  <p className="leading-relaxed text-cream/90">
                    Rua de Belém
                    <br />
                    1300-085 Lisboa, Portugal
                  </p>
                </div>
                <div>
                  <p className="leading-relaxed text-cream/90">
                    Monday — Sunday
                    <br />
                    8:00 — 18:00
                  </p>
                </div>
                <div>
                  <p className="leading-relaxed text-cream/90">
                    <a
                      href="https://instagram.com/augustolisboapt"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-ochre transition-colors"
                    >
                      @augustolisboapt
                    </a>
                    <br />
                    <a
                      href="mailto:hello@augustolisboa.com"
                      className="hover:text-ochre transition-colors"
                    >
                      hello@augustolisboa.com
                    </a>
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
