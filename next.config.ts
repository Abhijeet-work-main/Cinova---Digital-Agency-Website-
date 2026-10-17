import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com https://app.cal.com;
  frame-src 'self' https://cal.com https://app.cal.com;
  connect-src 'self' https://cal.com https://app.cal.com https://api.cal.com https://*.cal.com;
  img-src 'self' blob: data: https://cal.com https://app.cal.com https://*.cal.com https://images.unsplash.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cal.com https://app.cal.com;
  font-src 'self' https://fonts.gstatic.com data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://cal.com https://app.cal.com;
  frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
