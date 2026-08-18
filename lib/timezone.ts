import { SITE } from "./site";

const TZ = SITE.timezone;

export function getZonedParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    weekday: "short",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  const hour = parts.hour === "24" ? 0 : Number(parts.hour);
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour,
    minute: Number(parts.minute),
    second: Number(parts.second),
    weekday: parts.weekday,
  };
}

/** Milliseconds since epoch for a wall-clock time in America/New_York. */
export function zonedDate(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
) {
  // Compare UTC calendar numbers with New York calendar numbers so this
  // does not depend on the machine's local timezone. The previous
  // toLocaleString + Date parse approach shifted times by the host offset
  // (about 4 hours early on Eastern Windows).
  const want = Date.UTC(year, month - 1, day, hour, minute, second);
  let utc = want;
  for (let i = 0; i < 3; i++) {
    const p = getZonedParts(new Date(utc));
    const got = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    utc += want - got;
  }
  return new Date(utc);
}

export function parseTimeOnDay(
  timeLabel: string,
  year: number,
  month: number,
  day: number,
) {
  const match = timeLabel
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const mer = match[3].toUpperCase();
  if (mer === "PM" && hour !== 12) hour += 12;
  if (mer === "AM" && hour === 12) hour = 0;
  return zonedDate(year, month, day, hour, minute, 0);
}

export function formatDateLong(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function isFriday(date = new Date()) {
  return getZonedParts(date).weekday === "Fri";
}

export function startOfZonedDay(date = new Date()) {
  const p = getZonedParts(date);
  return zonedDate(p.year, p.month, p.day, 0, 0, 0);
}
