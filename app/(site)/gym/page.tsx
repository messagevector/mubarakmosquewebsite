import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { GYM_CALENDAR_EMBED } from "@/lib/site";

export const metadata: Metadata = { title: "Gym" };

export default function GymPage() {
  return (
    <>
      <PageHero title="Gym" image="/images/mosque-inside.jpg" />
      <section className="blk">
        <div className="wrap max-w-5xl">
          <h2 className="font-display text-3xl text-white">Gym calendar</h2>
          <p className="mt-3 mb-6 text-muted">
            The gym is available for use by Jama’at members and includes facilities for multiple
            sports, e.g. basketball, badminton, pickle ball etc. In order to avoid conflicts,
            members should review the calendar and (optionally) reserve a date/time for their
            usage.
          </p>
          <iframe
            title="Gym calendar"
            src={GYM_CALENDAR_EMBED}
            className="h-[640px] w-full rounded-xl border border-white/10 bg-white"
          />
        </div>
      </section>
    </>
  );
}
