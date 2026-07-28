/*
 * Smoke tests over the built bundles in lib/, pairing each one against the
 * declaration file that describes it.
 *
 * Why this exists: the declarations state an export shape, the bundles have
 * one, and until now nothing checked that the two were the same statement.
 * tests/types/ compiles against the declarations, so it sees only what they
 * claim; `attw` checks that the entry points resolve to types at all; the unit
 * tests import src/ and never load lib/. A build footer could change — or a
 * declaration footer could — and every one of those stays green while
 * consumers get types that describe a package that no longer exists.
 *
 * So the runtime probe and the declaration are read side by side here, and it
 * is their agreement that is asserted, not either one alone.
 *
 * This is not a vitest suite. `npm test` covers src/ and has to work on a fresh
 * clone, where lib/ has not been built yet; vitest collects only files whose
 * names end in .test.js, so this one stays out of that run. It has its own
 * script, `npm run test:bundles`, alongside the other two that read lib/.
 */

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lib = (file) => path.join(root, 'lib', file);

const requireBundle = createRequire(import.meta.url);

/*
 * A date every bundle has to agree on, and the values the unit suite already
 * pins for it. Checking the output rather than only the shape is what keeps a
 * bundle that exports the right thing but computes the wrong answer from
 * passing — an empty class would satisfy every structural assertion here.
 */
const DATE = [1396, 8, 26];
const NUMERIC = '1396/08/26';
const WEEKDAY = 'جمعه';

function exercise(JDate, label) {
  assert.equal(typeof JDate, 'function', `${label}: expected the class, got ${typeof JDate}`);
  // keepNames is what holds this through minification; without it esbuild's
  // rename to _JDate, and the minifier's rename after that, would show here.
  assert.equal(JDate.name, 'JDate', `${label}: class name was renamed`);
  assert.equal(new JDate(DATE).format('YYYY/MM/DD'), NUMERIC, `${label}: numeric format`);
  assert.equal(new JDate(DATE).format('dddd'), WEEKDAY, `${label}: name format`);
  assert.equal(JDate.daysInMonth(1395, 11), 30, `${label}: statics missing`);
}

/*
 * The footer of an emitted declaration, as one of the two shapes the build can
 * append. Anchored to the start of a line on purpose: the shared body carries a
 * comment that names both shapes in prose, and an unanchored search would find
 * whichever it looked for in every file.
 */
async function declaredShape(file) {
  const source = await readFile(lib(file), 'utf8');
  const isCjs = /^export = JDate;$/m.test(source);
  const isEsm = /^export default JDate;$/m.test(source);

  assert.ok(isCjs || isEsm, `${file}: no export footer found`);
  assert.ok(!(isCjs && isEsm), `${file}: carries both export footers`);

  return isCjs ? 'export =' : 'export default';
}

const checks = [
  ['cjs bundle hands back the class, and .d.cts says so', async () => {
    const exported = requireBundle(lib('jdate.cjs'));

    exercise(exported, 'jdate.cjs');
    // The build footer unwraps module.exports.default away. If it stopped
    // doing that, this is the property that would come back.
    assert.equal(exported.default, undefined, 'jdate.cjs: still a namespace object');

    assert.equal(
      await declaredShape('jdate.d.cts'), 'export =',
      'jdate.d.cts: declares a shape the cjs bundle does not have'
    );
  }],

  ['mjs bundle exports only default, and .d.mts says so', async () => {
    const namespace = await import(pathToFileURL(lib('jdate.mjs')).href);

    exercise(namespace.default, 'jdate.mjs');
    // The .d.mts exports the type names but no named value, so a named runtime
    // export appearing here would be a binding nothing has declared.
    assert.deepEqual(Object.keys(namespace), ['default'], 'jdate.mjs: unexpected named exports');

    assert.equal(
      await declaredShape('jdate.d.mts'), 'export default',
      'jdate.d.mts: declares a shape the mjs bundle does not have'
    );
  }],

  ['index.d.ts describes the same shape as main', async () => {
    // "main" points at the CJS bundle and the top-level "types" field points at
    // index.d.ts, so the two have to agree for consumers on moduleResolution:
    // node, who read that pair and nothing else.
    assert.equal(
      await declaredShape('index.d.ts'), 'export =',
      'index.d.ts: declares a shape "main" does not have'
    );
  }],

  ['iife bundles set a global holding the class', async () => {
    for (const file of ['jdate.js', 'jdate.min.js']) {
      const source = await readFile(lib(file), 'utf8');
      // A fresh context with nothing on it: the bundle has to bring everything
      // it needs, and the global it defines is the only thing left behind.
      const context = vm.createContext({});
      vm.runInContext(source, context, { filename: file });

      exercise(context.JDate, file);
      assert.equal(context.JDate.default, undefined, `${file}: still a namespace object`);
    }
  }]
];

let failed = 0;

for (const [label, run] of checks) {
  try {
    await run();
    console.log(`ok    ${label}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL  ${label}`);
    console.log(`      ${error.message.split('\n')[0]}`);
  }
}

const total = checks.length;
console.log(failed
  ? `\n${failed} of ${total} bundle checks failed`
  : `\n${total} bundle checks passed`);

if (failed) { process.exitCode = 1; }
