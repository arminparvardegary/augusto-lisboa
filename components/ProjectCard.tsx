"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export type ProjectCardProps = {
  title: string;
  href: string;
  image: string;
  arched?: boolean;
};

export default function ProjectCard({
  title,
  href,
  image,
  arched = true,
}: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 1.05 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`relative overflow-hidden bg-sand aspect-[3/4] ${arched ? "arched" : ""}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/0 to-ink/45 opacity-80" />
      </motion.div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="heading-display text-espresso text-2xl md:text-3xl">
          {title}
        </h3>
        <span
          aria-hidden
          className="text-ochre text-xl transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}
