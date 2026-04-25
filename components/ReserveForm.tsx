"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

const partySizes = ["2", "3", "4", "5", "6", "7+"];
const times = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
];
const weekendTimes = [
  "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

export default function ReserveForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = `Reservation request — ${data.get("name")} (${data.get("party")} on ${data.get("date")})`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      "",
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time")}`,
      `Party: ${data.get("party")}`,
      "",
      `Notes: ${data.get("notes") || "—"}`,
    ].join("\n");

    const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  const today = new Date().toISOString().slice(0, 10);

  const inputClass =
    "w-full bg-transparent border-b border-espresso/25 py-4 text-espresso text-lg placeholder:text-espresso/40 focus:outline-none focus:border-ochre transition-colors";
  const fieldLabel =
    "block text-xs tracking-[0.2em] uppercase text-espresso/60 mb-2";

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="border border-espresso/15 bg-warmwhite p-10 md:p-14"
        >
          <h2 className="heading-display text-espresso text-3xl md:text-5xl text-balance">
            Your email is on its{" "}
            <em className="script-accent text-ochre not-italic">way</em>.
          </h2>
          <p className="mt-6 text-espresso/80 leading-relaxed max-w-md">
            We've opened your mail app with the request pre-written — please
            send it and we'll write back the same day. If nothing opened, drop
            us a line at{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="hover:text-ochre transition-colors border-b border-ochre"
            >
              {site.contact.email}
            </a>{" "}
            or DM us on{" "}
            <a
              href={site.brand.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-ochre transition-colors border-b border-ochre"
            >
              Instagram
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-10 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-espresso border-b border-ochre pb-2 hover:text-ochre transition-colors"
          >
            Edit and resend →
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-10"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="name" className={fieldLabel}>
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Maria Silva"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={fieldLabel}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="maria@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <label htmlFor="date" className={fieldLabel}>
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={today}
                className={inputClass}
              />
              <p className="mt-2 text-espresso/45 text-xs">Closed Wednesdays.</p>
            </div>
            <div>
              <label htmlFor="time" className={fieldLabel}>
                Time
              </label>
              <select id="time" name="time" required className={inputClass} defaultValue="">
                <option value="" disabled>Choose</option>
                <optgroup label="Weekdays (10:00 – 15:30)">
                  {times.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
                <optgroup label="Weekends (09:30 – 16:00)">
                  {weekendTimes.map((t) => (
                    <option key={`w-${t}`} value={t}>{t}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div>
              <label htmlFor="party" className={fieldLabel}>
                Party Size
              </label>
              <select id="party" name="party" required className={inputClass} defaultValue="">
                <option value="" disabled>Choose</option>
                {partySizes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className={fieldLabel}>
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+351 ..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="notes" className={fieldLabel}>
              A note for the kitchen (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Allergies, occasion, a quiet corner — anything we should know."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group inline-flex items-center gap-3 bg-espresso text-cream px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-ochre hover:text-ink transition-colors duration-300"
            >
              Send request
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            <p className="mt-6 text-espresso/55 text-sm">
              Or message us on{" "}
              <a
                href={site.brand.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-ochre transition-colors border-b border-espresso/40 hover:border-ochre"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
