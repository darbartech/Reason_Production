"use client";

import { useState } from "react";
import { Note } from "@/lib/admin/api";
import { formatDateTime } from "@/lib/admin/format";

export default function LeadNotes({
  notes, onAdd,
}: { notes: Note[]; onAdd: (body: string) => Promise<boolean> }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    const ok = await onAdd(text);
    setBusy(false);
    if (ok) setText("");
  };

  return (
    <div>
      <label htmlFor="note-body" className="sr-only">Add an internal note</label>
      <textarea
        id="note-body"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={5000}
        rows={3}
        placeholder="Add an internal note (only staff can see this)"
        className="w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-primary focus:border-accent outline-none resize-y"
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={submit}
          disabled={busy || !text.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-accent disabled:opacity-50 transition-colors"
        >
          {busy ? "Adding…" : "Add note"}
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {notes.length === 0 && <li className="text-sm text-brand-text-muted">No notes yet.</li>}
        {notes.map((n) => (
          <li key={n.id} className="rounded-md border border-brand-border bg-primary-50/60 px-3 py-2.5">
            <div className="text-xs text-brand-text-muted">{formatDateTime(n.createdAt)}</div>
            <div className="mt-1 whitespace-pre-wrap break-words text-sm text-primary">{n.body}</div>
            <div className="mt-1 text-xs font-medium text-primary-500">— {n.authorName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
