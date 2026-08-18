"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

function formatClock(now: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: SITE.timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);
}

function formatDate(now: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: SITE.timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);
}

export default function DigitalClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center">
      <p className="text-base tracking-[0.16em] text-muted uppercase">{formatDate(now)}</p>
      <p className="mt-2 font-sans text-4xl font-bold tabular-nums tracking-wide text-gold lg:text-5xl">
        {formatClock(now)}
      </p>
    </div>
  );
}
