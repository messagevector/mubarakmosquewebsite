import Image from "next/image";
import Link from "next/link";
import EventList from "@/components/EventList";
import HeroPrayerCard from "@/components/HeroPrayerCard";
import ReviewStars from "@/components/ReviewStars";
import ServicesCarousel from "@/components/ServicesCarousel";
import SocialIcon from "@/components/SocialIcon";
import StatsBar from "@/components/StatsBar";
import { fetchMosqueEvents } from "@/lib/calendar";
import { fetchPrayerTimes } from "@/lib/prayer-times";
import { REVIEWS, SITE, SOCIAL } from "@/lib/site";

export const revalidate = 900;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function HomePage() {
  const [times, events] = await Promise.all([fetchPrayerTimes(), fetchMosqueEvents()]);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-media">
          <Image
            src="/images/sample-mosque-inside.jpg"
            alt="Inside Mubarak Mosque"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{SITE.community}</p>
            <h1 className="mt-5">
              Masjid
              <br />
              <em>Mubarak</em>
            </h1>
            <p className="tag">{SITE.motto}</p>
            <div className="actions">
              <Link href="/contact" className="btn btn-gold">
                Plan Your Visit
                <ArrowIcon />
              </Link>
              <a href="#home" className="btn btn-ghost">
                Prayer Times
              </a>
            </div>
          </div>
          <HeroPrayerCard times={times} />
        </div>
        <div className="scroll-cue">
          <div className="mouse" />
          Scroll
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">What&apos;s happening</p>
            <h2>
              Upcoming <em>activities</em>
            </h2>
            <p>Classes, meetings and gatherings — everyone in the community is invited.</p>
          </div>
          <EventList events={events} limit={6} showAllLink />
        </div>
      </section>

      <section className="blk bg-ink2">
        <div className="wrap">
          <div className="head center">
            <p className="eyebrow center">Get involved</p>
            <h2>
              Ongoing <em>services</em>
            </h2>
            <p>
              From open houses to friendly conversations over coffee — there&apos;s a place for you
              here.
            </p>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="head center">
            <p className="eyebrow center">Kind words</p>
            <h2>
              From our <em>visitors</em>
            </h2>
          </div>
          <div className="testi-grid">
            {REVIEWS.map((r) => (
              <article key={r.name} className="tcard">
                <div className="qm">“</div>
                <ReviewStars />
                <blockquote>{r.quote}</blockquote>
                <p className="who">
                  {r.name} <span>· Google Reviewer</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="cta">
        <div className="cta-media">
          <Image
            src="/images/sample-mosque-outside.jpg"
            alt="Welcome to Mubarak Mosque"
            fill
            className="object-cover"
          />
        </div>
        <div className="wrap cta-inner">
          <div className="socials">
            {SOCIAL.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="soc"
                aria-label={s.name}
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
          <div className="cta-body">
            <p className="eyebrow">We&apos;re here for you</p>
            <h2>
              Have <em>Questions?</em>
            </h2>
            <p>
              Whether you&apos;re curious about Islam, the Ahmadiyya Community, or Mubarak Mosque
              itself — we&apos;d love to talk, and there&apos;s never any pressure.
            </p>
            <div className="actions">
              <Link href="/contact" className="btn btn-gold">
                Let&apos;s Talk
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
