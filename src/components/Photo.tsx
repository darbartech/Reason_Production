type Props = {
  name: string;
  alt: string;
  widths?: number[];
  sizes: string;
  ratio?: string;
  priority?: boolean;
  fill?: boolean;
  objectPosition?: string;
  className?: string;
};

export default function Photo({
  name,
  alt,
  sizes,
  ratio = "aspect-[4/5]",
  widths = [640, 1200],
  priority,
  fill,
  objectPosition,
  className = "",
}: Props) {
  const set = (ext: string) =>
    widths.map((w) => `/images/photos/${name}-${w}.${ext} ${w}w`).join(", ");
  const largest = widths[widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/photos/${name}-${largest}.webp`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
        className={`${fill ? "absolute inset-0 h-full w-full" : `${ratio} w-full`} object-cover ${className}`}
      />
    </picture>
  );
}
