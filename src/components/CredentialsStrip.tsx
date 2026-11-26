import { company } from "@/lib/company";

const members: Array<{ label: string; value: string | undefined }> = [
  { label: "Registered", value: company.registration.number ? (company.registration.authority ? `${company.registration.authority} · ${company.registration.number}` : company.registration.number) : undefined },
  { label: "PAN", value: company.registration.pan || undefined },
];

export default function CredentialsStrip() {
  const items = members.filter((m) => m.value);
  if (items.length === 0) return null;

  return (
    <section aria-label="Credentials" className="border-y border-line bg-white">
      <div className="container-custom">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm text-muted">
          {items.map(({ label, value }) => (
            <li key={label} className="flex items-center gap-2">
              <span className="uppercase tracking-wider text-xs text-primary-400">{label}</span>
              <span className="font-semibold text-primary">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
