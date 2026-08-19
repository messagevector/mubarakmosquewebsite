"use client";

import { useEffect, useState } from "react";
import { getNextPrayer, type PrayerTimes } from "@/lib/prayer-times";

const PRAYER_ICONS: Record<string, string> = {
  Fajr: "M12 3v2M5.6 5.6l1.4 1.4M3 12h2M19 12h2M17 7l1.4-1.4M4 20h16M7 20a5 5 0 0110 0",
  Zuhr: "M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6M12 8a4 4 0 100 8 4 4 0 000-8z",
  "(Juma)":
    "M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6M12 8a4 4 0 100 8 4 4 0 000-8z",
  Juma: "M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6M12 8a4 4 0 100 8 4 4 0 000-8z",
  Asr: "M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6M12 8a4 4 0 100 8 4 4 0 000-8z",
  Maghrib: "M17 18a5 5 0 00-10 0M12 3v6M8.5 6.5L12 3l3.5 3.5M3 18h18M4 22h16",
  Isha: "M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z",
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function PrayerIcon({ name }: { name: string }) {
  const d = PRAYER_ICONS[name.replace(/[()]/g, "")] ?? PRAYER_ICONS[name];
  if (!d) return null;
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function HeroPrayerCard({
  times,
  showTomorrow = false,
  showCountdown = true,
}: {
  times: PrayerTimes | null;
  showTomorrow?: boolean;
  showCountdown?: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = times ? getNextPrayer(times, new Date(now)) : null;
  const remaining = next ? Math.max(0, new Date(next.at).getTime() - now) : 0;
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <div className="prayer-card">
      <div className="pc-top">
        <span className="lbl">Next Prayer</span>
        <span className="live">
          <span className="dot" /> LIVE
        </span>
      </div>
      <div className="next-wrap">
        {next ? (
          <>
            <p className="next-kicker">Coming up{next.isTomorrow ? " tomorrow" : ""}</p>
            <p className="next-name">{next.name}</p>
            {showCountdown && (
              <p className="countdown">
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
              </p>
            )}
          </>
        ) : (
          <p className="next-name">Times loading</p>
        )}
      </div>
      {times && (
        <ul className={showTomorrow ? "plist days" : "plist"}>
          {showTomorrow && (
            <li className="plist-head" aria-hidden>
              <span>Prayer</span>
              <span>Today</span>
              <span>Tomorrow</span>
            </li>
          )}
          {times.prayers.map((p) => {
            const active =
              next &&
              p.name.replace(/[()]/g, "").toLowerCase() === next.name.toLowerCase() &&
              !next.isTomorrow;
            return (
              <li key={p.name} className={active ? "active" : ""}>
                <span className="nm">
                  <PrayerIcon name={p.name} />
                  {p.name}
                </span>
                <span className="pt">{p.today}</span>
                {showTomorrow && <span className="pt-tmr">{p.tomorrow}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
