import type { Metadata } from "next";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import ReserveFlow from "@/components/ReserveFlow";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Reserve",
  description:
    "Hold your table at Augusto Lisboa with a small €3 per person, redeemable against your bill on the day.",
};

export default function ReservePage() {
  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MaskedHeading
            text="Save us a morning."
            as="h1"
            className="text-5xl md:text-8xl lg:text-9xl text-espresso"
          />
          <ScrollReveal delay={0.4} className="mt-12 max-w-2xl">
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              We hold tables with a small <strong>€3 per person</strong> — it
              comes straight off your bill when you arrive. It just helps us
              keep the kitchen calm and fair to everyone waiting.
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
                    Smaller groups
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    Two to four people — we&apos;ll always find a corner.
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
                    Cancellation
                  </h2>
                  <p className="text-espresso/80 leading-relaxed">
                    Refunded if you cancel at least 12 hours before. Just reply
                    to your confirmation email.
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
