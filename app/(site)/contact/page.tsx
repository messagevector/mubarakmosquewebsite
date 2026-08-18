import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { SITE, SOCIAL } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Whether you have a question or would like to visit, we would love to hear from you."
        image="/images/hero.jpg"
      />
      <section className="blk">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-white">You can find us at</h2>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Phone</dt>
                <dd className="mt-1 text-lg">
                  <a href={SITE.phoneHref} className="hover:text-gold">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Location</dt>
                <dd className="mt-1 text-lg">
                  <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
                    {SITE.address}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1 hover:border-gold hover:text-gold"
                >
                  {s.name}
                </a>
              ))}
            </div>
            <iframe
              title="Map to Mubarak Mosque"
              src={SITE.mapsEmbed}
              className="mt-8 h-72 w-full rounded-xl border border-white/10"
            />
          </div>
          <div className="surface p-6">
            <h2 className="font-display text-3xl text-white">Let’s get in touch</h2>
            <p className="mt-2 mb-6 text-sm text-muted">
              Share your name, email, and message and we will get back to you.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
