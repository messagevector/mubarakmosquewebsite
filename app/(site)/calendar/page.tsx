import type { Metadata } from "next";
import EventList from "@/components/EventList";
import PageHero from "@/components/PageHero";
import PrayerTable from "@/components/PrayerTable";
import { fetchMosqueEvents } from "@/lib/calendar";
import { fetchPrayerTimes } from "@/lib/prayer-times";
import { MOSQUE_CALENDAR_EMBED, MOSQUE_CALENDAR_SUBSCRIBE } from "@/lib/site";

export const metadata: Metadata = { title: "Calendar" };
export const revalidate = 900;

export default async function CalendarPage() {
  const [times, events] = await Promise.all([fetchPrayerTimes(), fetchMosqueEvents(90)]);

  return (
    <>
      <PageHero title="Calendar" subtitle="Prayer times, classes, and community gatherings." />
      <section className="blk">
        <div className="wrap">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-white">Prayer times</h2>
              <p className="mt-1 text-muted">Today and tomorrow.</p>
            </div>
            <a href={MOSQUE_CALENDAR_SUBSCRIBE} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Subscribe in Google Calendar
            </a>
          </div>
          <PrayerTable times={times} />
        </div>
      </section>
      <section className="blk bg-ink2">
        <div className="wrap">
          <h2 className="mb-6 font-display text-3xl text-white">Upcoming events</h2>
          <EventList events={events} />
        </div>
      </section>
      <section className="blk">
        <div className="wrap">
          <h2 className="mb-6 font-display text-3xl text-white">Month view</h2>
          <iframe
            title="Mubarak Mosque calendar"
            src={`${MOSQUE_CALENDAR_EMBED}&mode=MONTH`}
            className="h-[720px] w-full rounded-xl border border-white/10 bg-white"
          />
        </div>
      </section>
    </>
  );
}
