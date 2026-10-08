import AdminShell from "@/components/admin/AdminShell";
import EnquiryDetail from "@/components/admin/EnquiryDetail";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ id: "_" }];
}

export default function AdminEnquiryPage() {
  return (
    <AdminShell title="Enquiry">
      <EnquiryDetail />
    </AdminShell>
  );
}
