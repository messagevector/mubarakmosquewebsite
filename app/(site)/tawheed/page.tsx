import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Tawheed" };

export default function TawheedPage() {
  return (
    <>
      <PageHero
        title="Tawheed"
        subtitle="There is none worthy of worship except Allah"
        image="/images/tawheed-skylight.png"
      />
      <section className="blk">
        <div className="wrap max-w-4xl space-y-16">
          <article className="grid items-start gap-8 md:grid-cols-[200px_1fr]">
            <Image
              src="/images/quran.jpg"
              alt="The Holy Quran"
              width={400}
              height={400}
              className="mx-auto h-48 w-48 rounded-full object-cover"
            />
            <div>
              <h2 className="font-display text-3xl text-white">The Holy Quran</h2>
              <p className="mt-4 font-display text-xl italic leading-relaxed text-muted">
                In the name of Allah, the Gracious, the Merciful. Say, ‘He is Allah, the One;
                Allah, the Independent and Besought of all. He begets not, nor is He begotten;
                And there is none like unto Him.’ (Holy Quran, Chapter 112)
              </p>
            </div>
          </article>
          <article className="grid items-start gap-8 md:grid-cols-[200px_1fr]">
            <Image
              src="/images/prophet.png"
              alt=""
              width={400}
              height={400}
              className="mx-auto h-48 w-48 object-contain"
            />
            <div>
              <h2 className="font-display text-3xl text-white">
                Ahadith (Sayings of Prophet Muhammad<sup>sa</sup>)
              </h2>
              <p className="mt-4 italic leading-relaxed text-muted">
                When the Prophet sent Muadh to Yemen, he said to him, “You are going to a nation
                from the people of the Scripture, so let the first thing to which you will invite
                them, be the Tauhid of Allah. If they learn that, tell them that Allah has
                enjoined on them, five prayers to be offered in one day and one night. And if
                they pray, tell them that Allah has enjoined on them Zakat of their properties
                and it is to be taken from the rich among them and given to the poor. And if they
                agree to that, then take from them Zakat but avoid the best property of the
                people.” (Sahih Bukhari, Volume 9, Book 93, Number 469)
              </p>
            </div>
          </article>
          <article className="grid items-start gap-8 md:grid-cols-[200px_1fr]">
            <Image
              src="/images/promised-messiah.jpg"
              alt="The Promised Messiah"
              width={400}
              height={400}
              className="mx-auto h-48 w-48 rounded-full object-cover"
            />
            <div>
              <h2 className="font-display text-3xl text-white">
                The Promised Messiah<sup>as</sup>
              </h2>
              <p className="mt-4 italic leading-relaxed text-muted">
                But, first and foremost, I have been sent to re-establish forever the lost belief
                in the Unity of God—Tauhid—which is pure and luminous and unadulterated by any
                form of idolatry—Shirk. (Lecture Lahore, 2008 Edition, p. 42)
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
