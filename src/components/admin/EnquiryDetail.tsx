"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { api, ApiError, Enquiry, EnquiryDetailData, Meta } from "@/lib/admin/api";
import {
  formatDateTime, isoToNepalInput, nepalInputToIso, priorityLabel, statusLabel, telNumber, whatsappNumber,
} from "@/lib/admin/format";
import { useAdminUser } from "./AdminShell";
import { PriorityBadge, StatusBadge } from "./EnquiryStatusBadge";
import LeadNotes from "./LeadNotes";
import LeadTimeline from "./LeadTimeline";

const card = "bg-white border border-brand-border rounded-lg";
const field =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-primary focus:border-accent outline-none";

function Section({ title, rows }: { title: string; rows: [string, string | null | undefined][] }) {
  return (
    <section className={`${card} p-4`}>
      <div className="text-sm font-semibold text-primary mb-3">{title}</div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-brand-text-muted">{k}</dt>
            <dd className="text-sm text-primary break-words">{v || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function EnquiryDetail() {
  const pathname = usePathname() || "";
  const id = pathname.replace(/\/$/, "").split("/").pop() || "";
  const user = useAdminUser();

  const [data, setData] = useState<EnquiryDetailData | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saving, setSaving] = useState(false);

  const hydrate = useCallback((d: EnquiryDetailData) => {
    setData(d);
    setStatus(d.enquiry.status);
    setPriority(d.enquiry.priority);
    setAssignedTo(d.enquiry.assignedTo ?? "");
    setFollowUp(isoToNepalInput(d.enquiry.nextFollowUpAt));
  }, []);

  useEffect(() => {
    api<EnquiryDetailData>(`/enquiries/${id}`)
      .then(hydrate)
      .catch((e: ApiError) => setError(e.status === 404 ? "This enquiry was not found, or you don't have access to it." : e.message));
    api<Meta>("/meta").then(setMeta).catch(() => {});
  }, [id, hydrate]);

  if (error) {
    return (
      <div className={`${card} p-8 text-center`}>
        <div className="text-sm text-primary mb-4">{error}</div>
        <a href="/admin/enquiries" className="text-sm font-medium text-accent hover:underline">Back to enquiries</a>
      </div>
    );
  }
  if (!data) return <div className="text-sm text-brand-text-muted">Loading enquiry…</div>;

  const e: Enquiry = data.enquiry;
  const currentFollowUp = isoToNepalInput(e.nextFollowUpAt);
  const dirty =
    status !== e.status || priority !== e.priority || assignedTo !== (e.assignedTo ?? "") || followUp !== currentFollowUp;

  const save = async () => {
    const body: Record<string, unknown> = {};
    if (status !== e.status) body.status = status;
    if (priority !== e.priority) body.priority = priority;
    if (assignedTo !== (e.assignedTo ?? "")) body.assignedTo = assignedTo || null;
    if (followUp !== currentFollowUp) body.nextFollowUpAt = nepalInputToIso(followUp);
    if (!Object.keys(body).length) return;
    setSaving(true);
    try {
      hydrate(await api<EnquiryDetailData>(`/enquiries/${id}`, { method: "PATCH", body }));
      toast.success("Changes saved");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const addNote = async (text: string) => {
    try {
      hydrate(await api<EnquiryDetailData>(`/enquiries/${id}/notes`, { method: "POST", body: { body: text } }));
      toast.success("Note added");
      return true;
    } catch (err) {
      toast.error((err as Error).message);
      return false;
    }
  };

  const wa = whatsappNumber(e.phone);
  const actionBtn =
    "inline-flex items-center gap-1.5 rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-50";

  const assignees = meta?.counselors ?? [];
  const assigneeKnown = !e.assignedTo || assignees.some((c) => c.id === e.assignedTo);

  return (
    <div className="space-y-4">
      <a href="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
        <ArrowLeft size={14} /> All enquiries
      </a>

      <div className={`${card} p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}>
        <div>
          <div className="text-xs font-medium text-brand-text-muted">{e.leadNumber} · Received {formatDateTime(e.createdAt)}</div>
          <div className="text-xl font-semibold text-primary mt-0.5">{e.fullName}</div>
          <div className="mt-2 flex gap-2"><StatusBadge status={e.status} /><PriorityBadge priority={e.priority} /></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`tel:${telNumber(e.phone)}`} className={actionBtn}><Phone size={14} /> Call</a>
          {wa && (
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className={actionBtn}>
              <MessageCircle size={14} /> WhatsApp
            </a>
          )}
          {e.email && <a href={`mailto:${e.email}`} className={actionBtn}><Mail size={14} /> Email</a>}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        <div className="xl:col-span-2 space-y-4">
          <Section title="Student" rows={[["Name", e.fullName], ["Phone", e.phone], ["Email", e.email]]} />
          <Section
            title="Study plan"
            rows={[
              ["Country", e.country], ["Intake", e.intake], ["Study level", e.studyLevel],
              ["Course", e.course], ["Budget", e.budget],
            ]}
          />
          <Section
            title="Academic"
            rows={[
              ["Education", e.educationLevel],
              ["Result", e.result ? `${e.result} (${e.resultType})` : e.resultType],
              ["English test", e.englishTest],
              ["Score", e.englishScore],
            ]}
          />
          <Section
            title="Contact preference"
            rows={[["Preferred method", e.contactMethod], ["Preferred time", e.contactTime]]}
          />
          <Section
            title="Marketing"
            rows={[
              ["Source", e.utmSource || (e.referrer ? "Referral" : "Direct")],
              ["UTM source", e.utmSource], ["UTM medium", e.utmMedium], ["UTM campaign", e.utmCampaign],
              ["Landing page", e.sourcePage], ["Referrer", e.referrer],
            ]}
          />
          {e.message && (
            <section className={`${card} p-4`}>
              <div className="text-sm font-semibold text-primary mb-2">Message from student</div>
              <div className="text-sm text-primary whitespace-pre-wrap break-words">{e.message}</div>
            </section>
          )}
        </div>

        <div className="space-y-4">
          <section className={`${card} p-4`}>
            <div className="text-sm font-semibold text-primary mb-3">Management</div>
            <div className="space-y-3">
              <div>
                <label htmlFor="m-status" className="block text-xs text-brand-text-muted mb-1">Status</label>
                <select id="m-status" value={status} onChange={(ev) => setStatus(ev.target.value)} className={field}>
                  {(meta?.statuses ?? [e.status]).map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="m-priority" className="block text-xs text-brand-text-muted mb-1">Priority</label>
                <select id="m-priority" value={priority} onChange={(ev) => setPriority(ev.target.value)} className={field}>
                  {(meta?.priorities ?? [e.priority]).map((s) => <option key={s} value={s}>{priorityLabel(s)}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="m-assigned" className="block text-xs text-brand-text-muted mb-1">Assigned counselor</label>
                <select id="m-assigned" value={assignedTo} onChange={(ev) => setAssignedTo(ev.target.value)} className={field}>
                  <option value="">Unassigned</option>
                  {!assigneeKnown && <option value={e.assignedTo ?? ""}>{e.assignedToName}</option>}
                  {assignees.map((c) => <option key={c.id} value={c.id}>{c.name}{c.id === user.id ? " (me)" : ""}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="m-followup" className="block text-xs text-brand-text-muted mb-1">Next follow-up (Nepal time)</label>
                <div className="flex gap-2">
                  <input id="m-followup" type="datetime-local" value={followUp} onChange={(ev) => setFollowUp(ev.target.value)} className={field} />
                  {followUp && (
                    <button type="button" onClick={() => setFollowUp("")} className="rounded-md border border-brand-border px-3 text-sm text-primary hover:bg-primary-50">
                      Clear
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={save}
                disabled={!dirty || saving}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-accent disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </section>

          <section className={`${card} p-4`}>
            <div className="text-sm font-semibold text-primary mb-3">Internal notes</div>
            <LeadNotes notes={data.notes} onAdd={addNote} />
          </section>

          <section className={`${card} p-4`}>
            <div className="text-sm font-semibold text-primary mb-3">Activity</div>
            <LeadTimeline events={data.timeline} />
          </section>
        </div>
      </div>
    </div>
  );
}
