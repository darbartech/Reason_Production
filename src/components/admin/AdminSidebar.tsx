"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Users },
];

// Plain <a> links on purpose: admin pages are served per-request behind the session check.
export default function AdminSidebar() {
  const pathname = (usePathname() || "").replace(/\/$/, "");
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <aside className="bg-primary text-white md:w-56 md:min-h-screen md:fixed md:inset-y-0 md:left-0 flex md:flex-col">
      <div className="hidden md:flex items-center gap-3 px-5 h-16 border-b border-white/10">
        <span className="text-sm font-semibold tracking-wide">Reason Admin</span>
      </div>
      <nav className="flex md:flex-col gap-1 p-2 md:p-3 flex-1 md:flex-none overflow-x-auto" aria-label="Admin">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            aria-current={active(href) ? "page" : undefined}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              active(href) ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
