import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Dev server only: allow opening the site from other devices on the office network (not just localhost)
  allowedDevOrigins: ['10.14.2.11', '*.local'],
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
