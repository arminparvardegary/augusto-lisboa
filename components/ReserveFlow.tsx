"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import ReserveForm from "./ReserveForm";

type Slot = { time: string; available: boolean; remaining: number };
type Day = {
  date: string;
  label: string;
  weekday: string;
  dayOfMonth: string;
  month: string;
  isClosed: boolean;
  closedReason?: string;
  slots: Slot[];
};

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  partySize: number;
  notes?: string;
};

type Status =
  | { kind: "loading" }
  | { kind: "ready"; days: Day[] }
  | { kind: "fallback"; reason: string };

export default function ReserveFlow() {
  const t = useTranslations("reserve");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>({ kind: "loading" });
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { partySize: 2 } });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/availability")
      .then(async (r) => {
        if (!r.ok) {
          const data = await r.json().catch(() => ({}));
          return { fallback: true, reason: data.error ?? "unavailable" };
        }
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if ((data as { fallback?: boolean }).fallback) {
          setStatus({
            kind: "fallback",
            reason: (data as { reason: string }).reason,
          });
        } else {
          setStatus({ kind: "ready", days: (data as { days: Day[] }).days });
        }
      })
      .catch(() => {
        if (!cancelled)
          setStatus({ kind: "fallback", reason: "Could not reach server" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const day =
    status.kind === "ready"
      ? status.days.find((d) => d.date === selectedDay)
      : undefined;

  async function onSubmit(values: FormValues) {
    if (!selectedDay || !selectedSlot) return;
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          partySize: Number(values.partySize),
          date: selectedDay,
          timeSlot: selectedSlot,
          language: locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || t("errorGeneric"));
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      setServerError(t("errorNetwork"));
      setSubmitting(false);
    }
  }

  if (status.kind === "loading") {
    return (
      <div className="flex items-center gap-3 text-espresso/60 text-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-ochre animate-pulse" />
        {t("loading")}
      </div>
    );
  }

  if (status.kind === "fallback") {
    return (
      <div className="space-y-8">
        <div className="border-l-2 border-ochre/70 pl-5 text-espresso/75 text-sm">
          {t("fallback")}
        </div>
        <ReserveForm />
      </div>
    );
  }

  const { days } = status;

  return (
    <div className="space-y-12">
      <section>
        <h2 className="heading-display text-espresso text-2xl md:text-3xl mb-6">
          {t("pickDay")}
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-4" data-lenis-prevent>
          {days.map((d) => {
            const active = d.date === selectedDay;
            return (
              <button
                key={d.date}
                type="button"
                disabled={d.isClosed}
                onClick={() => {
                  setSelectedDay(d.date);
                  setSelectedSlot("");
                }}
                className={[
                  "min-w-[6.5rem] flex-shrink-0 border px-4 py-4 text-left transition-all duration-300",
                  d.isClosed
                    ? "cursor-not-allowed border-espresso/10 bg-cream text-espresso/30"
                    : active
                      ? "border-ochre bg-ochre text-ink shadow-sm"
                      : "border-espresso/15 bg-warmwhite text-espresso hover:border-ochre",
                ].join(" ")}
              >
                <div className="text-[10px] tracking-[0.2em] uppercase">
                  {d.weekday}
                </div>
                <div className="heading-display text-3xl mt-1">
                  {d.dayOfMonth}
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase mt-1 opacity-70">
                  {d.isClosed ? d.closedReason : d.month}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {day && !day.isClosed && (
          <motion.section
            key={day.date}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="heading-display text-espresso text-2xl md:text-3xl mb-6">
              {t("pickTime")}
            </h2>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
              {day.slots.map((s) => (
                <button
                  key={s.time}
                  type="button"
                  disabled={!s.available}
                  onClick={() => setSelectedSlot(s.time)}
                  className={[
                    "border px-3 py-3 text-sm transition-all duration-300",
                    !s.available
                      ? "cursor-not-allowed border-espresso/10 text-espresso/30 line-through"
                      : selectedSlot === s.time
                        ? "border-ochre bg-ochre text-ink"
                        : "border-espresso/20 text-espresso hover:border-ochre",
                  ].join(" ")}
                >
                  {s.time}
                </button>
              ))}
            </div>
            {day.slots.every((s) => !s.available) && (
              <p className="mt-4 text-sm text-espresso/60 italic">
                {t("fullyBooked")}
              </p>
            )}
          </motion.section>
        )}

        {day?.isClosed && (
          <motion.div
            key="closed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-blush/40 p-6 border-l-2 border-ochre/70"
          >
            <p className="text-espresso/85 leading-relaxed">
              {t("closedNotice", { reason: day.closedReason ?? "" })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDay && selectedSlot && (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8 pt-4 border-t border-espresso/15"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field
                label={t("name")}
                error={errors.name?.message}
                inputId="name"
              >
                <input
                  id="name"
                  {...register("name", { required: t("nameRequired") })}
                  className={inputClass}
                  placeholder={t("namePlaceholder")}
                />
              </Field>
              <Field
                label={t("email")}
                error={errors.email?.message}
                inputId="email"
              >
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: { value: /\S+@\S+\.\S+/, message: t("emailInvalid") },
                  })}
                  className={inputClass}
                  placeholder={t("emailPlaceholder")}
                />
              </Field>
              <Field label={t("phone")} inputId="phone">
                <input
                  id="phone"
                  {...register("phone")}
                  className={inputClass}
                  placeholder={t("phonePlaceholder")}
                />
              </Field>
              <Field label={t("partySize")} inputId="partySize">
                <select
                  id="partySize"
                  {...register("partySize", { valueAsNumber: true })}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t("person") : t("people")}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={t("notes")} inputId="notes">
              <textarea
                id="notes"
                {...register("notes")}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder={t("notesPlaceholder")}
              />
            </Field>

            <p className="text-xs text-espresso/55 leading-relaxed">
              {t("policyNote")}
            </p>

            {serverError && (
              <div className="border-l-2 border-red-700 pl-4 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 bg-espresso text-cream px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-ochre hover:text-ink transition-colors duration-300 disabled:opacity-50"
            >
              {submitting ? t("submitting") : t("submit")}
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full bg-transparent border border-espresso/15 bg-warmwhite px-4 py-3 text-espresso placeholder:text-espresso/30 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20 transition-colors";

function Field({
  label,
  error,
  inputId,
  children,
}: {
  label: string;
  error?: string;
  inputId?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={inputId} className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] uppercase text-espresso/60">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-red-700">{error}</span>
      )}
    </label>
  );
}
