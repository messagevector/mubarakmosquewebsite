import HeroPrayerCard from "@/components/HeroPrayerCard";
import { fetchPrayerTimes } from "@/lib/prayer-times";
import { SITE } from "@/lib/site";

export const revalidate = 3600;
export const metadata = { title: "TV Outside" };

export default async function TvOutsidePage() {
  const times = await fetchPrayerTimes();

  return (
    <div className="flex min-h-dvh flex-col items-center px-8 py-6 lg:px-16 lg:py-8">
      <p
        dir="rtl"
        className="shrink-0 text-center font-arabic text-2xl leading-relaxed text-gold sm:text-3xl lg:text-4xl"
      >
        {SITE.mosqueEntryDua}
      </p>
      <h1 className="mt-5 shrink-0 text-center font-display text-5xl leading-[0.95] text-white lg:mt-6 lg:text-7xl">
        Welcome to {SITE.name}
      </h1>
      <div className="mt-6 w-full max-w-3xl lg:mt-8 lg:max-w-4xl">
        <div className="w-full">
          <HeroPrayerCard times={times} showTomorrow />
        </div>
      </div>
    </div>
  );
}
