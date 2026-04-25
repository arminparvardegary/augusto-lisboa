"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StickyBadge({
  label = "Travelers' Choice",
  sub = "2025",
}: {
  label?: string;
  sub?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col items-center gap-3">
        <motion.div
          style={{ rotate }}
          className="relative h-24 w-24 rounded-full border border-espresso/30"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <defs>
              <path
                id="badge-circle"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="fill-espresso text-[8px] tracking-[0.3em] uppercase">
              <textPath href="#badge-circle" startOffset="0">
                · Augusto Lisboa · Belém · Est. 2021 ·
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="script-accent text-espresso text-2xl">A</div>
          </div>
        </motion.div>
        <div className="text-center">
          <div className="label-micro text-espresso text-[9px]">{label}</div>
          <div className="label-micro text-espresso/60 text-[9px]">{sub}</div>
        </div>
      </div>
    </div>
  );
}
