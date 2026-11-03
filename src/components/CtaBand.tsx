import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title?: string;
  intro?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CtaBand({
  title = "Not sure where to start?",
  intro = "Bring your marksheets and budget. The first session is free, and you leave with a plan.",
  secondaryHref = "/eligibility",
  secondaryLabel = "Check your eligibility",
}: Props) {
  return (
    <section className="section-padding bg-paper" aria-labelledby="cta-band-heading">
      <div className="container-custom">
        <div className="rounded-3xl border border-line bg-white p-7 sm:p-10 md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-band-heading" className="text-balance">
                {title}
              </h2>
              <p className="lead mt-4">{intro}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary btn-lg">
                Book a free session
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href={secondaryHref} className="btn-secondary btn-lg">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
