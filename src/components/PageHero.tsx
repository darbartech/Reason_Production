import Link from "next/link";
import { ReactNode } from "react";

type Crumb = { name: string; href?: string };

export default function PageHero({
  title, intro, crumbs = [],
}: { title: ReactNode; intro?: string; crumbs?: Crumb[] }) {
  return (
    <section className="bg-paper pt-10 pb-12 md:pt-16 md:pb-16 border-b border-line">
      <div className="container-custom">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {c.href ? <Link href={c.href} className="hover:text-primary">{c.name}</Link> : <span aria-current="page" className="text-primary">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-balance">{title}</h1>
        {intro && <p className="lead mt-5 max-w-2xl">{intro}</p>}
      </div>
    </section>
  );
}
