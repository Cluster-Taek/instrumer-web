/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'startwith-solu.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/token',
        destination: `/api/token`,
      },
      {
        source: '/api/:path((?!auth|health|sample).*)',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
