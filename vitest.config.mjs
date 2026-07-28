import { defineConfig } from 'vitest/config';

/*
 * Vitest replaced jest, which took Babel out with it: jest needed babel-jest and
 * .babelrc only to turn the ESM source into CommonJS it could load. Vitest runs
 * the modules as-is through esbuild — the same transform scripts/build.mjs uses
 * for the distributed bundles, so tests and dist exercise one toolchain.
 *
 * Globals stay off (vitest's default). The suites import describe/it/expect/vi
 * from 'vitest' explicitly, which keeps ESLint resolving them as real bindings
 * rather than needing an environment declaration.
 */
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    // The library is pure date arithmetic with no DOM access, so the default
    // node environment is enough; no jsdom dependency required.
    environment: 'node'
  }
});
