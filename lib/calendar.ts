import ical, { type CalendarComponent, type EventInstance, type VEvent } from "node-ical";
import { SITE } from "./site";
import { formatTime } from "./timezone";

const ICS_URL =
  process.env.CALENDAR_ICS_URL ??
  "https://calendar.google.com/calendar/ical/mubarakmosque%40gmail.com/public/basic.ics";

export type MosqueEvent = {
  id: string;
  title: string;
  start: string;
  end: string | null;
  allDay: boolean;
  location: string;
  description: string;
};

function isVEvent(value: CalendarComponent): value is VEvent {
  return value.type === "VEVENT";
}

function asText(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value && "val" in value) {
    return String((value as { val: unknown }).val ?? "");
  }
  return String(value);
}

function instanceToEvent(instance: EventInstance): MosqueEvent {
  const start = instance.start;
  const end = instance.end;
  return {
    id: `${instance.event.uid}-${start.toISOString()}`,
    title: asText(instance.summary) || "Event",
    start: start.toISOString(),
    end: end ? end.toISOString() : null,
    allDay: instance.isFullDay,
    location: asText(instance.event.location),
    description: asText(instance.event.description).replace(/\n/g, " ").trim(),
  };
}

export async function fetchMosqueEvents(
  daysAhead = 60,
): Promise<MosqueEvent[]> {
  try {
    const res = await fetch(ICS_URL, {
      headers: { "User-Agent": "MubarakMosqueWebsite/1.0" },
      next: { revalidate: 900 },
    });
    if (!res.ok) throw new Error(`Calendar HTTP ${res.status}`);
    const body = await res.text();
    const parsed = ical.parseICS(body);
    const from = new Date();
    const to = new Date(from.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    const events: MosqueEvent[] = [];

    for (const item of Object.values(parsed)) {
      if (!item || !("type" in item) || !isVEvent(item)) continue;
      if (item.recurrenceid) continue;
      const instances = ical.expandRecurringEvent(item, {
        from,
        to,
        expandOngoing: true,
      });
      for (const instance of instances) {
        events.push(instanceToEvent(instance));
      }
    }

    return events
      .filter(
        (e) =>
          new Date(e.end ?? e.start).getTime() >= from.getTime() - 30 * 60 * 1000,
      )
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
  } catch (err) {
    console.error("Failed to load calendar", err);
    return [];
  }
}

export function groupEventsByDay(events: MosqueEvent[]) {
  const groups: { key: string; label: string; events: MosqueEvent[] }[] = [];
  const tz = SITE.timezone;
  for (const event of events) {
    const key = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(event.start));
    const label = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date(event.start));
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label, events: [] };
      groups.push(group);
    }
    group.events.push(event);
  }
  return groups;
}

export function eventTimeLabel(event: MosqueEvent) {
  if (event.allDay) return "All day";
  const start = formatTime(new Date(event.start));
  if (!event.end) return start;
  return `${start} – ${formatTime(new Date(event.end))}`;
}
