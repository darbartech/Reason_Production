import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PenLine from "./PenLine";

type Variant = "stacked" | "split" | "statement" | "numeric";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  variant?: Variant;
  action?: { label: string; href: string };
  numeric?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  id,
  variant = "stacked",
  action,
  numeric,
  className = "",
}: Props) {
  const center = align === "center";

  if (variant === "split") {
    return (
      <header className={`grid gap-6 lg:grid-cols-2 lg:items-end ${className}`}>
        <div>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <Tag id={id} className="text-balance max-w-xl">{title}</Tag>
        </div>
        <div className="lg:pb-1">
          {intro && <p className="lead max-w-xl">{intro}</p>}
          {action && (
            <Link href={action.href} className="link-arrow mt-5 inline-flex min-h-11 items-center">
              {action.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </header>
    );
  }

  if (variant === "statement") {
    return (
      <header className={className}>
        <Tag
          id={id}
          className="text-balance max-w-4xl"
          style={{ fontSize: "clamp(2.25rem, 1.4rem + 3vw, 4rem)", lineHeight: 1.05 }}
        >
          {title}
        </Tag>
        {intro && <p className="lead mt-5 max-w-2xl">{intro}</p>}
        <PenLine className="mt-8 max-w-md" />
      </header>
    );
  }

  if (variant === "numeric") {
    return (
      <header className={`max-w-2xl ${className}`}>
        {numeric && (
          <p aria-hidden="true" className="font-heading text-6xl leading-none text-crimson/90 md:text-7xl">
            {numeric}
          </p>
        )}
        {eyebrow && <p className="eyebrow mt-6 mb-4">{eyebrow}</p>}
        <Tag id={id} className="text-balance">{title}</Tag>
        {intro && <p className="lead mt-4">{intro}</p>}
      </header>
    );
  }

  return (
    <header className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <Tag id={id} className="text-balance">{title}</Tag>
      {intro && <p className={`lead mt-4 ${center ? "mx-auto" : ""}`}>{intro}</p>}
      {action && (
        <Link href={action.href} className={`link-arrow mt-5 inline-flex min-h-11 items-center ${center ? "justify-center" : ""}`}>
          {action.label}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </header>
  );
}
