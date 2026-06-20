/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        pathname: "/**",
      },
    ],
    // Mitigate unbounded disk cache growth (CVE fixed in Next.js 16.1.7)
    maximumDiskCacheSize: 50 * 1024 * 1024, // 50 MB
  },
};

export default nextConfig;
