import type { Metadata } from "next";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import ReserveForm from "@/components/ReserveForm";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Reserve",
  description:
    "Book a table at Augusto Lisboa — for a small group, a quiet morning, or a slow brunch.",
};

export default function ReservePage() {
  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MaskedHeading
            text="Book a table."
            as="h1"
            className="text-5xl md:text-8xl lg:text-9xl text-espresso"
          />
          <ScrollReveal delay={0.4} className="mt-12 max-w-2xl">
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              Walk-ins are always welcome — and so is a quiet table held just
              for you. Tell us when, how many, and we'll write back the same
              day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <ArchedImage
                src={images.table}
                alt="A long oak table at Augusto Lisboa"
                aspect="aspect-[3/4]"
                sizes="(min-width: 768px) 40vw, 100vw"
                priority
              />
              <ScrollReveal delay={0.2} className="mt-10 space-y-6">
                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-2">
                    Smaller groups
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    Two to four people — usually no need to book. We'll always
                    find a corner.
                  </p>
                </div>
                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-2">
                    Larger tables
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    Five or more — please reserve so we can prepare the long
                    table at the back.
                  </p>
                </div>
                <div>
                  <h2 className="heading-display text-espresso text-2xl mb-2">
                    Private mornings
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    The whole room is available before 8:00 for events,
                    shoots and quiet meetings — write to{" "}
                    <a
                      href="mailto:hello@augustolisboa.com"
                      className="hover:text-ochre transition-colors border-b border-ochre"
                    >
                      hello@augustolisboa.com
                    </a>
                    .
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="md:col-span-7 md:pt-12">
              <ReserveForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-espresso text-cream py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 text-center">
          <h2 className="heading-display text-cream text-balance text-3xl md:text-5xl max-w-3xl mx-auto">
            We'll confirm by email within the day —
            <em className="script-accent text-ochre not-italic"> usually faster</em>.
          </h2>
        </div>
      </section>
    </>
  );
}
