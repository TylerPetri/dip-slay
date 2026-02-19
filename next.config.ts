import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Add any other hosts you use (e.g., your Supabase Storage)
      {
        protocol: 'https',
        hostname: '*.supabase.co', // or your exact Supabase domain
        port: '',
        pathname: '/**',
      }
    ]
  },
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
