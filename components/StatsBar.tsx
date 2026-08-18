"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { count: 5, cap: "Daily Prayers" },
  { count: 114, cap: "Chapters of the Qur'an" },
  { count: 1889, cap: "Community Founded" },
  { symbol: "∞", cap: "All Are Welcome" },
] as const;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function StatNumber({ target, symbol }: { target?: number; symbol?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || symbol) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [symbol]);

  useEffect(() => {
    if (!started || symbol || target == null) return;

    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * easeOut(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, symbol, target]);

  return (
    <div ref={ref} className="num">
      {symbol ?? value}
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="stats">
      <div className="wrap" style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.cap} className="stat">
              <StatNumber target={"count" in stat ? stat.count : undefined} symbol={"symbol" in stat ? stat.symbol : undefined} />
              <div className="cap">{stat.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
