/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      // allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
      allowedOrigins: ['http://127.0.0.1:8000/api'],
    },
  },
  compiler: {
    // Enable shallow optimization
    React: {
      // Enable React memoization
      memoize: true,
    },
  },
};

export default nextConfig;
