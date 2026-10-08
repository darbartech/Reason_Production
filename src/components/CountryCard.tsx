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
        className="group card card-hover flex h-full min-h-[420px] sm:min-h-[440px] lg:min-h-0 flex-col items-start justify-between surface-dark p-6 sm:p-7 border border-primary-900"
        aria-label="Not sure which country? Talk to our team"
      >
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
          <HelpCircle size={22} className="text-crimson" aria-hidden="true" />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-on-dark-link">
              Guidance
            </span>
          </div>
          <h3 className="text-white group-hover:text-on-dark-link transition-colors">{name}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed">{description}</p>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-on-dark-link transition-colors">
          Talk to our team <ArrowUpRight size={16} />
        </div>
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
          className="absolute top-4 left-4 rounded-md bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-primary shadow-sm border border-line"
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
