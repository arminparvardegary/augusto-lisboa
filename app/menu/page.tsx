import type { Metadata } from "next";
import MaskedHeading from "@/components/MaskedHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ArchedImage from "@/components/ArchedImage";
import MarqueeBand from "@/components/MarqueeBand";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "A short, seasonal menu — specialty coffee, all-day brunch, open-faced toasts and pastry from the oven.",
};

const sections = [
  {
    id: "coffee",
    heading: "Coffee, made slowly.",
    image: images.espresso,
    items: [
      { name: "Espresso", desc: "Single origin, rotating", price: "1.80" },
      { name: "Macchiato", desc: "Espresso · steamed milk", price: "2.20" },
      { name: "Flat White", desc: "Double ristretto · silk milk", price: "3.20" },
      { name: "Cortado", desc: "Lisboa house style", price: "2.60" },
      { name: "Filter", desc: "V60 — ask the barista", price: "3.80" },
      { name: "Iced Latte", desc: "Cold brew · oat", price: "3.80" },
    ],
  },
  {
    id: "brunch",
    heading: "Brunch, until the room empties.",
    image: images.brunchOverhead,
    items: [
      { name: "Garden Bowl", desc: "Roasted veg · grains · tahini", price: "12" },
      { name: "Eggs Augusto", desc: "Sourdough · poached · brown butter", price: "11" },
      { name: "Shakshuka", desc: "Heirloom tomato · feta · herbs", price: "13" },
      { name: "Smoked Salmon", desc: "Cream cheese · capers · dill", price: "14" },
      { name: "Pancakes", desc: "Buttermilk · seasonal fruit · maple", price: "10" },
    ],
  },
  {
    id: "toasts",
    heading: "Toasts, on country sourdough.",
    image: images.toast,
    items: [
      { name: "Avocado", desc: "Lemon · chili · olive oil", price: "9" },
      { name: "Ricotta & Honey", desc: "Thyme · sea salt", price: "8" },
      { name: "Tomate", desc: "Heirloom · basil · garlic rub", price: "9" },
      { name: "Mushroom", desc: "Smoked butter · parsley · egg", price: "11" },
    ],
  },
  {
    id: "pastry",
    heading: "Pastry, baked at six.",
    image: images.pastries,
    items: [
      { name: "Croissant Beurre", desc: "72-hour laminated", price: "2.80" },
      { name: "Pain au Chocolat", desc: "Belgian chocolate", price: "3.20" },
      { name: "Pastel de Nata", desc: "Augusto's recipe", price: "1.80" },
      { name: "Almond Cake", desc: "Olive oil · orange zest", price: "4.50" },
      { name: "Banana Bread", desc: "Brown butter · walnut", price: "4" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      <section className="relative bg-cream pt-40 md:pt-56 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MaskedHeading
            text="A short menu, written every season."
            as="h1"
            className="text-5xl md:text-8xl lg:text-9xl text-espresso"
          />
          <ScrollReveal delay={0.4} className="mt-16 max-w-2xl">
            <p className="text-espresso/85 text-lg md:text-xl leading-relaxed">
              We cook with what is grown nearby and roast our coffee a few
              streets over. The menu is short on purpose — a small selection,
              made carefully, served warmly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeBand
        items={[
          "Specialty Coffee",
          "Seasonal Brunch",
          "Open-Faced Toasts",
          "Pastry From the Oven",
        ]}
        tone="light"
      />

      {sections.map((section, idx) => (
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
                  alt={section.heading}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>

              <div className="md:col-span-7 md:pt-12">
                <MaskedHeading
                  text={section.heading}
                  as="h2"
                  className="text-4xl md:text-6xl text-espresso mb-12 md:mb-16"
                />

                <ul className="divide-y divide-espresso/15">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-6 py-5 md:py-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="heading-display text-espresso text-2xl md:text-3xl">
                            {item.name}
                          </span>
                          <span className="hidden md:inline flex-1 border-b border-dotted border-espresso/30 mx-2" />
                        </div>
                        <p className="text-espresso/65 text-sm md:text-base mt-1">
                          {item.desc}
                        </p>
                      </div>
                      <span className="heading-display text-espresso/85 text-xl md:text-2xl">
                        €{item.price}
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
            Dietary needs, allergies, or a quiet table for two —
            <em className="script-accent text-ochre not-italic"> just ask</em>.
          </h2>
        </div>
      </section>
    </>
  );
}
