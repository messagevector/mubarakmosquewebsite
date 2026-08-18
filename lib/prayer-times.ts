import { getZonedParts, isFriday, parseTimeOnDay, zonedDate } from "./timezone";

const SHEET_ID =
  process.env.PRAYER_SHEET_ID ??
  "10gViR7ACGoFhAStQicyz_crxa1Qw19PQMWvqgo3Qv-8";
const SHEET_TAB = process.env.PRAYER_SHEET_TAB ?? "Summary";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_TAB)}`;

export type PrayerRow = {
  name: string;
  today: string;
  tomorrow: string;
  isJuma: boolean;
};

export type PrayerTimes = {
  todayLabel: string;
  tomorrowLabel: string;
  prayers: PrayerRow[];
  ramadan: { label: string; time: string }[];
  fetchedAt: string;
};

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function isValidTime(value: string) {
  return /^\d{1,2}:\d{2}\s*(AM|PM)$/i.test(value.trim());
}

export function parsePrayerCsv(csv: string): PrayerTimes {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const rows = lines.map(parseCsvLine);
  if (rows.length < 2) {
    throw new Error("Prayer sheet is empty");
  }

  const prayers: PrayerRow[] = [];
  const ramadan: { label: string; time: string }[] = [];
  let todayLabel = "";
  let tomorrowLabel = "";

  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    const name = (cols[0] ?? "").trim();
    const today = (cols[1] ?? "").trim();
    const tomorrow = (cols[2] ?? "").trim();
    const ramadanEvent = (cols[3] ?? "").trim();
    const ramadanTime = (cols[4] ?? "").trim();
    const dateA = (cols[6] ?? "").trim();
    const dateB = (cols[7] ?? "").trim();

    if (i === 1) {
      todayLabel = dateB || dateA;
    }
    if (i === 2 && dateA) {
      tomorrowLabel = dateA;
    }

    if (name && (isValidTime(today) || isValidTime(tomorrow))) {
      prayers.push({
        name,
        today,
        tomorrow,
        isJuma: /juma/i.test(name),
      });
    }

    if (
      ramadanEvent &&
      ramadanTime &&
      !/#REF!?/i.test(ramadanTime) &&
      ramadanTime !== "0" &&
      ramadanEvent !== "#REF!"
    ) {
      ramadan.push({
        label: ramadanEvent.replace(/:$/, ""),
        time: ramadanTime,
      });
    }
  }

  const now = getZonedParts();
  if (!todayLabel) {
    todayLabel = zonedDate(now.year, now.month, now.day).toLocaleDateString(
      "en-US",
      { weekday: "short", month: "short", day: "numeric" },
    );
  }
  if (!tomorrowLabel) {
    const tmr = zonedDate(now.year, now.month, now.day + 1);
    tomorrowLabel = tmr.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  return {
    todayLabel,
    tomorrowLabel,
    prayers,
    ramadan,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchPrayerTimes(): Promise<PrayerTimes | null> {
  try {
    const res = await fetch(CSV_URL, {
      headers: { "User-Agent": "MubarakMosqueWebsite/1.0" },
      next: { revalidate: 900 },
    });
    if (!res.ok) throw new Error(`Sheet HTTP ${res.status}`);
    const csv = await res.text();
    return parsePrayerCsv(csv);
  } catch (err) {
    console.error("Failed to load prayer times", err);
    return null;
  }
}

export type NextPrayer = {
  name: string;
  timeLabel: string;
  at: string;
  isTomorrow: boolean;
};

export function getNextPrayer(
  times: PrayerTimes,
  now = new Date(),
): NextPrayer | null {
  const parts = getZonedParts(now);
  const friday = isFriday(now);
  const candidates: NextPrayer[] = [];

  const addDay = (
    dayOffset: number,
    field: "today" | "tomorrow",
    isTomorrow: boolean,
  ) => {
    for (const prayer of times.prayers) {
      if (prayer.isJuma && !(friday && dayOffset === 0)) continue;
      if (!prayer.isJuma && friday && dayOffset === 0 && /zuhr/i.test(prayer.name)) {
        continue;
      }
      const label = prayer[field];
      const at = parseTimeOnDay(
        label,
        parts.year,
        parts.month,
        parts.day + dayOffset,
      );
      if (!at) continue;
      candidates.push({
        name: prayer.name.replace(/[()]/g, ""),
        timeLabel: label,
        at: at.toISOString(),
        isTomorrow,
      });
    }
  };

  addDay(0, "today", false);
  addDay(1, "tomorrow", true);

  const t = now.getTime();
  const upcoming = candidates
    .filter((c) => new Date(c.at).getTime() > t - 60_000)
    .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());

  return upcoming[0] ?? null;
}
