/*
 * Builds the distributable bundles with esbuild.
 *
 * esbuild has no UMD output format, so the browser bundles are plain IIFEs and
 * AMD/RequireJS is no longer supported. The three remaining consumer styles are
 * each served by a purpose-built file, routed by the "exports" map in
 * package.json:
 *
 *   lib/jdate.mjs      ESM   import JDate from 'jalali-date'
 *   lib/jdate.cjs      CJS   const JDate = require('jalali-date')
 *   lib/jdate.js       IIFE  <script>, sets window.JDate
 *   lib/jdate.min.js   IIFE  minified, sets window.JDate
 *
 * JDate is a default export, so the CJS and IIFE bundles would otherwise expose
 * a module namespace object ({ default: JDate }) rather than the class. Each one
 * gets a footer that unwraps it, preserving the interop the webpack build had.
 */

import { rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'lib');

// The source uses classes, which esbuild cannot lower to ES5. ES2019 covers
// every currently supported browser and Node line.
const TARGET = 'es2019';

const GLOBAL_NAME = 'JDate';

const shared = {
  entryPoints: [path.join(root, 'src/jdate.js')],
  bundle: true,
  target: TARGET,
  // JDate refers to itself in its own static methods, which makes esbuild rename
  // the class binding (to _JDate) and minification shorten it. keepNames pins
  // the .name property back to "JDate", matching the old webpack output and
  // keeping stack traces readable.
  keepNames: true,
  sourcemap: true,
  sourcesContent: true,
  charset: 'utf8',
  legalComments: 'none'
};

const bundles = [
  {
    label: 'esm',
    format: 'esm',
    outfile: path.join(outDir, 'jdate.mjs')
  },
  {
    label: 'cjs',
    format: 'cjs',
    outfile: path.join(outDir, 'jdate.cjs'),
    footer: { js: 'module.exports = module.exports.default;' }
  },
  {
    label: 'iife',
    format: 'iife',
    globalName: GLOBAL_NAME,
    outfile: path.join(outDir, 'jdate.js'),
    footer: { js: `${GLOBAL_NAME} = ${GLOBAL_NAME}.default;` }
  },
  {
    label: 'iife.min',
    format: 'iife',
    globalName: GLOBAL_NAME,
    outfile: path.join(outDir, 'jdate.min.js'),
    minify: true,
    footer: { js: `${GLOBAL_NAME}=${GLOBAL_NAME}.default;` }
  }
];

const options = ({ label, ...rest }) => ({ ...shared, ...rest });

async function buildOnce() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  await Promise.all(bundles.map((bundle) => esbuild.build(options(bundle))));

  console.log(`built ${bundles.map((b) => b.label).join(', ')} -> lib/`);
}

async function watch() {
  await mkdir(outDir, { recursive: true });

  const contexts = await Promise.all(
    bundles.map((bundle) => esbuild.context(options(bundle)))
  );

  await Promise.all(contexts.map((ctx) => ctx.watch()));

  console.log('watching src/ for changes, ctrl-c to stop');
}

if (process.argv.includes('--watch')) {
  await watch();
} else {
  await buildOnce();
}
