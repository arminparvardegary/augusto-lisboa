import type { Metadata } from "next";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Augusto Lisboa on Rua de Belém. Open daily 8:00 — 18:00. Walk-ins welcome, larger groups by message.",
};

const hours = [
  { day: "Monday — Friday", time: "8:00 — 18:00" },
  { day: "Saturday", time: "9:00 — 18:00" },
  { day: "Sunday", time: "9:00 — 17:00" },
];

const moments = [
  {
    label: "Mornings",
    desc: "Quiet from 8 to 10 — the best time for a long table and a good book.",
  },
  {
    label: "Brunch",
    desc: "Busiest from 11 to 14, especially on weekends. Walk-ins welcome.",
  },
  {
    label: "Afternoons",
    desc: "After 15:00 the room thins out — pastries, filter coffee, slow conversation.",
  },
];

export default function VisitPage() {
  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="label-micro text-espresso/70">Visit</div>
              <div className="label-micro text-espresso/70 mt-3">Belém · Lisboa</div>
            </div>
            <div className="md:col-span-8">
              <MaskedHeading
                text="Come sit. The kettle is already warm."
                as="h1"
                className="text-5xl md:text-7xl lg:text-8xl text-espresso"
              />
            </div>
          </div>
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
                  <div className="label-micro text-espresso/65 mb-4">Address</div>
                  <p className="heading-display text-espresso text-3xl md:text-4xl leading-snug">
                    Rua de Belém
                    <br />
                    1300-085 Lisboa
                    <br />
                    Portugal
                  </p>
                  <a
                    href="https://maps.google.com/?q=Rua+de+Belém+Lisboa"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-2 label-micro text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
                  >
                    Open in Maps <span className="text-ochre">→</span>
                  </a>
                </div>

                <div>
                  <div className="label-micro text-espresso/65 mb-4">Hours</div>
                  <ul className="space-y-3">
                    {hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex justify-between gap-4 text-espresso/85 text-base md:text-lg"
                      >
                        <span>{h.day}</span>
                        <span className="heading-display text-espresso">
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="label-micro text-espresso/65 mb-4">Reach Us</div>
                  <ul className="space-y-2 text-espresso/85">
                    <li>
                      <a
                        href="https://instagram.com/augustolisboapt"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-ochre transition-colors"
                      >
                        @augustolisboapt
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:hello@augustolisboa.com"
                        className="hover:text-ochre transition-colors"
                      >
                        hello@augustolisboa.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+351210000000"
                        className="hover:text-ochre transition-colors"
                      >
                        +351 21 000 0000
                      </a>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmwhite py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="label-micro text-espresso/65">When to come</div>
            </div>
            <div className="md:col-span-8">
              <h2 className="heading-display text-espresso text-3xl md:text-5xl text-balance">
                Three quiet windows in the day.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {moments.map((m, i) => (
              <ScrollReveal
                key={m.label}
                delay={i * 0.1}
                className="border-t border-espresso/20 pt-6"
              >
                <div className="label-micro text-espresso/65 mb-4">
                  0{i + 1}
                </div>
                <h3 className="heading-display text-espresso text-3xl md:text-4xl mb-4">
                  {m.label}
                </h3>
                <p className="text-espresso/80 leading-relaxed">{m.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="relative w-full aspect-[16/9] arched bg-sand overflow-hidden">
            <iframe
              title="Augusto Lisboa map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-9.2090%2C38.6960%2C-9.1880%2C38.7060&amp;layer=mapnik&amp;marker=38.6975%2C-9.2030"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              style={{ filter: "sepia(0.25) saturate(0.85) hue-rotate(-10deg)" }}
            />
          </div>
          <div className="mt-6 flex justify-between label-micro text-espresso/55">
            <span>Belém · Rua de Belém</span>
            <a
              href="https://maps.google.com/?q=Rua+de+Belém+Lisboa"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-ochre transition-colors"
            >
              Get directions →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
