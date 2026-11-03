import type { Metadata } from "next";
import { company } from "./company";

export const DEFAULT_OG_IMAGE = "/og/home.png";

type Opts = {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle,
  noindex,
}: Opts): Metadata {
  const url = `${company.url}${path}`;
  const brandedTitle = `${title} | ${company.displayName}`;
  const useAbsoluteTitle =
    absoluteTitle ?? (title.includes(company.displayName) || brandedTitle.length > 60);

  return {
    title: useAbsoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: company.displayName,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
