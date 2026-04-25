"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export type HorizontalCard = {
  title: string;
  subtitle: string;
  image: string;
};

export default function HorizontalScroll({
  cards,
  heading,
}: {
  cards: HorizontalCard[];
  heading: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const totalCards = cards.length;
  const moveDistance = `-${(totalCards - 1) * (100 / totalCards) - 5}%`;
  const x = useTransform(scrollYProgress, [0, 1], ["5%", moveDistance]);

  return (
    <section
      ref={ref}
      className="relative bg-warmwhite"
      style={{ height: `${totalCards * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="px-6 md:px-12 pt-28 md:pt-32 pb-8">
          <div className="mx-auto flex max-w-[1600px]">
            <h2 className="heading-display text-espresso text-3xl md:text-5xl text-balance md:max-w-2xl">
              {heading}
            </h2>
          </div>
        </div>

        <motion.div
          style={{ x }}
          className="flex flex-1 items-center gap-8 md:gap-12 pl-6 md:pl-12 pr-[30vw]"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="relative flex h-[60vh] w-[80vw] shrink-0 flex-col md:h-[68vh] md:w-[42vw]"
            >
              <div className="relative h-full w-full overflow-hidden bg-sand">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 768px) 42vw, 80vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-cream">
                  <div className="heading-display text-2xl md:text-4xl">
                    {card.title}
                  </div>
                  <div className="text-cream/80 text-sm md:text-base mt-1">
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="px-6 md:px-12 pb-10 pt-6">
          <div className="mx-auto max-w-[1600px] text-espresso/50 text-xs tracking-[0.2em] uppercase">
            Scroll to explore →
          </div>
        </div>
      </div>
    </section>
  );
}
