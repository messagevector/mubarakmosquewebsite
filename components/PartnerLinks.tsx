import { PARTNERS } from "@/lib/site";

export default function PartnerLinks({ light = false }: { light?: boolean }) {
  return (
    <ul className="space-y-2 text-sm text-muted">
      {PARTNERS.map((p) => (
        <li key={p.href}>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={light ? "hover:text-gold" : "hover:text-gold"}
          >
            {p.blurb}
          </a>
        </li>
      ))}
    </ul>
  );
}
