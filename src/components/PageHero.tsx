import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

type Crumb = { name: string; href?: string };
type Chip = { icon?: ReactNode; label: string };
type Badge = { icon?: ReactNode; title: string; subtitle?: string };
type Variant = "split" | "editorial" | "compact";
type Subject = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

type Props = {
  title: ReactNode;
  intro?: string;
  crumbs?: Crumb[];
  tone?: "paper" | "navy";
  aside?: ReactNode;
  meta?: ReactNode;
  eyebrow?: string;
  image?: { src: string; alt: string };
  imagePriority?: boolean;
  badge?: Badge;
  chips?: Chip[];
  variant?: Variant;
  /** Transparent HD cutout subject (preferred over `image`). */
  subject?: Subject;
  /** Primary/secondary calls to action, rendered directly under the intro. */
  actions?: ReactNode;
};

export default function PageHero({
  title,
  intro,
  crumbs = [],
  tone = "paper",
  aside,
  meta,
  eyebrow,
  image,
  imagePriority = false,
  badge,
  chips = [],
  variant,
  subject,
  actions,
}: Props) {
  const isNavy = tone === "navy";

  // Resolve variant with backwards compatibility.
  const hasSubject = Boolean(subject) || Boolean(image);
  const hasImageOrAside = hasSubject || Boolean(aside);
  const effective: Variant = variant ?? (hasImageOrAside ? "split" : "compact");

  const padding =
    effective === "split"
      ? "py-14 md:py-20 lg:py-24"
      : "py-10 md:py-14 lg:py-16";

  const sectionClasses = isNavy
    ? `surface-dark relative border-b border-white/10 ${padding}`
    : `relative border-b border-line bg-paper ${padding}`;

  const crumbClasses = isNavy ? "text-sm text-on-dark" : "text-sm text-muted";
  const crumbLinkClasses = isNavy ? "hover:text-white" : "hover:text-primary";
  const crumbCurrentClasses = isNavy ? "text-white" : "text-primary";

  const titleClasses = isNavy
    ? "max-w-2xl text-balance text-white leading-[1.06]"
    : "max-w-2xl text-balance leading-[1.06]";

  const introClasses = isNavy
    ? "lead mt-5 max-w-xl text-on-dark"
    : "lead mt-5 max-w-xl";

  // --- Content (left column in split / main content in editorial/compact) ---
  const content = (
    <>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h1 className={titleClasses}>{title}</h1>
      {intro && <p className={introClasses}>{intro}</p>}

      {actions && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          {actions}
        </div>
      )}

      {meta && <div className="mt-7">{meta}</div>}

      {chips.length > 0 && (
        <ul className="mt-8 flex flex-wrap items-center gap-2.5">
          {chips.map((c) => (
            <li
              key={c.label}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                isNavy
                  ? "border-white/15 bg-white/5 text-on-dark"
                  : "border-line bg-white text-primary"
              }`}
            >
              {c.icon && (
                <span
                  aria-hidden="true"
                  className={`shrink-0 ${
                    isNavy ? "text-on-dark-link" : "text-crimson"
                  }`}
                >
                  {c.icon}
                </span>
              )}
              {c.label}
            </li>
          ))}
        </ul>
      )}

      {aside && effective !== "split" && (
        <div className="mt-8 max-w-xl">{aside}</div>
      )}
    </>
  );

  // --- Single framed photograph treatment (portrait cutouts vs. landscape photos) ---
  const photo = (
    src: string,
    alt: string,
    priority: boolean,
    landscape = false
  ) => (
    <div
      className={`relative mx-auto w-full ${
        landscape ? "max-w-3xl" : "max-w-[26rem]"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl shadow-card ring-1 ${
          isNavy
            ? "bg-primary-900 ring-white/10"
            : "bg-primary-50 ring-brand-border"
        }`}
      >
        <div
          className={`relative ${landscape ? "aspect-[16/9]" : "aspect-[4/5]"}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={
              landscape
                ? "(min-width: 1024px) 48rem, 90vw"
                : "(min-width: 1024px) 42vw, 90vw"
            }
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );

  const media = subject
    ? photo(subject.src, subject.alt, subject.priority ?? imagePriority, false)
    : image
    ? photo(image.src, image.alt, imagePriority, true)
    : null;

  // --- One factual caption (from `badge`), kept in flow rather than floating ---
  const badgeCard = badge ? (
    <div
      className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 ${
        isNavy
          ? "border-white/10 bg-white/5"
          : "border-line bg-white shadow-sm"
      }`}
    >
      {badge.icon && (
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isNavy
              ? "bg-white/10 text-on-dark-link"
              : "bg-primary-50 text-crimson ring-1 ring-brand-border"
          }`}
        >
          {badge.icon}
        </span>
      )}
      <span className="min-w-0">
        <span
          className={`block text-sm font-semibold ${
            isNavy ? "text-white" : "text-primary"
          }`}
        >
          {badge.title}
        </span>
        {badge.subtitle && (
          <span
            className={`block text-xs ${isNavy ? "text-on-dark" : "text-muted"}`}
          >
            {badge.subtitle}
          </span>
        )}
      </span>
    </div>
  ) : null;

  const splitRight = hasSubject ? (
    <div>
      {media}
      {badgeCard}
    </div>
  ) : (
    aside
  );

  const contentWrapperMaxWidth =
    effective === "editorial"
      ? "max-w-2xl"
      : effective === "compact"
      ? "max-w-3xl"
      : undefined;

  const copyCols = hasSubject ? "lg:col-span-6" : "lg:col-span-7";
  const mediaCols = hasSubject ? "lg:col-span-6" : "lg:col-span-5";

  return (
    <section className={sectionClasses}>
      <div className="container-custom">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={`${crumbClasses} mb-6`}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={crumbLinkClasses}>
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span aria-hidden="true" className="opacity-60">
                    /
                  </span>
                  {c.href ? (
                    <Link href={c.href} className={crumbLinkClasses}>
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className={crumbCurrentClasses}>
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {effective === "split" ? (
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={`${copyCols} order-1`}>{content}</div>
            <div className={`${mediaCols} order-2`}>{splitRight}</div>
          </div>
        ) : (
          <div className={contentWrapperMaxWidth}>
            {content}
            {effective === "compact" && media && <div className="mt-10">{media}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
