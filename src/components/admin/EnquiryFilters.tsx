"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Meta } from "@/lib/admin/api";
import { statusLabel } from "@/lib/admin/format";

export interface Filters {
  q: string;
  status: string;
  stage: string;
  country: string;
  intake: string;
  priority: string;
  assigned: string;
  dateFrom: string;
  dateTo: string;
  followUp: string;
}

export const EMPTY_FILTERS: Filters = {
  q: "", status: "", stage: "", country: "", intake: "", priority: "", assigned: "", dateFrom: "", dateTo: "", followUp: "",
};

const ADVANCED_KEYS = ["status", "priority", "country", "intake", "assigned", "dateFrom", "dateTo"] as const;

const field =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-primary focus:border-accent outline-none";
const label = "block text-xs font-medium text-brand-text-muted mb-1";
const chip = (on: boolean) =>
  on
    ? "rounded-md border border-accent bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
    : "rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm text-brand-text-muted hover:border-accent";

function Select({
  id, text, value, onChange, children,
}: { id: string; text: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={field}>
        {children}
      </select>
    </div>
  );
}

const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function datePresets(): { text: string; from: string; to: string }[] {
  const now = new Date();
  const today = isoLocal(now);
  const minus = (n: number) => { const d = new Date(now); d.setDate(d.getDate() - n); return isoLocal(d); };
  const monthStart = isoLocal(new Date(now.getFullYear(), now.getMonth(), 1));
  return [
    { text: "Today", from: today, to: today },
    { text: "Last 7 days", from: minus(6), to: today },
    { text: "Last 30 days", from: minus(29), to: today },
    { text: "This month", from: monthStart, to: today },
  ];
}

