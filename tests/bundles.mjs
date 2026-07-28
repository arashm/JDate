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
 * Which files to pair is read out of package.json rather than written down
 * here. Spelling the pairs out in this file would only check that the build
 * still agrees with this file: aiming "types" at the ESM declaration while
 * "main" stays CJS is a real mismatch that a hardcoded list sails past, and
 * `attw` does not catch it either — its node10 check confirms that types
 * resolve, not that their shape matches the implementation.
 *
 * This is not a vitest suite. `npm test` covers src/ and has to work on a fresh
 * clone, where lib/ has not been built yet. What gets collected is set by the
 * include pattern in vitest.config.mjs, which reaches only names ending in
 * .test.js, and this file is deliberately not one of them. It has its own
 * script, `npm run test:bundles`, alongside the other two that read lib/.
 */

import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fromRoot = (relative) => path.resolve(root, relative);

const requireBundle = createRequire(import.meta.url);

const exists = (file) => access(file).then(() => true, () => false);

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
async function declaredShape(relative) {
  const source = await readFile(fromRoot(relative), 'utf8');
  const isCjs = /^export = JDate;$/m.test(source);
  const isEsm = /^export default JDate;$/m.test(source);

  assert.ok(isCjs || isEsm, `${relative}: no export footer found`);
  assert.ok(!(isCjs && isEsm), `${relative}: carries both export footers`);

  return isCjs ? 'export =' : 'export default';
}

/*
 * The same question asked of the bundle: which footer would describe what
 * loading it actually hands back. Reported rather than asserted, because either
 * answer is a shape a declaration can legitimately state — what must not happen
 * is the two disagreeing.
 */
async function runtimeShape(relative, condition) {
  const file = fromRoot(relative);

  if (condition === 'import') {
    const namespace = await import(pathToFileURL(file).href);

    // The .d.mts exports the type names but no named value, so a named runtime
    // export appearing here would be a binding nothing has declared.
    assert.deepEqual(Object.keys(namespace), ['default'], `${relative}: unexpected named exports`);
    exercise(namespace.default, relative);

    return 'export default';
  }

  const exported = requireBundle(file);

  if (typeof exported === 'object' && exported !== null) {
    exercise(exported.default, `${relative} (.default)`);
    return 'export default';
  }

  exercise(exported, relative);

  return 'export =';
}

/*
 * Every (implementation, declaration) pair the package points a consumer at.
 * Missing conditions throw rather than being skipped: a pair that quietly
 * disappears from the map would take its check with it.
 */
function entryPairs(pkg) {
  const dot = pkg.exports && pkg.exports['.'];
  assert.ok(dot, 'package.json: "exports" has no "." entry');

  // Consumers on moduleResolution: node read this pair and nothing else, and
  // "main" is a CommonJS entry by definition.
  const pairs = [
    { label: '"main" + "types"', condition: 'require', impl: pkg.main, decl: pkg.types }
  ];

  for (const condition of ['require', 'import']) {
    const branch = dot[condition];
    assert.ok(branch, `package.json: "exports" has no "${condition}" condition`);

    pairs.push({
      label: `exports["."].${condition}`,
      condition,
      impl: branch.default,
      decl: branch.types
    });
  }

  return pairs;
}

const checks = [
  ['every declared entry point matches the bundle it describes', async () => {
    const pkg = JSON.parse(await readFile(fromRoot('package.json'), 'utf8'));

    for (const { label, condition, impl, decl } of entryPairs(pkg)) {
      assert.equal(typeof impl, 'string', `${label}: no implementation path`);
      assert.equal(typeof decl, 'string', `${label}: no types path`);

      const actual = await runtimeShape(impl, condition);
      const declared = await declaredShape(decl);

      assert.equal(
        declared, actual,
        `${label}: ${decl} says \`${declared}\`, but ${impl} is \`${actual}\``
      );
    }
  }],

  ['cjs bundle hands back the class rather than a namespace', async () => {
    // Agreement alone would accept a package whose CJS side exported
    // { default: JDate } and said so. It exports the class instead, which is a
    // deliberate interop guarantee -- `const JDate = require('jalali-date')` is
    // what the README documents -- so it is pinned separately from the pairing.
    const exported = requireBundle(fromRoot('lib/jdate.cjs'));

    exercise(exported, 'lib/jdate.cjs');
    assert.equal(exported.default, undefined, 'lib/jdate.cjs: still a namespace object');
  }],

  ['iife bundles set a global holding the class', async () => {
    for (const file of ['lib/jdate.js', 'lib/jdate.min.js']) {
      const source = await readFile(fromRoot(file), 'utf8');
      // A fresh context with nothing on it: the bundle has to bring everything
      // it needs, and the global it defines is the only thing left behind.
      const context = vm.createContext({});
      vm.runInContext(source, context, { filename: file });

      exercise(context.JDate, file);
      assert.equal(context.JDate.default, undefined, `${file}: still a namespace object`);
    }
  }]
];

const indent = (text) => String(text).split('\n').map((line) => `      ${line}`).join('\n');

async function main() {
  // Every check reads lib/, so without a build they all fail at once on a
  // missing file. One line saying which build to run beats four saying ENOENT.
  if (!await exists(fromRoot('lib'))) {
    console.error('lib/ is missing -- run `npm run build` before this script.');
    return 1;
  }

  let failed = 0;

  for (const [label, run] of checks) {
    try {
      await run();
      console.log(`ok    ${label}`);
    } catch (error) {
      failed += 1;
      console.log(`FAIL  ${label}`);
      // An assertion carries its own message and nothing else worth reading.
      // Anything else -- a bundle that throws on load, a file that moved -- is
      // unexpected, and there the stack is the whole story.
      console.log(error.code === 'ERR_ASSERTION'
        ? indent(error.message.split('\n')[0])
        : indent(error.stack ?? error));
    }
  }

  const total = checks.length;
  console.log(failed
    ? `\n${failed} of ${total} bundle checks failed`
    : `\n${total} bundle checks passed`);

  return failed ? 1 : 0;
}

process.exitCode = await main();
