"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export default function ArchedImage({
  src,
  alt,
  priority = false,
  className,
  aspect = "aspect-[3/4]",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("relative w-full arched bg-sand brand-tone", aspect, className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </motion.div>
  );
}
