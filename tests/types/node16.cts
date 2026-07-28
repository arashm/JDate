/*
 * The require() side. lib/jdate.cjs ends with
 *
 *   module.exports = module.exports.default
 *
 * so `require('jalali-date')` hands back the class itself, and the declaration
 * it resolves to — lib/jdate.d.cts — has to say `export = JDate` for that.
 * Were it a plain `export default` instead, the assignment below would be typed
 * as a module namespace object and every use of it here would fail.
 */

import JDate = require('jalali-date');

const jdate = new JDate([1396, 8, 26]);
const formatted: string = jdate.format('YYYY/MM/DD');
const year: number = jdate.getFullYear();
const gregorian: Date = JDate.toGregorian(1396, 8, 26);

/*
 * `export =` allows no other top-level export, so the types ride along on a
 * namespace merged into the class rather than as named exports.
 */
const config: JDate.JDateConfig = { persianNumerical: true };
const resolved: JDate.ResolvedJDateConfig = JDate.setDefaultConfig(config);
const jalali: JDate.JalaliDate = JDate.toJalali(new Date());

// @ts-expect-error the bundle unwraps .default away, so there is no such property
const unwrapped = JDate.default;
