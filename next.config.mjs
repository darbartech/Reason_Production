/** @type {import('next').NextConfig} */

// `next dev`   -> normal Next.js dev server; /api/* is proxied to Express :8000.
// `next build` -> static export into /out, served by server.js in production.

const isDev = process.env.NODE_ENV !== "production";
const API_PORT = 8000;

const nextConfig = {
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  ...(isDev
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: `http://127.0.0.1:${API_PORT}/api/:path*`,
            },

            {
              source: "/admin/enquiries/:id((?!_$)[^/]+)",
              destination: "/admin/enquiries/_",
            },
          ];
        },
      }
    : {
        output: "export",
      }),
};

export default nextConfig;