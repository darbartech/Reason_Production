import { TimelineEvent } from "@/lib/admin/api";
import { formatDateTime, priorityLabel, statusLabel } from "@/lib/admin/format";

function describe(ev: TimelineEvent): string {
  const { from, to } = ev.detail;
  switch (ev.type) {
    case "RECEIVED":
      return "Enquiry received";
    case "STATUS_CHANGED":
      return `Status changed from ${statusLabel(from ?? "")} to ${statusLabel(to ?? "")}`;
    case "PRIORITY_CHANGED":
      return `Priority changed from ${priorityLabel(from ?? "")} to ${priorityLabel(to ?? "")}`;
    case "ASSIGNED":
      return to ? `Assigned to ${to}${from ? ` (was ${from})` : ""}` : `Unassigned${from ? ` (was ${from})` : ""}`;
    case "FOLLOW_UP_SET":
      return to ? `Follow-up scheduled for ${formatDateTime(to)}` : "Follow-up cleared";
    case "NOTE_ADDED":
      return "Note added";
    default:
      return ev.type;
  }
}

export default function LeadTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="space-y-3">
      {events.map((ev) => (
        <li key={ev.id} className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent" aria-hidden />
          <div>
            <div className="text-sm text-primary">{describe(ev)}</div>
            <div className="text-xs text-brand-text-muted">
              {formatDateTime(ev.createdAt)}
              {ev.actorName ? ` · ${ev.actorName}` : ""}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
