import { addDays, format, getDay, startOfDay } from "date-fns";
import { prisma } from "./prisma";

const SCHEDULE: Record<number, { open: string; close: string } | null> = {
  0: { open: "09:30", close: "16:00" },
  1: { open: "10:00", close: "15:30" },
  2: { open: "10:00", close: "15:30" },
  3: null,
  4: { open: "10:00", close: "15:30" },
  5: { open: "10:00", close: "15:30" },
  6: { open: "09:30", close: "16:00" },
};

export const SLOT_INTERVAL_MIN = 30;
export const TABLES_PER_SLOT = 6;
export const MAX_PARTY_SIZE = 8;
export const ADVANCE_DAYS = 21;
export const MIN_LEAD_HOURS = 2;
export const HOLD_FEE_PER_PERSON_CENTS = 300;

function generateSlots(open: string, close: string): string[] {
  const slots: string[] = [];
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  let mins = oh * 60 + om;
  const endMins = ch * 60 + cm - 60;
  while (mins <= endMins) {
    slots.push(
      `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`,
    );
    mins += SLOT_INTERVAL_MIN;
  }
  return slots;
}

export type DayAvailability = {
  date: string;
  label: string;
  weekday: string;
  dayOfMonth: string;
  month: string;
  isClosed: boolean;
  closedReason?: string;
  slots: { time: string; available: boolean; remaining: number }[];
};

export async function getAvailability(fromDate = new Date()) {
  const start = startOfDay(fromDate);
  const days: DayAvailability[] = [];

  const end = addDays(start, ADVANCE_DAYS);
  const [closures, reservations] = await Promise.all([
    prisma.closure.findMany({ where: { date: { gte: start, lte: end } } }),
    prisma.reservation.findMany({
      where: {
        date: { gte: start, lte: end },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      select: { date: true, timeSlot: true, partySize: true },
    }),
  ]);

  for (let i = 0; i < ADVANCE_DAYS; i++) {
    const day = addDays(start, i);
    const dow = getDay(day);
    const schedule = SCHEDULE[dow];
    const dayKey = format(day, "yyyy-MM-dd");
    const closure = closures.find(
      (c) => format(c.date, "yyyy-MM-dd") === dayKey,
    );

    const base = {
      date: dayKey,
      label: format(day, "EEE d MMM"),
      weekday: format(day, "EEE"),
      dayOfMonth: format(day, "d"),
      month: format(day, "MMM"),
    };

    if (!schedule || closure) {
      days.push({
        ...base,
        isClosed: true,
        closedReason:
          closure?.reason ?? (dow === 3 ? "Closed Wednesdays" : "Closed"),
        slots: [],
      });
      continue;
    }

    const slots = generateSlots(schedule.open, schedule.close).map((time) => {
      const taken = reservations.filter(
        (r) =>
          format(r.date, "yyyy-MM-dd") === dayKey && r.timeSlot === time,
      ).length;

      const slotDate = new Date(`${dayKey}T${time}:00`);
      const leadOk =
        slotDate.getTime() - Date.now() > MIN_LEAD_HOURS * 3600 * 1000;

      return {
        time,
        available: taken < TABLES_PER_SLOT && leadOk,
        remaining: Math.max(0, TABLES_PER_SLOT - taken),
      };
    });

    days.push({
      ...base,
      isClosed: false,
      slots,
    });
  }

  return { days, maxPartySize: MAX_PARTY_SIZE };
}

export function isWednesday(dateStr: string) {
  return getDay(new Date(`${dateStr}T12:00:00`)) === 3;
}
