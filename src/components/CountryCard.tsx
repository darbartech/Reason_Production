import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, HelpCircle } from "lucide-react";

type CountryCardProps =
  | {
      name: string;
      code?: string;
      href: string;
      description: string;
      image: { src: string; alt: string };
      notSure?: false;
    }
  | {
      name: string;
      href: string;
      description: string;
      notSure: true;
    };

export default function CountryCard(props: CountryCardProps) {
  if (props.notSure) {
    const { name, href, description } = props;
    return (
      <Link
        href={href}
        className="group surface-dark card-hover relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-primary-900 p-6 sm:p-7"
        aria-label="Not sure which country? Talk to our team"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10">
            <HelpCircle size={22} className="text-on-dark-link" aria-hidden="true" />
          </span>
          <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-on-dark-link">
            Guidance
          </span>
        </div>
        <div>
          <h3 className="text-white transition-colors group-hover:text-on-dark-link">{name}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-dark line-clamp-3">{description}</p>
        </div>
        <span className="btn-primary w-full">
          Talk to our team <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </Link>
    );
  }

  const { name, code, href, description, image } = props;
  return (
    <Link href={href} className="group card card-hover block overflow-hidden relative aspect-[4/5]" aria-label={`Study in ${name} from Nepal`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 85vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/70 via-[55%] to-transparent to-[15%]"
      />

      {code && (
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 rounded-lg bg-white px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-primary shadow-sm border border-line"
        >
          {code}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="flex items-center justify-between text-white group-hover:text-on-dark-link transition-colors leading-tight">
          <span>{name}</span>
          <ArrowUpRight size={18} className="text-white/70 shrink-0 ml-3 transition-colors group-hover:text-on-dark-link" aria-hidden="true" />
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-on-dark line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
