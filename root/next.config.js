/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  // Headers for security & performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
    ];
  },

  // Redirects
  async redirects() {
    return [
      { source: "/calculator/:tool", destination: "/tools/:tool", permanent: true },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
};

module.exports = nextConfig;
