"use client";

import { usePathname } from "next/navigation";

// Routes that render on their own, without the public-site chrome.
// /admin — staff screens; /enquiry — standalone logo + form landing page.
const BARE_ROUTES = ["/admin", "/enquiry"];

export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
<<<<<<< HEAD
  const isBare = BARE_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );
  if (isBare) return null;
=======
  if (pathname === "/portal/admin_access" || pathname?.startsWith("/portal/admin_access/")) return null;
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
  return <>{children}</>;
}
