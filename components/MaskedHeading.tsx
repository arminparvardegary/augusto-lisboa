"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export default function MaskedHeading({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag className={cn("heading-display text-balance", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mask-reveal mr-[0.25em] last:mr-0"
          >
            <motion.span
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
                delay: delay + i * stagger,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