export default function EnquiryFilters({
  filters, meta, onChange,
}: { filters: Filters; meta: Meta | null; onChange: (next: Filters) => void }) {
  const set = (k: keyof Filters) => (v: string) => onChange({ ...filters, [k]: v });
  const active = Object.values(filters).some(Boolean);
  const advancedCount = ADVANCED_KEYS.filter((k) => filters[k]).length;
  const [open, setOpen] = useState(advancedCount > 0);

  const counselorName = (id: string) =>
    id === "me" ? "Assigned to me"
      : id === "unassigned" ? "Unassigned"
      : meta?.allCounselors.find((c) => c.id === id)?.name ?? id;

  const pills: { key: keyof Filters; text: string }[] = [];
  if (filters.q) pills.push({ key: "q", text: `“${filters.q}”` });
  if (filters.status) pills.push({ key: "status", text: `Status: ${statusLabel(filters.status)}` });
  if (filters.priority) pills.push({ key: "priority", text: `Priority: ${statusLabel(filters.priority)}` });
  if (filters.country) pills.push({ key: "country", text: `Country: ${filters.country}` });
  if (filters.intake) pills.push({ key: "intake", text: `Intake: ${filters.intake}` });
  if (filters.assigned) pills.push({ key: "assigned", text: `Counselor: ${counselorName(filters.assigned)}` });
  if (filters.dateFrom || filters.dateTo) {
    pills.push({ key: "dateFrom", text: `Created: ${filters.dateFrom || "…"} → ${filters.dateTo || "…"}` });
  }
  if (filters.stage) pills.push({ key: "stage", text: `Stage: ${statusLabel(filters.stage)}` });
  if (filters.followUp) {
    const text = ({ today: "Today", overdue: "Overdue", upcoming: "Upcoming 7 days", none: "No follow-up" } as const)[filters.followUp as "today" | "overdue" | "upcoming" | "none"] ?? filters.followUp;
    pills.push({ key: "followUp", text: `Follow-up: ${text}` });
  }

  const clearPill = (key: keyof Filters) => {
    if (key === "dateFrom") onChange({ ...filters, dateFrom: "", dateTo: "" });
    else onChange({ ...filters, [key]: "" });
  };

  return (
    <div className="bg-white border border-brand-border rounded-lg p-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="f-q" className="sr-only">Search</label>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" />
          <input
            id="f-q"
            value={filters.q}
            onChange={(e) => set("q")(e.target.value)}
            placeholder="Search by name, phone, email or lead number"
            className={`${field} pl-9 ${filters.q ? "pr-9" : ""}`}
            autoComplete="off"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => set("q")("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-primary"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className={chip(open || advancedCount > 0)}
          >
            <span className="inline-flex items-center gap-1.5">
              <SlidersHorizontal size={14} />
              More filters
              {advancedCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-white">
                  {advancedCount}
                </span>
              )}
            </span>
          </button>
          {active && (
            <button
              type="button"
              onClick={() => onChange(EMPTY_FILTERS)}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-accent hover:underline"
            >
              <X size={14} /> Clear all
            </button>
          )}
        </div>
      </div>

      {pills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-brand-text-muted">Active:</span>
          {pills.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => clearPill(p.key)}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent/10"
            >
              {p.text}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="rounded-md border border-brand-border bg-brand-light-bg/60 p-3 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select id="f-status" text="Status" value={filters.status} onChange={set("status")}>
              <option value="">All statuses</option>
              {(meta?.statuses ?? []).map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
            </Select>
            <Select id="f-priority" text="Priority" value={filters.priority} onChange={set("priority")}>
              <option value="">All priorities</option>
              {(meta?.priorities ?? []).map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
            </Select>
            <Select id="f-country" text="Country" value={filters.country} onChange={set("country")}>
              <option value="">All countries</option>
              {(meta?.countries ?? []).map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select id="f-intake" text="Intake" value={filters.intake} onChange={set("intake")}>
              <option value="">All intakes</option>
              {(meta?.intakes ?? []).map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select id="f-assigned" text="Assigned counselor" value={filters.assigned} onChange={set("assigned")}>
              <option value="">Anyone</option>
              <option value="me">Assigned to me</option>
              <option value="unassigned">Unassigned</option>
              {(meta?.allCounselors ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <div>
              <label htmlFor="f-from" className={label}>Created from</label>
              <input id="f-from" type="date" value={filters.dateFrom} onChange={(e) => set("dateFrom")(e.target.value)} className={field} />
            </div>
            <div>
              <label htmlFor="f-to" className={label}>Created to</label>
              <input id="f-to" type="date" value={filters.dateTo} onChange={(e) => set("dateTo")(e.target.value)} className={field} />
            </div>
          </div>

          <div>
            <div className={label}>Quick ranges</div>
            <div className="flex flex-wrap gap-2">
              {datePresets().map((p) => (
                <button
                  key={p.text}
                  type="button"
                  onClick={() => onChange({ ...filters, dateFrom: p.from, dateTo: p.to })}
                  className={chip(filters.dateFrom === p.from && filters.dateTo === p.to)}
                >
                  {p.text}
                </button>
              ))}
              {(filters.dateFrom || filters.dateTo) && (
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, dateFrom: "", dateTo: "" })}
                  className="inline-flex items-center gap-1 rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm text-brand-text-muted hover:border-crimson hover:text-crimson"
                >
                  <X size={13} /> Any date
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {(meta?.stages ?? []).length > 0 && (
        <div>
          <div className={label}>Stage</div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => set("stage")("")} className={chip(filters.stage === "")}>
              All
            </button>
            {(meta?.stages ?? []).map((s) => (
              <button key={s} type="button" onClick={() => set("stage")(s)} className={chip(filters.stage === s)}>
                {statusLabel(s)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className={label}>Follow-up</div>
        <div className="flex flex-wrap gap-2">
          {([
            ["", "All"],
            ["today", "Today"],
            ["overdue", "Overdue"],
            ["upcoming", "Upcoming 7 days"],
            ["none", "No follow-up"],
          ] as const).map(([value, text]) => (
            <button key={value} type="button" onClick={() => set("followUp")(value)} className={chip(filters.followUp === value)}>
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
