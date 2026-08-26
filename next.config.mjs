import { withPayload } from "@payloadcms/next/withPayload";
import { ip } from "address";

const vercelBlobStoreId = process.env.BLOB_READ_WRITE_TOKEN?.match(
  /^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i,
)?.[1]?.toLowerCase();

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: {
    remotePatterns: vercelBlobStoreId
      ? [
          {
            hostname: `${vercelBlobStoreId}.public.blob.vercel-storage.com`,
            pathname: "/**",
            port: "",
            protocol: "https",
          },
        ]
      : [],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

nextConfig.webpack = (config) => {
  config.module.rules.push({
    test: /\.pdf$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[path][name].[ext]",
      },
    },
  });

  return config;
};

export default withPayload(nextConfig);

/* log local IP address to console to easily visit dev server on LAN */
if (process.env.NODE_ENV === "development") {
  console.info(`				LAN url: http://${ip()}:3000`);
}
