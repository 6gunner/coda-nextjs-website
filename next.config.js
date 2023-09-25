/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV == "production";
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

if (isProduction) {
  nextConfig.output = "export";
  nextConfig.images.loader = "custom";
  nextConfig.images.loaderFile = "./loaders/my-image-loader.ts";
}

module.exports = nextConfig;
