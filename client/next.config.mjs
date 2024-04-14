/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "res-console.cloudinary.com",
      "thelogicalindian.com",
      "avatars.githubusercontent.com",
    ],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u",
      },
    ],
  },
};

export default nextConfig;
