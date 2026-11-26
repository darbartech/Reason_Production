"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, Users, UserCog } from "lucide-react";
import { Role } from "@/lib/admin/api";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
  { href: "/admin/enquiries", label: "Enquiries", icon: Users, adminOnly: false },
  { href: "/admin/users", label: "Users", icon: UserCog, adminOnly: true },
];

// Plain <a> links on purpose: admin pages are served per-request behind the session check.
export default function AdminSidebar({ role }: { role: Role }) {
  const pathname = (usePathname() || "").replace(/\/$/, "");
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const items = ITEMS.filter((i) => !i.adminOnly || role === "ADMIN");

  return (
    <aside className="bg-primary text-white md:w-56 md:min-h-screen md:fixed md:inset-y-0 md:left-0 flex md:flex-col">
      <div className="hidden md:flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <Image
          src="/logo/logo-reversed.png"
          alt=""
          width={657}
          height={240}
          className="h-7 w-auto object-contain"
          priority
        />
        <span className="text-sm font-semibold tracking-wide">Admin</span>
      </div>
      <nav className="flex md:flex-col gap-1 p-2 md:p-3 flex-1 md:flex-none overflow-x-auto" aria-label="Admin">
        {items.map(({ href, label, icon: Icon }) => (
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
