// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     unoptimized: true,
//   },
// };

// nextConfig.webpack = (config, context) => {
//   config.module.rules.push({
//     test: /\.svg$/,
//     use: ["@svgr/webpack", "url-loader"],
//   });

//   config.module.rules.push({
//     test: /\.pdf$/,
//     use: {
//       loader: "file-loader",
//       options: {
//         name: "[path][name].[ext]",
//       },
//     },
//   });

//   return config;
// };
// module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;

/* log local IP address to console to easily visit dev server on LAN */
if (process.env.NODE_ENV === "development") {
  console.info(`\t\t\t\tLAN url: http://${require("address").ip()}:3000`);
}
