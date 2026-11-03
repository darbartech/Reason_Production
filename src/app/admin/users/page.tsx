"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyRound, Pencil, Plus, ShieldAlert } from "lucide-react";
import { api, ApiError, Role, StaffUser } from "@/lib/admin/api";
import AdminShell, { useAdminUser } from "@/components/admin/AdminShell";
import { formatDateTime } from "@/lib/admin/format";

export default function AdminUsersPage() {
  return (
    <AdminShell title="Users">
      <UsersPanel />
    </AdminShell>
  );
}

interface Draft {
  id: string | null;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  password: string;
}

const EMPTY: Draft = { id: null, name: "", email: "", role: "COUNSELOR", active: true, password: "" };

const field =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-primary focus:border-accent outline-none disabled:bg-primary-50 disabled:text-brand-text-muted";
const btn =
  "inline-flex items-center gap-1.5 rounded-md border border-brand-border bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-50 disabled:opacity-50";

function UsersPanel() {
  const me = useAdminUser();
  const [users, setUsers] = useState<StaffUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await api<{ users: StaffUser[] }>("/users");
      setUsers(r.users);
      setError(null);
    } catch (e) {
      setError((e as ApiError).message);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (me.role !== "ADMIN") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-brand-border bg-white px-4 py-3 text-sm text-brand-text-muted">
        <ShieldAlert size={16} />
        Only admins can manage staff accounts.
      </div>
    );
  }

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError((e as ApiError).message);
    } finally {
      setBusy(false);
    }
  };

  const save = () =>
    run(async () => {
      if (!draft) return;
      setNotice(null);
      setTempPassword(null);
      if (draft.id) {
        await api(`/users/${draft.id}`, {
          method: "PATCH",
          body: { name: draft.name, role: draft.role, active: draft.active },
        });
        setNotice(`${draft.name} updated.`);
      } else {
        const r = await api<{ user: StaffUser; temporaryPassword: string | null }>("/users", {
          method: "POST",
          body: { name: draft.name, email: draft.email, role: draft.role, password: draft.password || undefined },
        });
        setNotice(`${r.user.name} added.`);
        setTempPassword(r.temporaryPassword);
      }
      setDraft(null);
      await load();
    });

  const setActive = (u: StaffUser, active: boolean) => {
    if (!active && !window.confirm(`Deactivate ${u.name}? They will be signed out immediately.`)) return;
    void run(async () => {
      await api(`/users/${u.id}`, { method: "PATCH", body: { active } });
      setNotice(active ? `${u.name} reactivated.` : `${u.name} deactivated.`);
      await load();
    });
  };

  const resetPassword = (u: StaffUser) => {
    if (!window.confirm(`Reset the password for ${u.name}? They will be signed out.`)) return;
    void run(async () => {
      setNotice(null);
      const r = await api<{ temporaryPassword: string | null }>(`/users/${u.id}/password`, { method: "POST", body: {} });
      setNotice(`Password reset for ${u.name}.`);
      setTempPassword(r.temporaryPassword);
    });
  };

  const editingSelf = draft?.id === me.id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-brand-text-muted">
          Staff accounts that can sign in to this panel.
        </div>
        <button
          type="button"
          className={`${btn} border-primary text-white bg-primary hover:bg-accent`}
          onClick={() => { setDraft(draft ? null : { ...EMPTY }); setNotice(null); setTempPassword(null); }}
          disabled={busy}
        >
          <Plus size={14} />
          Add user
        </button>
      </div>

      {error && <div className="rounded-md border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson">{error}</div>}

      {notice && (
        <div className="rounded-md border border-brand-border bg-white px-4 py-3 text-sm text-primary">
          <div>{notice}</div>
          {tempPassword && (
            <div className="mt-1.5">
              Temporary password (shown once):{" "}
              <code className="rounded bg-primary-50 px-1.5 py-0.5 font-mono text-[13px] text-primary">{tempPassword}</code>
            </div>
          )}
        </div>
      )}

      {draft && (
        <div className="rounded-lg border border-brand-border bg-white p-4 space-y-3">
          <div className="text-sm font-semibold text-primary">{draft.id ? "Edit user" : "New user"}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-brand-text-muted">Name</span>
              <input className={field} value={draft.name} maxLength={120}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-brand-text-muted">Email</span>
              <input className={field} type="email" value={draft.email} disabled={!!draft.id}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-brand-text-muted">Role</span>
              <select className={field} value={draft.role} disabled={editingSelf}
                onChange={(e) => setDraft({ ...draft, role: e.target.value as Role })}>
                <option value="COUNSELOR">Counselor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-brand-text-muted">
                {draft.id ? "Replace password (optional)" : "Password (optional)"}
              </span>
              <input className={field} type="text" value={draft.password} autoComplete="new-password"
                placeholder="Leave blank to generate one" maxLength={200}
                onChange={(e) => setDraft({ ...draft, password: e.target.value })} />
            </label>
          </div>
          {draft.id && (
            <label className="flex items-center gap-2 text-sm text-primary">
              <input type="checkbox" checked={draft.active} disabled={editingSelf}
                onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />
              Active
            </label>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`${btn} border-primary bg-primary text-white hover:bg-accent`}
              onClick={() => void save()}
              disabled={busy || !draft.name.trim() || (!draft.id && !draft.email.trim())}
            >
              {busy ? "Saving…" : "Save"}
            </button>
            <button type="button" className={btn} onClick={() => setDraft(null)} disabled={busy}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {!users && !error && <div className="text-sm text-brand-text-muted">Loading…</div>}

      {users && (
        <div className="overflow-x-auto rounded-lg border border-brand-border bg-white">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="bg-primary-50 text-xs font-semibold uppercase tracking-wide text-primary-500">
              <tr>
                {["Name", "Email", "Role", "Status", "Last sign-in", "Actions"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-3 py-2.5 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-primary-50/60">
                  <td className="px-3 py-2.5 font-medium text-primary">
                    {u.name}
                    {u.id === me.id && <span className="ml-1.5 text-xs font-normal text-brand-text-muted">(you)</span>}
                  </td>
                  <td className="px-3 py-2.5 text-brand-text-muted">{u.email}</td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold ${
                      u.role === "ADMIN" ? "border-primary-200 bg-primary-50 text-primary-700" : "border-brand-border bg-white text-primary-400"
                    }`}>
                      {u.role === "ADMIN" ? "Admin" : "Counselor"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold ${
                      u.active ? "border-primary-200 bg-primary-50 text-primary-700" : "border-crimson/30 bg-crimson/5 text-crimson"
                    }`}>
                      {u.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-brand-text-muted">{formatDateTime(u.lastLoginAt)}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button type="button" className={btn} disabled={busy}
                        onClick={() => { setDraft({ id: u.id, name: u.name, email: u.email, role: u.role, active: u.active, password: "" }); setNotice(null); setTempPassword(null); }}>
                        <Pencil size={13} />
                        Edit
                      </button>
                      <button type="button" className={btn} disabled={busy} onClick={() => resetPassword(u)}>
                        <KeyRound size={13} />
                        Reset password
                      </button>
                      <button type="button" className={btn} disabled={busy || (u.id === me.id && u.active)}
                        onClick={() => setActive(u, !u.active)}>
                        {u.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-brand-text-muted">No staff accounts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
