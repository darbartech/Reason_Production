export default function PenLine({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-px w-full bg-line ${className}`}>
      <span className="pen-line absolute left-0 top-0 h-px w-full origin-left bg-primary" />
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-crimson" />
    </div>
  );
}
