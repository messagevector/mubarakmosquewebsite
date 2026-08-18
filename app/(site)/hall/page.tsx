import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { HALL, MOSQUE_CALENDAR_EMBED, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Hall" };

export default function HallPage() {
  return (
    <>
      <PageHero
        title="Hall reservation"
        subtitle="Mubarak Mosque Hall is open for reservations to Jama’at members."
        image="/images/mosque-inside.jpg"
      />
      <section className="blk">
        <div className="wrap max-w-3xl">
          <div className="flex flex-wrap gap-3">
            <a href={HALL.pictures} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Pictures
            </a>
            <a href={HALL.contract} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Contract
            </a>
            <a href={HALL.reserve} target="_blank" rel="noreferrer" className="btn btn-gold">
              Reserve
            </a>
          </div>
        </div>
      </section>
      <section className="blk bg-ink2">
        <div className="wrap max-w-3xl space-y-4">
          <h2 className="font-display text-3xl text-white">Reserving the Masjid Mubarak Hall</h2>
          <p className="text-muted">
            Mubarak Mosque Hall is open for reservations to Jama’at Members. Please read the
            Contract to understand the guidelines of the booking process and fees. Once you
            submit the request, you will hear back from the General Secretary Office for next
            steps. The reservation link can be used for the Gym, Dining Hall, Conference Room,
            Kitchen etc.
          </p>
          <p className="text-muted">
            For any questions, please reach out to the General Secretary Office at{" "}
            <a className="text-gold" href={`mailto:${SITE.gsEmail}`}>
              {SITE.gsEmail}
            </a>
            .
          </p>
        </div>
      </section>
      <section className="blk">
        <div className="wrap max-w-5xl">
          <h2 className="font-display text-3xl text-white">Calendar of events</h2>
          <p className="mt-3 mb-6 text-muted">
            Filling out the form also means you agree to the contract between yourself and
            Jama’at. Please note there is a non-refundable cost for the rental which will be used
            for cleaning expenses as well as general upkeep of the property. If any member has a
            financial hardship, they can send a special request for Sadr Jama’at to review and
            approve. Please use the calendar to ensure there are no conflicting events on the day
            of your request.
          </p>
          <iframe
            title="Mosque calendar"
            src={MOSQUE_CALENDAR_EMBED}
            className="h-[640px] w-full rounded-xl border border-white/10 bg-white"
          />
        </div>
      </section>
      <section className="blk bg-ink2 space-y-12">
        <div className="wrap max-w-3xl space-y-4">
          <h2 className="font-display text-3xl text-white">Gym</h2>
          <p className="text-muted">
            The gym is available for members to rent. The gym is over 5,000 sqft and the
            basketball hoops will be moved up and stowed away for your event. If you require
            the use of the installed audio/video system, please indicate that on your
            reservation request.
          </p>
        </div>
        <div className="wrap max-w-3xl space-y-4">
          <h2 className="font-display text-3xl text-white">Dining halls</h2>
          <p className="text-muted">
            Mubarak Mosque has two dining halls in the basement. They are available for rent
            for any Jama’at member. One has a capacity of 20 round tables while the other has a
            capacity of 10 round tables. Other amenities include an 84″ LED TV mounted on the
            side wall, bathrooms with 2 stalls, and a commercial kitchen.
          </p>
        </div>
        <div className="wrap max-w-3xl space-y-4">
          <h2 className="font-display text-3xl text-white">Conference room</h2>
          <p className="text-muted">
            The main level contains a conference room next to the gym which is available for
            reservation by any Jama’at member. The conference room contains an 84″ LED TV,
            whiteboard, large conference table with chairs, and a printer/copier. The room can
            be used for various purposes such as conducting meetings, studying, reading books,
            etc. This is a no-fee service provided to the members given that they keep the room
            clean and organized. The terms of the rental can be found on the reservation form.
          </p>
        </div>
      </section>
    </>
  );
}
