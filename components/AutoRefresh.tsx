"use client";

import { useEffect } from "react";

export default function AutoRefresh({ minutes = 15 }: { minutes?: number }) {
  useEffect(() => {
    const id = setInterval(() => window.location.reload(), minutes * 60_000);
    return () => clearInterval(id);
  }, [minutes]);
  return null;
}
