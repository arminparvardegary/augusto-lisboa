"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import LangToggle from "./LangToggle";

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

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

  const linkClass = cn(
    "text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-ochre",
    overHero ? "text-white/95" : "text-espresso/80",
  );

  const reserveClass = cn(
    "text-xs tracking-[0.2em] uppercase border-b border-ochre pb-1 hover:text-ochre transition-colors duration-300",
    overHero ? "text-white" : "text-espresso",
  );

  const mobileBtnClass = cn(
    "text-xs tracking-[0.2em] uppercase transition-colors duration-300",
    overHero ? "text-white" : "text-espresso",
  );

  const logoClass = cn(
    "h-9 w-auto md:h-11 transition-[filter] duration-300",
    overHero && "invert brightness-0",
  );

  const links = [
    { href: "/menu", key: "menu" as const },
    { href: "/story", key: "story" as const },
    { href: "/visit", key: "visit" as const },
  ];

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
            className="flex items-center"
            aria-label="Augusto Lisboa"
          >
            <Image
              src="/images/logo.png"
              alt="Augusto Lisboa"
              width={300}
              height={200}
              priority
              className={logoClass}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {t(l.key)}
              </Link>
            ))}
            <Link href="/reserve" className={reserveClass}>
              {t("reserve")}
            </Link>
            <LangToggle tone={overHero ? "light" : "dark"} />
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <LangToggle tone={overHero ? "light" : "dark"} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={mobileBtnClass}
              aria-label={t("openMenu")}
            >
              {t("openMenu")}
            </button>
          </div>
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
              <Image
                src="/images/logo.png"
                alt="Augusto Lisboa"
                width={300}
                height={200}
                className="h-10 w-auto invert brightness-0"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs tracking-[0.2em] uppercase"
                aria-label={t("closeMenu")}
              >
                {t("closeMenu")}
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
              {[
                { href: "/", key: "home" as const },
                ...links,
                { href: "/reserve", key: "reserve" as const },
              ].map((l) => (
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
                    {t(l.key)}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="absolute inset-x-0 bottom-0 px-6 py-8 text-xs tracking-[0.2em] uppercase text-cream/60">
              Rua de Belém · Lisboa
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
