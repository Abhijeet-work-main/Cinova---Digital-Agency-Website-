import type { NextConfig } from "next";

const cspReportOnlyHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com https://app.cal.com https://*.cal.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://player.vimeo.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cal.com https://app.cal.com https://*.cal.com;
  font-src 'self' data: https://fonts.gstatic.com https://cal.com https://app.cal.com https://*.cal.com;
  img-src 'self' blob: data: https://cal.com https://app.cal.com https://*.cal.com https://images.unsplash.com https://plus.unsplash.com https://media.istockphoto.com https://i.ytimg.com https://*.ytimg.com https://*.vimeocdn.com;
  media-src 'self' blob: data: https://*.vimeo.com https://*.vimeocdn.com;
  frame-src 'self' https://cal.com https://app.cal.com https://*.cal.com https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://player.vimeo.com;
  connect-src 'self' https://api.emailjs.com https://cal.com https://app.cal.com https://api.cal.com https://*.cal.com wss://*.cal.com wss://app.cal.com https://fonts.googleapis.com https://fonts.gstatic.com https://player.vimeo.com https://*.vimeo.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://cal.com https://app.cal.com https://*.cal.com;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnlyHeader,
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
