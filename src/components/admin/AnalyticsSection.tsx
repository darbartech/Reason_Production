"use client";

import { Analytics, LabelCount, FunnelStage } from "@/lib/admin/api";
import { StatusBadge } from "./EnquiryStatusBadge";

const card = "bg-white border border-brand-border rounded-2xl shadow-sm";
const head = "text-sm font-semibold text-primary";

function BreakdownChart({
  title, rows, maxRows, empty,
}: {
  title: string;
  rows: LabelCount[];
  maxRows?: number;
  empty?: string;
}) {
  const list = maxRows ? rows.slice(0, maxRows) : rows;
  const total = list.reduce((n, r) => n + r.value, 0);
  const top = list[0]?.value || 1;
  return (
    <section className={`${card} p-4`}>
      <div className="flex items-baseline justify-between mb-3">
        <div className={head}>{title}</div>
        {total > 0 && <div className="text-xs text-brand-text-muted">{total.toLocaleString()} total</div>}
      </div>
      {list.length === 0 ? (
        <div className="text-sm text-brand-text-muted py-4 text-center">{empty ?? "No data yet."}</div>
      ) : (
        <ul className="space-y-2">
          {list.map((r) => {
            const pct = total > 0 ? (r.value / total) * 100 : 0;
            const width = Math.max((r.value / top) * 100, r.value > 0 ? 6 : 0);
            return (
              <li key={r.label}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-primary truncate pr-3">{r.label}</span>
                  <span className="font-medium tabular-nums text-primary-600 whitespace-nowrap">
                    {r.value.toLocaleString()}
                    <span className="text-brand-text-muted ml-1.5 text-xs">({pct.toFixed(0)}%)</span>
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-primary-50 overflow-hidden">
                  <div className="h-full bg-accent/70 rounded-full" style={{ width: `${width}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function StatusBreakdown({ title, rows }: { title: string; rows: LabelCount[] }) {
  const total = rows.reduce((n, r) => n + r.value, 0);
  const top = rows[0]?.value || 1;
  return (
    <section className={`${card} p-4`}>
      <div className="flex items-baseline justify-between mb-3">
        <div className={head}>{title}</div>
        {total > 0 && <div className="text-xs text-brand-text-muted">{total.toLocaleString()} total</div>}
      </div>
      {rows.length === 0 ? (
        <div className="text-sm text-brand-text-muted py-4 text-center">No data yet.</div>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => {
            const pct = total > 0 ? (r.value / total) * 100 : 0;
            const width = Math.max((r.value / top) * 100, r.value > 0 ? 6 : 0);
            return (
              <li key={r.label}>
                <div className="flex items-center gap-2 text-[13px]">
                  <StatusBadge status={r.label} />
                  <span className="ml-auto font-medium tabular-nums text-primary-600 whitespace-nowrap">
                    {r.value.toLocaleString()}
                    <span className="text-brand-text-muted ml-1.5 text-xs">({pct.toFixed(0)}%)</span>
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-primary-50 overflow-hidden">
                  <div className="h-full bg-primary/70 rounded-full" style={{ width: `${width}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function Funnel({ rows }: { rows: FunnelStage[] }) {
  const first = rows[0]?.value || 0;
  return (
    <section className={`${card} p-4`}>
      <div className={head + " mb-3"}>Conversion funnel</div>
      {first === 0 ? (
        <div className="text-sm text-brand-text-muted py-4 text-center">
          No conversion data yet. As leads progress, stages will appear here.
        </div>
      ) : (
        <ol className="space-y-2">
          {rows.map((r, i) => {
            const widthPct = first > 0 ? Math.max((r.value / first) * 100, r.value > 0 ? 10 : 0) : 0;
            const prev = rows[i - 1]?.value ?? 0;
            const drop = prev > 0 ? ((prev - r.value) / prev) * 100 : 0;
            return (
              <li key={r.key}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-primary font-medium">{r.label}</span>
                  <span className="tabular-nums text-primary-600 whitespace-nowrap">
                    {r.value.toLocaleString()}
                    {i > 0 && drop > 0 && (
                      <span className="text-crimson ml-2 text-xs">−{drop.toFixed(0)}%</span>
                    )}
                    {i === 0 && r.value > 0 && (
                      <span className="text-brand-text-muted ml-1.5 text-xs">(baseline)</span>
                    )}
                  </span>
                </div>
                <div className="mt-1 h-2.5 w-full rounded-full bg-primary-50 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      r.key === "enrolled" || r.key === "visa_granted"
                        ? "bg-accent"
                        : r.key === "enquiries"
                        ? "bg-primary"
                        : "bg-primary/60"
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

function MonthlyChart({ rows }: { rows: LabelCount[] }) {
  const ordered = [...rows].sort((a, b) => a.label.localeCompare(b.label));
  const top = ordered[ordered.length - 1]?.value || 1;
  return (
    <section className={`${card} p-4`}>
      <div className={head + " mb-3"}>Monthly enquiries</div>
      {ordered.length === 0 ? (
        <div className="text-sm text-brand-text-muted py-4 text-center">No data yet.</div>
      ) : (
        <>
          <div className="flex items-end gap-1.5 h-32">
            {ordered.map((r) => {
              const h = Math.max((r.value / top) * 100, r.value > 0 ? 8 : 2);
              return (
                <div key={r.label} className="flex-1 flex flex-col items-center gap-1" title={`${r.label}: ${r.value}`}>
                  <div className="w-full flex justify-center text-[11px] tabular-nums text-primary-600">{r.value || ""}</div>
                  <div className="w-full rounded-t bg-accent/70" style={{ height: `${h}%` }} />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-1.5">
            {ordered.map((r) => (
              <div key={r.label} className="flex-1 text-center text-[10px] text-brand-text-muted">
                {r.label.slice(2).replace("-", "/")}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default function AnalyticsSection({ analytics }: { analytics: Analytics }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BreakdownChart title="Leads by country" rows={analytics.byCountry} empty="No enquiries yet." />
        <BreakdownChart title="Leads by source" rows={analytics.bySource} maxRows={8} empty="No source data yet." />
        <StatusBreakdown title="Leads by status" rows={analytics.byStatus} />
        <BreakdownChart title="Leads by intake" rows={analytics.byIntake} empty="No intake data yet." />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Funnel rows={analytics.funnel} />
        <MonthlyChart rows={analytics.monthly} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BreakdownChart title="Top campaigns (UTM campaign)" rows={analytics.byCampaign.filter((r) => r.label !== "(none)")} maxRows={8} empty="No UTM campaigns tracked yet." />
        <BreakdownChart title="Top lead sources (UTM source)" rows={analytics.bySource.filter((r) => r.label !== "Direct / Organic")} maxRows={8} empty="No tracked sources yet — direct/organic only." />
      </div>
    </div>
  );
}
