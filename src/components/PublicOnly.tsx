"use client";

import { usePathname } from "next/navigation";

// Hides public-site chrome (navbar, footer, WhatsApp button) on the staff admin pages.
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return <>{children}</>;
}
