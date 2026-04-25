"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/visit", label: "Visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,backdrop-filter] duration-500",
          scrolled ? "py-3 backdrop-blur-md" : "py-6",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            scrolled ? "bg-cream/80 opacity-100" : "opacity-0",
          )}
        />
        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            aria-label="Augusto Lisboa home"
          >
            <span className="script-accent text-espresso text-2xl md:text-3xl leading-none">
              Augusto
            </span>
            <span className="label-micro text-espresso/60 hidden sm:inline">
              Lisboa
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-micro text-espresso/80 hover:text-ochre transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/visit"
              className="label-micro text-espresso border-b border-ochre pb-1 hover:text-ochre transition-colors"
            >
              Reserve
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden label-micro text-espresso"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-espresso text-cream md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="script-accent text-3xl">Augusto</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label-micro"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="flex flex-col gap-8 px-6 pt-16"
            >
              {[{ href: "/", label: "Home" }, ...links].map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="heading-display text-5xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="absolute inset-x-0 bottom-0 px-6 py-8 label-micro text-cream/60">
              Rua de Belém · Lisboa · @augustolisboapt
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
