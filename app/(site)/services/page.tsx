import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { BECOME_MUSLIM_URL, HUMANITY_FIRST_USA_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our services" image="/images/friday-prayer.jpg" />
      <section className="blk">
        <div className="wrap space-y-20">
          <article className="grid items-center gap-10 md:grid-cols-2">
            <Image
              src="/images/become-muslim.png"
              alt="Become a Muslim"
              width={640}
              height={400}
              className="w-full rounded-2xl bg-white object-contain p-6"
            />
            <div>
              <h2 className="font-display text-3xl text-white">
                Interested in converting to Islam-Ahmadiyyat?
              </h2>
              <p className="mt-4 text-muted">
                Embark on a meaningful spiritual journey with BecomeAMuslim.online, a platform
                provided by the Ahmadiyya Muslim Community that welcomes earnest seekers with
                warmth and clarity. Whether you’re curious about how to convert, have questions
                about Islam, or are ready to recite the Shahada, visit Become A Muslim.
              </p>
              <a href={BECOME_MUSLIM_URL} target="_blank" rel="noreferrer" className="btn btn-gold mt-6">
                Become A Muslim
              </a>
            </div>
          </article>
          <article className="grid items-center gap-10 md:grid-cols-2">
            <Image
              src="/images/humanity-first.png"
              alt="Humanity First"
              width={640}
              height={400}
              className="w-full rounded-2xl bg-white object-contain p-6 md:order-2"
            />
            <div className="md:order-1">
              <h2 className="font-display text-3xl text-white">Take part in community service</h2>
              <p className="mt-4 text-muted">
                Humanity First USA is a dynamic and compassionate U.S.-based humanitarian
                organization—part of the global Humanity First network—dedicated to uplifting
                communities worldwide, regardless of race, religion, or politics. Humanity First
                USA works across the globe to help people thrive and flourish. We dig wells for
                clean water, run eye clinics to help people see, and build schools for
                life-changing education. When disaster strikes, Humanity First USA is there to
                help people restore their communities.
              </p>
              <a
                href={HUMANITY_FIRST_USA_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold mt-6"
              >
                Humanity First
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
