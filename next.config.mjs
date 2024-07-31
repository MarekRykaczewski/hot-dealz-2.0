/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "st.depositphotos.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "uploadthing-prod-sea1.s3.us-west-2.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
