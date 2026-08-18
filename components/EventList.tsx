import Link from "next/link";
import { eventTimeLabel, groupEventsByDay, type MosqueEvent } from "@/lib/calendar";

export default function EventList({
  events,
  limit,
  showAllLink = false,
}: {
  events: MosqueEvent[];
  limit?: number;
  showAllLink?: boolean;
}) {
  const sliced = limit ? events.slice(0, limit) : events;
  const groups = groupEventsByDay(sliced);

  if (!groups.length) {
    return (
      <p className="surface px-4 py-6 text-muted">
        No upcoming activities are listed right now. Please check the full calendar.
      </p>
    );
  }

  const cards = groups.flatMap((group) =>
    group.events.map((event) => ({ group: group.label, event })),
  );

  return (
    <div>
      <div className="act-grid">
        {cards.map(({ group, event }) => (
          <article key={event.id} className="evt">
            <span className="pill">{group}</span>
            <h3>{event.title}</h3>
            <p className="meta">
              <svg viewBox="0 0 24 24" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>
                {eventTimeLabel(event)}
                {event.location ? ` · ${event.location}` : ""}
              </span>
            </p>
          </article>
        ))}
      </div>
      {showAllLink && (
        <Link href="/calendar" className="cal-link">
          View full calendar
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
