import DigitalClock from "@/components/DigitalClock";
import EventList from "@/components/EventList";
import HeroPrayerCard from "@/components/HeroPrayerCard";
import { fetchMosqueEvents } from "@/lib/calendar";
import { fetchPrayerTimes } from "@/lib/prayer-times";
import { SITE } from "@/lib/site";

export const revalidate = 600;
export const metadata = { title: "TV Inside" };

export default async function TvInsidePage() {
  const [times, events] = await Promise.all([fetchPrayerTimes(), fetchMosqueEvents()]);

  return (
    <div className="flex min-h-dvh flex-col px-8 py-6 lg:px-12 lg:py-8">
      <p
        dir="rtl"
        className="shrink-0 text-center font-arabic text-2xl text-gold sm:text-3xl lg:text-4xl"
      >
        {SITE.bismillah}
      </p>
      <div className="mt-8 shrink-0 lg:mt-10">
        <DigitalClock />
      </div>
      {times?.ramadan.length ? (
        <div className="mt-4 shrink-0 surface flex flex-wrap justify-center gap-x-10 gap-y-1 px-5 py-3">
          {times.ramadan.map((r) => (
            <p key={r.label} className="font-display text-2xl text-gold">
              {r.label}: <span className="text-white">{r.time}</span>
            </p>
          ))}
        </div>
      ) : null}
      <div className="mx-auto mt-6 grid min-h-0 w-full max-w-[1600px] flex-1 items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <HeroPrayerCard times={times} showCountdown={false} />
        <div className="tvin-events">
          <EventList events={events} limit={4} />
        </div>
      </div>
    </div>
  );
}
