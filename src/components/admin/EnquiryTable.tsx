import { Enquiry } from "@/lib/admin/api";
import { formatDate, isOverdue } from "@/lib/admin/format";
import { PriorityBadge, StatusBadge } from "./EnquiryStatusBadge";

export default function EnquiryTable({ rows, emptyText }: { rows: Enquiry[]; emptyText: string }) {
  if (rows.length === 0) {
    return (
      <div className="bg-white border border-brand-border rounded-lg px-6 py-10 text-center text-sm text-brand-text-muted">
        {emptyText}
      </div>
    );
  }
  return (
    <div className="bg-white border border-brand-border rounded-lg overflow-x-auto">
      <table className="w-full min-w-[900px] text-[13px] text-left">
        <thead className="bg-primary-50 text-xs font-semibold text-primary-500 uppercase tracking-wide">
          <tr>
            {["Lead", "Student", "Country", "Intake", "Study Level", "Status", "Priority", "Assigned To", "Created"].map((h) => (
              <th key={h} className="px-2.5 py-2.5 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-primary-50/60">
              <td className="px-2.5 py-2.5 whitespace-nowrap">
                <a href={`/admin/enquiries/${r.id}`} className="font-medium text-accent hover:underline">{r.leadNumber}</a>
              </td>
              <td className="px-2.5 py-2.5">
                <a href={`/admin/enquiries/${r.id}`} className="font-medium text-primary hover:underline whitespace-nowrap">{r.fullName}</a>
                <div className="text-xs text-brand-text-muted">{r.phone}</div>
              </td>
              <td className="px-2.5 py-2.5">{r.country}</td>
              <td className="px-2.5 py-2.5">{r.intake}</td>
              <td className="px-2.5 py-2.5">{r.studyLevel}</td>
              <td className="px-2.5 py-2.5"><StatusBadge status={r.status} /></td>
              <td className="px-2.5 py-2.5"><PriorityBadge priority={r.priority} /></td>
              <td className="px-2.5 py-2.5 whitespace-nowrap">
                {r.assignedToName ?? <span className="text-brand-text-muted">Unassigned</span>}
                {isOverdue(r.nextFollowUpAt) && (
                  <div className="text-xs font-medium text-crimson">Follow-up due</div>
                )}
              </td>
              <td className="px-2.5 py-2.5 whitespace-nowrap text-brand-text-muted">{formatDate(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
