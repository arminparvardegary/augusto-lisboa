"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export default function HeroParallax({
  image,
  imageAlt,
  headline,
  scriptWord,
  tail,
  cta,
}: {
  image: string;
  imageAlt: string;
  headline: string;
  scriptWord?: string;
  tail?: string;
  cta?: { href: string; label: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[110vh] w-full overflow-hidden bg-espresso"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 brand-tone"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/10 to-ink/55" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative flex h-full flex-col justify-end px-6 pb-24 md:px-12 md:pb-32"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <h1
            className={cn(
              "heading-display text-cream text-balance",
              "text-[clamp(3.5rem,12vw,14rem)]",
            )}
          >
            {headline}{" "}
            {scriptWord && (
              <em className="script-accent text-ochre not-italic">
                {scriptWord}
              </em>
            )}
            {tail && <span> {tail}</span>}
          </h1>

          {cta && (
            <div className="mt-10 flex items-center gap-6">
              <a
                href={cta.href}
                className="text-sm tracking-[0.2em] uppercase text-cream border-b border-ochre pb-2 hover:text-ochre transition-colors"
              >
                {cta.label}
              </a>
              <span aria-hidden className="text-ochre">
                ↓
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
