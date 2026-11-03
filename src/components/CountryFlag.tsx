type Props = {
  code: string;
  className?: string;
};

export default function CountryFlag({ code, className = "h-7 w-7" }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/flags/${code}.svg`}
      alt=""
      width={512}
      height={512}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-full ring-1 ring-black/10 ${className}`}
    />
  );
}
