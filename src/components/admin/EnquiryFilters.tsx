import { Search, X } from "lucide-react";
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

const field =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-primary focus:border-accent outline-none";
const label = "block text-xs font-medium text-brand-text-muted mb-1";

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

export default function EnquiryFilters({
  filters, meta, onChange,
}: { filters: Filters; meta: Meta | null; onChange: (next: Filters) => void }) {
  const set = (k: keyof Filters) => (v: string) => onChange({ ...filters, [k]: v });
  const active = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white border border-brand-border rounded-lg p-4 space-y-3">
      <div className="relative">
        <label htmlFor="f-q" className="sr-only">Search</label>
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" />
        <input
          id="f-q"
          value={filters.q}
          onChange={(e) => set("q")(e.target.value)}
          placeholder="Search by name, phone, email or lead number"
          className={`${field} pl-9`}
          autoComplete="off"
        />
      </div>

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

      {(meta?.stages ?? []).length > 0 && (
        <div>
          <div className={label}>Stage</div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => set("stage")("")}
              className={
                filters.stage === ""
                  ? "rounded-md border border-accent bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
                  : "rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm text-brand-text-muted hover:border-accent"
              }
            >
              All
            </button>
            {(meta?.stages ?? []).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("stage")(s)}
                className={
                  filters.stage === s
                    ? "rounded-md border border-accent bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
                    : "rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm text-brand-text-muted hover:border-accent"
                }
              >
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
            <button
              key={value}
              type="button"
              onClick={() => set("followUp")(value)}
              className={
                filters.followUp === value
                  ? "rounded-md border border-accent bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
                  : "rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm text-brand-text-muted hover:border-accent"
              }
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <button
          onClick={() => onChange(EMPTY_FILTERS)}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          <X size={14} /> Clear all filters
        </button>
      )}
    </div>
  );
}
