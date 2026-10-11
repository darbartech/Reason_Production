"use client";

import { useMemo, useState } from "react";
import { Search, HelpCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { whatsappLink, company } from "@/lib/company";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export interface FaqExplorerProps {
  faqs: FaqCategory[];
}

const FaqExplorer = ({ faqs }: FaqExplorerProps) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(faqs[0]?.category ?? "");

  const filteredFaqs = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return faqs;

    return faqs
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.q.toLowerCase().includes(needle) ||
            item.a.toLowerCase().includes(needle)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, faqs]);

  const categoryIds = useMemo(
    () =>
      faqs.map((cat) => ({
        name: cat.category,
        id: cat.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-"),
      })),
    [faqs]
  );

  const searchField = (
    <div>
      <label htmlFor="faq-search" className="block text-sm font-medium text-primary mb-2">
        Search FAQs
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted group-focus-within:text-crimson transition-colors">
          <Search size={18} aria-hidden="true" />
        </div>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try 'visa', 'IELTS', 'fees'..."
          aria-label="Search frequently asked questions"
          className="w-full h-12 px-4 pl-11 rounded-xl border border-line bg-white text-primary placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-accent text-base focus:outline-none"
        />
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        tone="paper"
        variant="editorial"
        crumbs={[{ name: "FAQ" }]}
        eyebrow="FAQ"
        title={<>Frequently asked questions <em>about studying abroad.</em></>}
        intro="If your question isn&apos;t here, call us or drop in. We&apos;ll tell you honestly whether we can help."
        aside={searchField}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <div className="sticky top-32 self-start space-y-8">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-primary/60 mb-4">
                    Categories
                  </h4>
                  <nav aria-label="FAQ categories">
                    <ul className="space-y-0 border-l border-line">
                      {categoryIds.map(({ name, id }) => (
                        <li key={id}>
                          <Link
                            href={`#${id}`}
                            onClick={() => setActiveCategory(name)}
                            className={`block py-2 border-l-2 -ml-px pl-4 transition-colors ${
                              activeCategory === name
                                ? "text-crimson font-semibold border-crimson"
                                : "text-muted border-transparent hover:text-primary pl-4"
                            }`}
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="card p-5 sm:p-6 space-y-4">
                  <p className="text-sm font-semibold text-primary">Can&apos;t find it? Call / WhatsApp</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`tel:${company.phoneTel}`}
                      className="btn-secondary inline-flex items-center justify-start gap-2 py-3"
                    >
                      <Phone size={18} aria-hidden="true" />
                      <span className="text-sm">{company.phoneDisplay}</span>
                      <ArrowRight size={16} className="ml-auto transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp inline-flex items-center justify-start gap-2 py-3"
                    >
                      <MessageCircle size={18} aria-hidden="true" />
                      <span className="text-sm">Chat on WhatsApp</span>
                      <ArrowRight size={16} className="ml-auto transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                    <Link
                      href="/contact"
                      className="btn-primary inline-flex items-center justify-start gap-2 py-3"
                    >
                      <span className="text-sm">Book counselling</span>
                      <ArrowRight size={16} className="ml-auto transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9">
              <p className="text-sm font-semibold text-muted mb-8" aria-live="polite">
                {query.trim()
                  ? `${filteredFaqs.reduce((n, c) => n + c.items.length, 0)} ${filteredFaqs.reduce((n, c) => n + c.items.length, 0) === 1 ? "answer" : "answers"} matching "${query.trim()}"`
                  : `${faqs.reduce((n, c) => n + c.items.length, 0)} questions across ${faqs.length} categories`}
              </p>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-14">
                  {filteredFaqs.map((cat, catIdx) => {
                    const catId = cat.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-");
                    let firstInGroup = true;
                    return (
                      <div key={catIdx} id={catId} className="scroll-mt-32">
                        <h2 className="text-primary mb-8 mt-4 border-b border-line pb-4 uppercase text-sm font-semibold flex items-center tracking-wide">
                          <HelpCircle size={18} className="mr-2.5 text-crimson" /> {cat.category} Questions
                        </h2>
                        <div className="space-y-4">
                          {cat.items.map((item, j) => {
                            const open = firstInGroup && !query.trim();
                            if (open) firstInGroup = false;
                            return (
                              <details
                                key={j}
                                className="group rounded-xl border border-line bg-white overflow-hidden transition-all duration-200 open:shadow-card"
                                {...(open ? { open: true } : {})}
                              >
                                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-primary group-open:text-crimson transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white list-none">
                                  <span className="pr-4">{item.q}</span>
                                  <span
                                    aria-hidden="true"
                                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-crimson transition-transform duration-200 group-open:rotate-45 font-heading text-[1.75rem] leading-none"
                                  >
                                    +
                                  </span>
                                </summary>
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                                  <div className="pt-4 border-t border-line">
                                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                                      {item.a}
                                    </p>
                                  </div>
                                </div>
                              </details>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-line bg-paper px-6 py-16 text-center">
                  <h2 className="mb-3">No matching questions</h2>
                  <p className="mx-auto text-muted max-w-md">
                    Try a different keyword such as &ldquo;Canada&rdquo;, &ldquo;IELTS&rdquo;, &ldquo;visa&rdquo; or &ldquo;fees&rdquo;. If it&apos;s still not here, call us — we&apos;ll answer directly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqExplorer;
