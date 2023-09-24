/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    loader: "custom",
    loaderFile: "./loaders/my-image-loader.ts",
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
