"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Loader2, X } from "lucide-react";
import { api, setCsrfToken } from "@/lib/admin/api";

const field =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-primary focus:border-accent outline-none";
const btnPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-accent disabled:opacity-50";

export default function ChangePasswordDialog({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("The two new passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      const r = await api<{ ok: boolean; csrfToken: string }>("/auth/password", {
        method: "POST",
        body: { currentPassword, newPassword },
      });
      setCsrfToken(r.csrfToken);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="change-password-title" className="flex items-center gap-2 text-base font-semibold text-primary">
            <KeyRound size={16} />
            Change password
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-brand-text-muted hover:bg-primary-50"
          >
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div className="space-y-4">
            <div className="flex items-start gap-2 rounded-md border border-brand-border bg-primary-50 px-3 py-2 text-sm text-primary">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>Your password has been changed. Other devices have been signed out.</span>
            </div>
            <button type="button" onClick={onClose} className={`${btnPrimary} w-full`}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3" noValidate>
            <div>
              <label htmlFor="cp-current" className="mb-1 block text-xs font-medium text-brand-text-muted">
                Current password
              </label>
              <input
                id="cp-current"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="cp-new" className="mb-1 block text-xs font-medium text-brand-text-muted">
                New password
              </label>
              <input
                id="cp-new"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={field}
              />
              <p className="mt-1 text-xs text-brand-text-muted">At least 8 characters.</p>
            </div>

            <div>
              <label htmlFor="cp-confirm" className="mb-1 block text-xs font-medium text-brand-text-muted">
                Confirm new password
              </label>
              <input
                id="cp-confirm"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={field}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-brand-border bg-white px-3 py-2 text-sm font-medium text-primary hover:bg-primary-50"
              >
                Cancel
              </button>
              <button type="submit" disabled={busy} className={btnPrimary}>
                {busy && <Loader2 size={14} className="animate-spin" />}
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
