import Image from "next/image";

export default function PageHero({
  title,
  subtitle,
  image = "/images/mosque-outside.jpg",
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      <Image src={image} alt="" fill className="object-cover" priority />
      <div className="wrap relative z-[2]">
        <p className="eyebrow">Mubarak Mosque</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white sm:text-7xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>}
      </div>
    </section>
  );
}
