import { nepalMonthStart } from "@/lib/admin/format";
import type { DashboardStats } from "@/lib/admin/api";

export interface Stats extends DashboardStats {}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const cards = [
    { label: "New Leads", value: stats.newLeads, href: "/admin/enquiries?status=NEW" },
    { label: "Follow-ups Due", value: stats.followUpsDue, href: "/admin/enquiries?followUp=due" },
    { label: "Total Enquiries", value: stats.total, href: "/admin/enquiries" },
    { label: "Enquiries This Month", value: stats.thisMonth, href: `/admin/enquiries?dateFrom=${nepalMonthStart()}` },
  ];

  const hasFollowupStats =
    stats.dueToday !== undefined &&
    stats.overdue !== undefined &&
    stats.upcomingNext7 !== undefined &&
    stats.noFollowup !== undefined;

  const followupCards = hasFollowupStats
    ? [
        { label: "Today's Follow-ups", value: stats.dueToday, href: "/admin/enquiries?followUp=today" },
        { label: "Overdue", value: stats.overdue, href: "/admin/enquiries?followUp=overdue" },
        { label: "Upcoming (7 days)", value: stats.upcomingNext7, href: "/admin/enquiries?followUp=upcoming" },
        { label: "No Follow-up", value: stats.noFollowup, href: "/admin/enquiries?followUp=none" },
      ]
    : [];

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="bg-white border border-brand-border rounded-lg px-4 py-4 hover:border-accent transition-colors"
          >
            <div className="text-xs font-medium text-brand-text-muted">{c.label}</div>
            <div className="mt-1 text-3xl font-semibold text-primary tabular-nums">{c.value}</div>
          </a>
        ))}
      </div>
      {hasFollowupStats && followupCards.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {followupCards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="bg-white border border-brand-border rounded-2xl shadow-sm px-4 py-4 hover:border-accent transition-colors"
            >
              <div className="text-xs font-medium text-brand-text-muted">{c.label}</div>
              <div className="mt-1 text-3xl font-semibold text-primary tabular-nums">{c.value}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
