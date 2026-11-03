"use client";

import { useEffect, useRef, useState } from "react";
import { api, ApiError, Enquiry, Meta } from "@/lib/admin/api";
import AdminShell from "@/components/admin/AdminShell";
import EnquiryFilters, { EMPTY_FILTERS, Filters } from "@/components/admin/EnquiryFilters";
import EnquiryTable from "@/components/admin/EnquiryTable";

interface ListResponse {
  enquiries: Enquiry[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const KEYS = Object.keys(EMPTY_FILTERS) as (keyof Filters)[];

function readUrl(): { filters: Filters; page: number } {
  const p = new URLSearchParams(window.location.search);
  const filters = { ...EMPTY_FILTERS };
  KEYS.forEach((k) => { filters[k] = p.get(k) ?? ""; });
  return { filters, page: Math.max(parseInt(p.get("page") || "1", 10) || 1, 1) };
}

function toQuery(filters: Filters, page: number): string {
  const p = new URLSearchParams();
  KEYS.forEach((k) => { if (filters[k]) p.set(k, filters[k]); });
  if (page > 1) p.set("page", String(page));
  return p.toString();
}

export default function AdminEnquiriesPage() {
  const [filters, setFilters] = useState<Filters | null>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [list, setList] = useState<ListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const init = readUrl();
    setFilters(init.filters);
    setPage(init.page);
    api<Meta>("/meta").then(setMeta).catch(() => {});
  }, []);

  useEffect(() => {
    if (!filters) return;
    const q = toQuery(filters, page);
    window.history.replaceState(null, "", `/admin/enquiries${q ? `?${q}` : ""}`);
    const mine = ++reqId.current;
    setLoading(true);
    const t = setTimeout(() => {
      api<ListResponse>(`/enquiries${q ? `?${q}` : ""}`)
        .then((r) => { if (mine === reqId.current) { setList(r); setError(null); } })
        .catch((e: ApiError) => { if (mine === reqId.current) setError(e.message); })
        .finally(() => { if (mine === reqId.current) setLoading(false); });
    }, 250); // debounce typing in the search box
    return () => clearTimeout(t);
  }, [filters, page]);

  const hasFilters = filters ? Object.values(filters).some(Boolean) : false;
  const from = list && list.total ? (list.page - 1) * list.pageSize + 1 : 0;
  const to = list ? Math.min(list.page * list.pageSize, list.total) : 0;

  return (
    <AdminShell title="Enquiries">
      <div className="space-y-4">
        {filters && (
          <EnquiryFilters filters={filters} meta={meta} onChange={(f) => { setFilters(f); setPage(1); }} />
        )}

        {error && <div className="rounded-md border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson">{error}</div>}

        {list && (
          <>
            <div className="flex items-center justify-between text-sm text-brand-text-muted">
              <div>{loading ? "Updating…" : list.total ? `Showing ${from}–${to} of ${list.total}` : "0 results"}</div>
            </div>
            <EnquiryTable
              rows={list.enquiries}
              emptyText={hasFilters ? "No enquiries match these filters." : "No enquiries yet. New submissions from the website will appear here."}
            />
            {list.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={list.page <= 1}
                  className="rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="text-sm text-brand-text-muted">Page {list.page} of {list.totalPages}</div>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, list.totalPages))}
                  disabled={list.page >= list.totalPages}
                  className="rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}
