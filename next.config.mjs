/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
      config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/chunks/[name].[hash][ext]',
        },
      });
      config.resolve.fallback = { fs: false };
      return config;
    },
  
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
  };

export default nextConfig;
