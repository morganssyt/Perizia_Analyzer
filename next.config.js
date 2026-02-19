const path = require('path');
const fs = require('fs');

// Copy react-pdf's bundled pdfjs worker to /public so it can be served statically.
// react-pdf ships its own pdfjs-dist which may differ from the top-level install.
const workerSrc = path.join(
  __dirname,
  'node_modules',
  'react-pdf',
  'node_modules',
  'pdfjs-dist',
  'build',
  'pdf.worker.min.mjs',
);
const workerDst = path.join(__dirname, 'public', 'pdf.worker.min.mjs');

if (fs.existsSync(workerSrc)) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
  try { fs.copyFileSync(workerSrc, workerDst); } catch (_) {}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'pdfjs-dist', '@napi-rs/canvas'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias.canvas = false;
      config.resolve.alias.encoding = false;
    }

    // pdfjs-dist v5 ships .mjs files that mix ESM exports with Object.defineProperty(exports,...).
    // Webpack treats .mjs as strict ESM by default, which breaks that pattern.
    // Setting type 'javascript/auto' tells webpack to handle them as CommonJS-compatible modules.
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    });

    return config;
  },
};

module.exports = nextConfig;
