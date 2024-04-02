// next.config.js

export function webpack(config) {
  // Add rule for handling .wasm files
  config.module.rules.push({
    test: /\.wasm$/,
    type: 'asset/resource',
    generator: {
      publicPath: './.next/',
      filename: '[name]-[hash][ext]',
    },
  });


  // Adjust externals and fallback configurations
  config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
  config.resolve.fallback = { fs: false };

  return config;
}
export const output = 'export';
