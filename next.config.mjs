/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    URL: "http://3.125.43.204:7777/v1",
  },
  images: {
    domains: ["3.125.43.204", "dummyimage.com"],
  },
};

export default nextConfig;
