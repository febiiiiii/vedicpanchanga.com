import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Next.js 16: Turbopack is now stable for both dev and build
  // Already enabled via CLI flags in package.json scripts

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Experimental features for Next.js 16
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
    ],

    // Client router cache configuration (Next.js 16)
    staleTimes: {
      dynamic: 30,      // 30 seconds for dynamic pages
      static: 180,      // 3 minutes for static pages
    },

    // React 19 compiler support (experimental in Next.js 16)
    // reactCompiler: true,

    // Partial Prerendering (highly experimental, uncomment if needed)
    // ppr: true,
  },

  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors in production
    ignoreBuildErrors: false,
  },

  // PostHog rewrites for analytics ingestion
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
