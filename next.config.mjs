/** @type {import('next').NextConfig} */

// Pages that read no request-time data are still prerendered at build; the API now runs in
// the same Next server as the pages, so there is no separate Express process to proxy to.

const isProduction = process.env.NODE_ENV === "production";

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

// Report-only while the third-party enquiry widgets (Turnstile/Web3Forms) are in use.
const PUBLIC_CSP_REPORT = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "frame-src https://www.google.com https://www.youtube.com",
  "connect-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "report-uri /csp-report",
].join("; ");

// Staff pages get an enforced policy. It is report-only outside production because the
// dev bundler needs script sources a production page never uses.
const ADMIN_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const ADMIN_HEADER_KEY = isProduction ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";
const ADMIN_HEADER_VALUE = isProduction ? ADMIN_CSP : `${ADMIN_CSP}; report-uri /csp-report`;

const nextConfig = {
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Content-Security-Policy-Report-Only", value: PUBLIC_CSP_REPORT },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: ADMIN_HEADER_KEY, value: ADMIN_HEADER_VALUE },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: ADMIN_HEADER_KEY, value: ADMIN_HEADER_VALUE },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/healthz",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
