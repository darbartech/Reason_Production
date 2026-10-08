import { priorityLabel, statusLabel } from "@/lib/admin/format";

const base = "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap border";

const STATUS_TONE: Record<string, string> = {
  NEW: "bg-accent/10 text-accent border-accent/30",
  VISA_GRANTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ENROLLED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  LOST: "bg-crimson/10 text-crimson border-crimson/30",
  INVALID: "bg-crimson/10 text-crimson border-crimson/30",
  NOT_INTERESTED: "bg-primary-50 text-primary-400 border-brand-border",
  DUPLICATE: "bg-primary-50 text-primary-400 border-brand-border",
};
const STATUS_DEFAULT = "bg-primary-50 text-primary-700 border-primary-200";

const PRIORITY_TONE: Record<string, string> = {
  URGENT: "bg-crimson text-white border-crimson",
  HIGH: "bg-primary text-white border-primary",
  NORMAL: "bg-white text-primary-600 border-primary-200",
  LOW: "bg-white text-primary-400 border-brand-border",
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`${base} ${STATUS_TONE[status] ?? STATUS_DEFAULT}`}>{statusLabel(status)}</span>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  return <span className={`${base} ${PRIORITY_TONE[priority] ?? PRIORITY_TONE.NORMAL}`}>{priorityLabel(priority)}</span>;
}
