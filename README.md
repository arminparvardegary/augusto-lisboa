# Augusto Lisboa

A luxury, scroll-driven marketing site **plus a working reservation system** for **Augusto Lisboa** — specialty coffee and brunch on Rua de Belém, Lisbon.

> **Better Food, Better Mood.**

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- Framer Motion · GSAP · Lenis (smooth inertia scroll)
- Prisma + PostgreSQL · Stripe Checkout · Resend (transactional email)
- React Hook Form · date-fns · Zod
- Vercel deployment with daily Cron reminder

## Pages

- `/` — Homepage
- `/menu` — Full menu (Coffee, Brunch, Toasts, Pastry)
- `/story` — Long-form scroll narrative
- `/visit` — Address, hours, map
- `/reserve` — **Live availability calendar** with hold-the-table fee
- `/reserve/confirmed` — Booking confirmation

## Reservation system

`/reserve` shows a calendar of the next 21 days. Closed Wednesdays are visibly closed. Each 30-minute slot supports up to 6 tables. Customers pick a day, time, party size, and pay a **€3-per-person hold fee** (redeemable against the bill on the day). Stripe handles payment; Resend sends a warm confirmation email; a daily Vercel Cron sends reminders the evening before.

If `DATABASE_URL` isn't set, the page **gracefully falls back to a simple mailto form** — so the site is never broken, even before services are wired up.

### Setup (10 minutes)

1. **Create a Postgres database**
   - Easiest: [Vercel Postgres](https://vercel.com/dashboard/stores) → "Create Database" → link to the project. `DATABASE_URL` is auto-injected.
   - Alternatives: [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app).
2. **Push the schema**
   ```bash
   npm run db:push
   ```
3. **Stripe** — sign up at [stripe.com](https://stripe.com), get a secret key from Dashboard → Developers → API keys. Add to env vars:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   ```
   Add a webhook endpoint at `https://yourdomain.com/api/stripe/webhook` listening for `checkout.session.completed`. Copy the signing secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. **Resend** — sign up at [resend.com](https://resend.com), verify the `augustolisboa.pt` domain. Get an API key:
   ```
   RESEND_API_KEY=re_...
   ```
5. **Public URL & cron secret**
   ```
   NEXT_PUBLIC_URL=https://augustolisboa.pt
   CRON_SECRET=any-random-string
   ```
6. Redeploy. The full reservation flow is live.

See `.env.example` for the full list.

### Daily reminder cron

`vercel.json` schedules `/api/cron/reminders` to run every day at 18:00. It emails everyone with a confirmed booking for the next day. The route is auth-gated by `CRON_SECRET`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The reservation page falls back to mailto without env vars.

## Build

```bash
npm run build
npm start
```

## Accessibility

`prefers-reduced-motion` disables Lenis and dampens animations. Forms are keyboard navigable. All images carry descriptive alt text.

---

© Augusto Lisboa · Belém · Est. 2021
