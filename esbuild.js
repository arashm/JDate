const esbuild = require('esbuild');
const path = require('path');

// Common configuration
const commonConfig = {
  entryPoints: [path.join(__dirname, '/src/jdate.js')],
  bundle: true,
  sourcemap: 'inline',
  outfile: path.join(__dirname, '/lib/jdate.js'),
  target: ['es2015'],
  format: 'esm',
  globalName: 'JDate'
};

// Development configuration
const devConfig = {
  ...commonConfig,
  minify: false
};

// Production configuration
const prodConfig = {
  ...commonConfig,
  minify: true,
  outfile: path.join(__dirname, '/lib/jdate.min.js')
};

// Determine the mode
const mode = process.env.NODE_ENV || 'development';
const config = mode === 'development' ? devConfig : prodConfig;

// Build
esbuild.build(config).catch(() => process.exit(1));
