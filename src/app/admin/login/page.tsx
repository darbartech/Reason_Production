"use client";

import { useState } from "react";
import Image from "next/image";
import { api, ApiError, setCsrfToken } from "@/lib/admin/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
 try {
  const result = await api<{
    user: {
      id: string;
      email: string;
      name: string;
      role: "ADMIN" | "COUNSELOR";
    };
    csrfToken: string;
  }>("/auth/login", {
    method: "POST",
    body: { email, password },
    redirectOn401: false,
  });

  setCsrfToken(result.csrfToken);

  window.location.assign("/admin");
} catch (err) {
  setError((err as ApiError).message);
  setBusy(false);
}
  };

  const field =
    "w-full rounded-md border border-brand-border bg-white px-3 py-2.5 text-sm text-primary focus:border-accent outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-brand-border rounded-lg p-6">
        <Image
          src="/logo/logo.png"
          alt="Reasons Education"
          width={480}
          height={208}
          className="h-12 w-auto mb-5"
          priority
        />
        <div className="text-lg font-semibold text-primary">Staff sign in</div>
        <div className="text-sm text-brand-text-muted mb-5">Enquiry management for Reasons Education staff.</div>

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-brand-text-muted mb-1">Email</label>
            <input id="email" type="email" autoComplete="username" required value={email}
              onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-brand-text-muted mb-1">Password</label>
            <input id="password" type="password" autoComplete="current-password" required value={password}
              onChange={(e) => setPassword(e.target.value)} className={field} />
          </div>
          {error && (
            <div role="alert" className="rounded-md border border-crimson/30 bg-crimson/5 px-3 py-2 text-sm text-crimson">
              {error}
            </div>
          )}
          <button type="submit" disabled={busy || !email || !password}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent disabled:opacity-60 transition-colors">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
