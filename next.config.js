/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      // allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
      allowedOrigins: ['http://127.0.0.1:8000/api'],
      bodySizeLimit: '10mb', // Set the desired body size limit (e.g., 10 MB)
    },
  },
  compiler: {
    // Enable shallow optimization
    // React: {
    //   // Enable React memoization
    //   memoize: true,
    // },
    styledComponents: true, // ✅ Example of a valid key
  },
};

export default nextConfig;
