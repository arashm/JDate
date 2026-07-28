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
 *
 * The TypeScript declarations are emitted the same way, from the hand-written
 * body in types/jdate.d.ts plus a footer per export shape — see DECLARATIONS.
 */

import { rm, mkdir, readFile, writeFile, watch as watchPath } from 'node:fs/promises';
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

const declarationDir = path.join(root, 'types');
const declarationSource = path.join(declarationDir, 'jdate.d.ts');

// The types declared alongside the class in types/jdate.d.ts. Both footers have
// to name them, so they are written once here.
const EXPORTED_TYPES = 'JalaliDate, JDateConfig, ResolvedJDateConfig';

/*
 * lib/jdate.mjs exports the class as `default` and nothing besides, so the named
 * exports here are types only: they are erased at compile time and so cannot be
 * mistaken for runtime bindings that do not exist.
 */
const ESM_FOOTER = `export default JDate;
export type { ${EXPORTED_TYPES} };
`;

/*
 * lib/jdate.cjs assigns the class straight onto module.exports, so `export =` is
 * the shape that matches. It rules out every other top-level export, which is
 * why the types travel through a namespace merged into the class instead:
 * `import JDate = require('jalali-date')` reaches them as JDate.JDateConfig.
 */
const CJS_FOOTER = `declare namespace JDate {
  export { ${EXPORTED_TYPES} };
}

export = JDate;
`;

/*
 * index.d.ts holds the CJS declarations under a third name, for the top-level
 * "types" field to point at. It looks redundant beside jdate.d.cts and is not:
 * "types" is what consumers on moduleResolution: node read, and TypeScript did
 * not learn the .d.cts extension until 4.7, so aiming the field straight at
 * jdate.d.cts leaves every older version with no types at all — 4.6 reports
 * "Could not find a declaration file for module 'jalali-date'". It describes
 * the CJS bundle because "main" does too.
 */
const DECLARATIONS = [
  { outfile: 'jdate.d.mts', footer: ESM_FOOTER },
  { outfile: 'jdate.d.cts', footer: CJS_FOOTER },
  { outfile: 'index.d.ts', footer: CJS_FOOTER }
];

async function buildDeclarations() {
  const body = await readFile(declarationSource, 'utf8');

  await Promise.all(DECLARATIONS.map(({ outfile, footer }) => (
    writeFile(path.join(outDir, outfile), `${body}\n${footer}`)
  )));
}

async function buildOnce() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  await Promise.all([
    ...bundles.map((bundle) => esbuild.build(options(bundle))),
    buildDeclarations()
  ]);

  const built = [...bundles.map((b) => b.label), 'types'];
  console.log(`built ${built.join(', ')} -> lib/`);
}

/*
 * esbuild's watcher only knows about the module graph rooted at src/, which the
 * declarations are not part of, so they get their own. Left unawaited: it runs
 * until the process is killed, alongside the esbuild contexts.
 *
 * The directory is watched rather than the file, because an editor that saves by
 * writing a temporary file and renaming it over the original leaves a watch on
 * the path itself pointing at an inode nothing will touch again.
 */
async function watchDeclarations() {
  for await (const change of watchPath(declarationDir)) {
    await buildDeclarations();
    console.log(`rebuilt types -> lib/ (${change.filename})`);
  }
}

async function watch() {
  await mkdir(outDir, { recursive: true });

  const contexts = await Promise.all(
    bundles.map((bundle) => esbuild.context(options(bundle)))
  );

  await Promise.all(contexts.map((ctx) => ctx.watch()));
  await buildDeclarations();

  watchDeclarations().catch((error) => {
    console.error(`declaration watch stopped: ${error.message}`);
  });

  console.log('watching src/ and types/ for changes, ctrl-c to stop');
}

if (process.argv.includes('--watch')) {
  await watch();
} else {
  await buildOnce();
}
