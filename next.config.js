/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

nextConfig.webpack = (config, context) => {
  config.module.rules.push({
    test: \/\.svg$/, 
    use: '@svgr/webpack',
  });

  config.module.rules.push({
    test: \/\.pdf$/, 
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    },
  });

  return config;
};

module.exports = nextConfig;

/* log local IP address to console to easily visit dev server on LAN */
if (process.env.NODE_ENV === 'development') {
  console.info(`				LAN url: http://${require('address').ip()}:3000`);
}