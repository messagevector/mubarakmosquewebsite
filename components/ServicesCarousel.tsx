"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/sample-tawheed.jpeg", alt: "Discover Tawheed" },
  { src: "/images/sample-open-house.jpeg", alt: "Open House at Mubarak Mosque" },
  { src: "/images/sample-coffee-cake.jpeg", alt: "Coffee, Cake & Islam" },
  { src: "/images/sample-friday-prayer.jpg", alt: "Friday Prayer Service" },
];

function visibleCount(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => setPerView(visibleCount(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, slides.length - perView);
  const safeIndex = Math.min(index, maxIndex);
  const gap = 24;
  const slideWidth = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`;
  const step = `calc(${slideWidth} + ${gap}px)`;

  return (
    <div className="carousel">
      <div className="viewport">
        <div
          className="track"
          style={{ transform: `translateX(calc(-1 * ${safeIndex} * ${step}))` }}
        >
          {slides.map((slide) => (
            <article key={slide.src} className="card-svc" style={{ flex: `0 0 ${slideWidth}` }}>
              <div className="imgwrap">
                <Image src={slide.src} alt={slide.alt} width={720} height={960} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="car-nav">
        <div className="dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === safeIndex ? "active" : ""}`}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <div className="arrows">
          <button
            type="button"
            className="arrow"
            aria-label="Previous"
            disabled={safeIndex === 0}
            onClick={() => setIndex((v) => Math.max(0, v - 1))}
          >
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="arrow"
            aria-label="Next"
            disabled={safeIndex >= maxIndex}
            onClick={() => setIndex((v) => Math.min(maxIndex, v + 1))}
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
