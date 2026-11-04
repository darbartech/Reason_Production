"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { api, ApiError, Enquiry, Analytics } from "@/lib/admin/api";
import AdminShell from "@/components/admin/AdminShell";
import DashboardStats, { Stats } from "@/components/admin/DashboardStats";
import EnquiryTable from "@/components/admin/EnquiryTable";
import AnalyticsSection from "@/components/admin/AnalyticsSection";
import { isOverdue, formatDateTime } from "@/lib/admin/format";

interface StatsResponse {
  stats: Stats;
  recent: Enquiry[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api<StatsResponse>("/stats"),
      api<Analytics>("/analytics"),
    ])
      .then(([s, a]) => { setData(s); setAnalytics(a); })
      .catch((e: ApiError) => setError(e.message));
  }, []);

  return (
    <AdminShell title="Dashboard">
      {error && <div className="mb-4 rounded-md border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson">{error}</div>}
      {!data && !error && <div className="text-sm text-brand-text-muted">Loading…</div>}
      {data && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div />
            <a
              href="/api/admin/enquiries.csv"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-md border border-brand-border bg-white px-3.5 py-2 text-sm font-medium text-primary hover:bg-primary-50"
            >
              <Download size={14} />
              Export all enquiries (CSV)
            </a>
          </div>

          <DashboardStats stats={data.stats} />

          {analytics?.dueNow && analytics.dueNow.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-primary">Follow-ups due now</div>
                  <div className="text-xs text-brand-text-muted mt-0.5">
                    Overdue and scheduled within the next 48 hours
                  </div>
                </div>
                <a href="/admin/enquiries?followUp=due" className="text-sm font-medium text-accent hover:underline">
                  View all due
                </a>
              </div>
              <div className="bg-white border border-brand-border rounded-lg overflow-x-auto">
                <table className="w-full min-w-[700px] text-[13px] text-left">
                  <thead className="bg-primary-50 text-xs font-semibold text-primary-500 uppercase tracking-wide">
                    <tr>
                      {["Lead", "Student", "Country", "Status", "Priority", "Assigned To", "Follow-up"].map((h) => (
                        <th key={h} className="px-2.5 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {analytics.dueNow.map((r) => {
                      const overdue = isOverdue(r.nextFollowUpAt);
                      return (
                        <tr key={r.id} className="hover:bg-primary-50/60">
                          <td className="px-2.5 py-2.5 whitespace-nowrap">
                            <a href={`/admin/enquiries/${r.id}`} className="font-medium text-accent hover:underline">{r.leadNumber}</a>
                          </td>
                          <td className="px-2.5 py-2.5">
                            <a href={`/admin/enquiries/${r.id}`} className="font-medium text-primary hover:underline whitespace-nowrap">{r.fullName}</a>
                            <div className="text-xs text-brand-text-muted">{r.phone}</div>
                          </td>
                          <td className="px-2.5 py-2.5">{r.country}</td>
                          <td className="px-2.5 py-2.5">
                            <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap border bg-primary-50 text-primary-700 border-primary-200">
                              {r.status.toLowerCase().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                            </span>
                          </td>
                          <td className="px-2.5 py-2.5">
                            <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap border ${
                              r.priority === "URGENT" ? "bg-crimson text-white border-crimson" :
                              r.priority === "HIGH" ? "bg-primary text-white border-primary" :
                              r.priority === "NORMAL" ? "bg-white text-primary-600 border-primary-200" :
                              "bg-white text-primary-400 border-brand-border"
                            }`}>{r.priority.charAt(0) + r.priority.slice(1).toLowerCase()}</span>
                          </td>
                          <td className="px-2.5 py-2.5 whitespace-nowrap text-sm">
                            {r.assignedToName ?? <span className="text-brand-text-muted">Unassigned</span>}
                          </td>
                          <td className="px-2.5 py-2.5 whitespace-nowrap">
                            <span className={`text-sm font-medium ${overdue ? "text-crimson" : "text-primary"}`}>
                              {formatDateTime(r.nextFollowUpAt)}
                            </span>
                            <div className={`text-xs ${overdue ? "text-crimson" : "text-brand-text-muted"}`}>
                              {overdue ? "Overdue" : "Scheduled"}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-primary">Recent enquiries</div>
              <a href="/admin/enquiries" className="text-sm font-medium text-accent hover:underline">View all</a>
            </div>
            <EnquiryTable rows={data.recent} emptyText="No enquiries yet. New submissions from the website will appear here." />
          </div>

          {analytics && <AnalyticsSection analytics={analytics} />}
        </div>
      )}
    </AdminShell>
  );
}
