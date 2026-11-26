import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Photo from "./Photo";
import { proof } from "@/content/proof";
import type { TeamMember } from "@/content/team";

const verifiedClaims = new Set(
  proof.filter((item) => item.verified).map((item) => item.claim)
);

export default function CounsellorCard({ member }: { member: TeamMember }) {
  const firstName = member.name.split(" ")[0];
  const qualifications = (member.qualifications ?? []).filter((item) =>
    verifiedClaims.has(item)
  );
  const hasDetails = Boolean(member.specialisations?.length || member.languages?.length);

  return (
    <article className="card flex h-full flex-col p-6">
      {member.photo && (
        <div className="mb-5 overflow-hidden rounded-xl bg-paper">
          <Photo
            name={member.photo}
            alt={`${member.name}, ${member.role}`}
            widths={[640]}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            ratio="aspect-[4/5]"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-primary">{member.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
          {member.role}
        </p>

        {hasDetails && (
          <dl className="mt-4 space-y-2 text-sm">
            {member.specialisations && member.specialisations.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Destination focus</dt>
                <dd className="mt-0.5 text-primary">{member.specialisations.join(", ")}</dd>
              </div>
            )}
            {member.languages && member.languages.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Languages</dt>
                <dd className="mt-0.5 text-primary">{member.languages.join(", ")}</dd>
              </div>
            )}
          </dl>
        )}

        {member.bio && (
          <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
        )}

        {qualifications.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <Link
        href={`/contact?counsellor=${member.slug}`}
        className="btn-secondary mt-6 w-full"
      >
        Book with {firstName}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
