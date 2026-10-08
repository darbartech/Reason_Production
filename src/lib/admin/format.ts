const TZ = "Asia/Kathmandu";
// Nepal has a fixed UTC+05:45 offset (no daylight saving).
const NEPAL_OFFSET = "+05:45";

export const statusLabel = (s: string) =>
  s
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const priorityLabel = statusLabel;

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-GB", { timeZone: TZ, day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(iso)
  );
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

function nepalParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour"), min: get("minute") };
}

/** ISO instant -> value for <input type="datetime-local"> in Nepal time. */
export function isoToNepalInput(iso: string | null): string {
  if (!iso) return "";
  const p = nepalParts(new Date(iso));
  return `${p.y}-${p.m}-${p.d}T${p.h}:${p.min}`;
}

/** <input type="datetime-local"> value (Nepal time) -> ISO instant. */
export function nepalInputToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(`${value}:00${NEPAL_OFFSET}`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** First day of the current month in Nepal, as YYYY-MM-DD. */
export function nepalMonthStart(): string {
  const p = nepalParts(new Date());
  return `${p.y}-${p.m}-01`;
}

export function isOverdue(iso: string | null): boolean {
  return !!iso && new Date(iso).getTime() <= Date.now();
}

/** Digits for wa.me, or null when the stored number is not a Nepali mobile. */
export function whatsappNumber(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("977") && digits.length > 10) digits = digits.slice(3);
  return /^9[78]\d{8}$/.test(digits) ? `977${digits}` : null;
}

export function telNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned;
}
