import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,

  // You can add other Next.js config options here
  // Example:
  // images: {
  //   domains: ['example.com'],
  // },
  // experimental: {
  //   serverActions: true,
  // },
};

export default withNextIntl(nextConfig);