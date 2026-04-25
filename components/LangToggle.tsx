"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export default function LangToggle({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: "en" | "pt") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const inactive =
    tone === "light"
      ? "text-white/65 hover:text-white"
      : "text-espresso/55 hover:text-espresso";
  const divider = tone === "light" ? "text-white/40" : "text-espresso/30";

  const btn = (target: "pt" | "en") => {
    const active = locale === target;
    return (
      <button
        type="button"
        onClick={() => switchTo(target)}
        disabled={isPending}
        aria-pressed={active}
        aria-label={`Switch to ${target.toUpperCase()}`}
        className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
          active ? "text-ochre" : inactive
        }`}
      >
        {target.toUpperCase()}
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {btn("pt")}
      <span className={divider}>·</span>
      {btn("en")}
    </div>
  );
}
