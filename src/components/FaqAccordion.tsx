import type { Faq } from "@/content/faq";

type Props = {
  items: Faq[];
  defaultOpen?: number;
};

export default function FaqAccordion({ items, defaultOpen = -1 }: Props) {
  return (
    <div className="space-y-3">
      {items.map((faq, index) => (
        <details
          key={faq.q}
          className="group rounded-2xl border border-line bg-white overflow-hidden transition-shadow duration-200 open:shadow-card"
          {...(index === defaultOpen ? { open: true } : {})}
        >
          <summary className="flex min-h-[3.5rem] items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-primary group-open:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 list-none">
            <span className="pr-4">{faq.q}</span>
            <span
              aria-hidden="true"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-crimson transition-transform duration-200 group-open:rotate-45 font-heading text-[1.75rem] leading-none"
            >
              +
            </span>
          </summary>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
            <div className="pt-4 border-t border-line">
              <p className="text-sm sm:text-base text-muted leading-relaxed">{faq.a}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
