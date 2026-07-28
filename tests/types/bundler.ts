/*
 * The same package seen through moduleResolution: bundler — what Vite, webpack
 * and esbuild set up. It reads the "exports" map but always takes the "import"
 * condition, regardless of the importing file's format, so this checks that
 * lib/jdate.d.mts is what a bundled consumer gets.
 *
 * A thinner fixture than node16.mts on purpose: the declarations are the same
 * file, so what is worth repeating here is the resolution, not the API.
 */

import JDate from 'jalali-date';
import type { JalaliDate, JDateConfig, ResolvedJDateConfig } from 'jalali-date';

const config: JDateConfig = { persianNumerical: true };
const jdate = new JDate([1396, 8, 26], config);

const formatted: string = jdate.format('dddd DD MMMM YYYY');
const parts: JalaliDate = jdate.date;
const resolved: ResolvedJDateConfig = jdate.config;

// @ts-expect-error the config is validated at runtime; unknown keys throw
const typo = new JDate({ persianNumeric: true });
