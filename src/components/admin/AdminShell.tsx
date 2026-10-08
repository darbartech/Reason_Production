"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, AdminUser, setCsrfToken } from "@/lib/admin/api";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const UserContext = createContext<AdminUser | null>(null);
export const useAdminUser = () => useContext(UserContext) as AdminUser;

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

useEffect(() => {
  // 401 redirects to /admin/login inside api().
  api<{ user: AdminUser; csrfToken: string }>("/auth/me")
    .then((r) => {
      setCsrfToken(r.csrfToken);
      setUser(r.user);
    })
    .catch(() => {});
}, []);

  if (!user) {
    return <div className="min-h-screen bg-brand-light-bg flex items-center justify-center text-sm text-brand-text-muted">Loading…</div>;
  }

  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen bg-brand-light-bg">
        <AdminSidebar />
        <div className="md:ml-56">
          <AdminHeader user={user} title={title} />
          <div className="p-4 md:p-6 max-w-[1400px]">{children}</div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
