/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // For smooth matter.js canvas lifecycle
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
