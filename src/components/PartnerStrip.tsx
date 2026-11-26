import { partners } from "@/content/partners";
import { verified } from "@/content/proof";

const verifiedIds = new Set(verified.map((item) => item.id));

export default function PartnerStrip() {
  const documented = partners.filter((partner) => verifiedIds.has(partner.proofId));
  if (documented.length === 0) return null;

  return (
    <section aria-label="Institutions we work with" className="border-y border-line bg-paper">
      <div className="container-custom flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Institutions</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-primary">
          {documented.map((partner) => (
            <li key={partner.name}>
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-accent"
                >
                  {partner.name}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center">{partner.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
