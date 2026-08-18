import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import PartnerLinks from "@/components/PartnerLinks";
import { KHILAFAT_URL, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About us"
        subtitle={`We welcome you to ${SITE.name} in Chantilly.`}
        image="/images/mosque-outside.jpg"
      />
      <section className="blk">
        <div className="wrap max-w-3xl">
          <p className="text-lg leading-relaxed text-muted">
            We welcome you to the Mubarak Mosque in Chantilly! We are Muslims who believe in
            the Messiah, Mirza Ghulam Ahmad of Qadian, and are united under the divine
            leadership of Khilafat (Caliphate). Our motto, “Love for All, Hatred for None,”
            reflects our commitment to fostering harmony and understanding in our community.
          </p>
        </div>
      </section>
      <section className="blk bg-ink2">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/huzoor.png"
            alt="His Holiness Mirza Masroor Ahmad"
            width={640}
            height={800}
            className="mx-auto max-h-[520px] w-auto object-contain"
          />
          <div>
            <p className="eyebrow">Khilafat</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white">
              His Holiness Mirza Masroor Ahmad
            </h2>
            <div className="mt-5 space-y-4 text-muted">
              <p>
                His Holiness Mirza Masroor Ahmad, the current Caliph of the Ahmadiyya Muslim
                Community, exemplifies spiritual leadership and dedication to promoting love
                and peace globally.
              </p>
              <p>
                Elected to this lifelong position on 22nd April 2003, he serves as the
                worldwide spiritual and administrative head of an international religious
                organisation with membership exceeding tens of millions spread across over
                200 nations and territories.
              </p>
              <p>
                Through his sermons, lectures, books, and personal meetings, His Holiness has
                continually advocated the worship of God Almighty and serving humanity. He
                also continually advocates for the establishment of universal human rights, a
                just society and a separation of religion and state.
              </p>
            </div>
            <a href={KHILAFAT_URL} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">
              Learn more: Khalifatul Masih V
            </a>
          </div>
        </div>
      </section>
      <section className="blk">
        <div className="wrap">
          <h2 className="font-display text-3xl text-white">Our wider community</h2>
          <div className="mt-6">
            <PartnerLinks />
          </div>
        </div>
      </section>
    </>
  );
}
