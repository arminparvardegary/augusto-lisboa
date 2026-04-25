# Augusto Lisboa

A luxury, scroll-driven marketing site for **Augusto Lisboa** — specialty coffee and brunch on Rua de Belém, Lisbon.

> **Better Food, Better Mood.**

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- Framer Motion · GSAP · Lenis (smooth inertia scroll)
- Embla Carousel · `next/font` · `next/image`
- Vercel deployment

## Motion DNA

The site borrows the editorial pacing of [oliviaharperhomes.com](https://oliviaharperhomes.com): a Lenis-powered smooth scroll, parallax hero, masked text reveals, an arched-image vocabulary, a pinned horizontal carousel, a marquee band and a luxury preloader.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Pages

- `/` — Homepage (parallax hero, intro, horizontal-scroll signature menu, four-card menu preview, press, visit block)
- `/menu` — Full menu, four sections: Coffee, Brunch, Toasts, Pastry
- `/story` — Three-chapter long-form scroll narrative
- `/visit` — Address, hours, map, when-to-come moments

## Accessibility

`prefers-reduced-motion` disables Lenis and dampens animations. All images carry alt text; the custom cursor is suppressed on coarse pointers.

---

© Augusto Lisboa · Belém · Est. 2021
