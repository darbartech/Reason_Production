"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { api, goToLogin, AdminUser } from "@/lib/admin/api";

export default function AdminHeader({ user, title }: { user: AdminUser; title: string }) {
  const [busy, setBusy] = useState(false);

  const logout = async () => {
    setBusy(true);
    try {
      await api("/auth/logout", { method: "POST", body: {}, redirectOn401: false });
    } catch {
      /* session may already be gone */
    }
    goToLogin();
  };

  return (
    <header className="h-14 md:h-16 bg-white border-b border-brand-border flex items-center justify-between px-4 md:px-6">
      <div className="text-base md:text-lg font-semibold text-primary">{title}</div>
      <div className="flex items-center gap-4">
        <div className="text-right leading-tight">
          <div className="text-sm font-medium text-primary">{user.name}</div>
          <div className="text-xs text-brand-text-muted">{user.role === "ADMIN" ? "Admin" : "Counselor"}</div>
        </div>
        <button
          onClick={logout}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-50 disabled:opacity-60"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </header>
  );
}
