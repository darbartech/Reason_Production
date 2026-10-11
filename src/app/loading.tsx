import Image from "next/image";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Reasons Education"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper animate-fade-in"
    >
      <Image
        src="/logo/logo.png"
        alt="Reasons Education"
        width={480}
        height={208}
        priority
        className="h-14 w-auto object-contain"
      />

      <div
        aria-hidden="true"
        className="relative mt-8 h-1 w-40 overflow-hidden rounded-full bg-primary/10"
      >
        <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-crimson animate-loading-bar" />
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
