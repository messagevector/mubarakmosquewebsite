import type { PrayerTimes } from "@/lib/prayer-times";

export default function PrayerTable({
  times,
  compact = false,
}: {
  times: PrayerTimes | null;
  compact?: boolean;
}) {
  if (!times) {
    return (
      <p className="surface px-4 py-6 text-center text-muted">
        Prayer times are temporarily unavailable. Please check back shortly.
      </p>
    );
  }

  return (
    <div className="surface overflow-hidden">
      <div className="grid grid-cols-3 border-b border-[var(--line)] bg-ink-3/80">
        <div className={`px-4 py-3 font-display text-white ${compact ? "text-base" : "text-lg"}`}>
          Prayer
        </div>
        <div className={`px-4 py-3 text-right ${compact ? "text-sm" : "text-base"}`}>
          <div className="text-[11px] tracking-widest text-gold uppercase">Today</div>
          <span className="text-white">{times.todayLabel}</span>
        </div>
        <div className={`px-4 py-3 text-right ${compact ? "text-sm" : "text-base"}`}>
          <div className="text-[11px] tracking-widest text-gold uppercase">Tomorrow</div>
          <span className="text-white">{times.tomorrowLabel}</span>
        </div>
      </div>
      <div>
        {times.prayers.map((p) => (
          <div
            key={p.name}
            className={`grid grid-cols-3 border-t border-white/5 ${p.isJuma ? "bg-gold/5" : ""}`}
          >
            <div className={`px-4 py-3 font-display text-white ${compact ? "text-sm" : "text-xl"}`}>
              {p.name}
            </div>
            <div
              className={`px-4 py-3 text-right tabular-nums text-white ${compact ? "text-sm" : "text-lg"}`}
            >
              {p.today}
            </div>
            <div
              className={`px-4 py-3 text-right tabular-nums text-muted ${compact ? "text-sm" : "text-lg"}`}
            >
              {p.tomorrow}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
