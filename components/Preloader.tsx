"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      return;
    }
    const start = performance.now();
    const min = 1700;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / min);
      const eased = 1 - Math.pow(1 - ratio, 2);
      setProgress(eased);
      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-center">
              <div className="script-accent text-espresso text-5xl md:text-6xl">Augusto</div>
              <div className="label-micro text-espresso/70 mt-2">Lisboa · Belém</div>
            </div>
            <div className="relative h-px w-48 overflow-hidden bg-espresso/15">
              <motion.div
                className="absolute inset-y-0 left-0 bg-ochre"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="text-espresso/50 text-[10px] tracking-[0.3em]">
              {Math.round(progress * 100).toString().padStart(2, "0")}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
