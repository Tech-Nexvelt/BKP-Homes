import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:5000/api',
    NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000',
    NEXT_PUBLIC_WHATSAPP: process.env['NEXT_PUBLIC_WHATSAPP'] ?? '+919000000000',
  },
};

export default nextConfig;
