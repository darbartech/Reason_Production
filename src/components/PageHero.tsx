import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Photo from "@/components/Photo";

type HeroImage = { name: string; alt: string; position?: string };

const defaultImage: HeroImage = {
  name: "hero-counselling",
  alt: "Students and a counsellor talking at a table with laptops",
  position: "center 45%",
};

export default function PageHero({
  title,
  intro,
  plain = false,
  image,
  ctaHref = "/contact",
  ctaLabel = "Book a free session",
}: {
  title: ReactNode;
  intro?: string;
  plain?: boolean;
  image?: HeroImage;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const heroImage = image ?? defaultImage;

  return (
    <section className="surface-dark relative isolate overflow-hidden border-b border-primary-800">
      {!plain && (
        <div className="absolute inset-0 -z-10 lg:left-[48%]">
          <Photo
            name={heroImage.name}
            alt={heroImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            objectPosition={heroImage.position}
          />
          <div className="absolute inset-0 bg-primary-950/80 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-primary-950 via-primary-950/25 to-primary-950/0 lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-950/85 via-primary-950/20 to-transparent" />
        </div>
      )}

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 -z-20 overflow-hidden ${plain ? "w-full" : "w-full lg:w-[50%]"}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 18% 18%, rgba(11,110,143,0.32), transparent 55%), radial-gradient(ellipse at 88% 88%, rgba(184,50,74,0.18), transparent 45%)",
          }}
        />
      </div>

      <div className="container-custom relative py-10 md:py-14 lg:py-16">
        <div
          className={`grid items-end gap-8 ${plain ? "" : "lg:min-h-[300px] lg:grid-cols-12 lg:gap-12"}`}
        >
          <div className={plain ? "max-w-3xl" : "lg:col-span-7"}>
            <h1 className="max-w-[24ch] text-balance text-[clamp(2.35rem,1.4rem+2.8vw,3.75rem)]">{title}</h1>
            {intro && <p className={`lead mt-4 ${plain ? "max-w-3xl" : "max-w-2xl"}`}>{intro}</p>}
          </div>

          {!plain && (
            <div className="hidden lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end">
              <Link
                href={ctaHref}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold !text-primary shadow-sm transition-colors hover:bg-primary-50"
              >
                {ctaLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
