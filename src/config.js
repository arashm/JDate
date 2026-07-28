/*
 * User-overridable display names.
 *
 * The three name lists `format()` reads — month names, full weekday names and
 * abbreviated weekday names — default to the Persian values in constants.js and
 * can be replaced at two levels:
 *
 *   JDate.setDefaultConfig({...})   app-wide, affects every instance
 *   new JDate(date, {...})          one instance, layered over the default
 *
 * A config is validated before it is accepted, so a typo'd key or a
 * wrong-length array throws at the call site instead of surfacing as
 * `undefined` inside formatted output.
 */

import { MONTH_NAMES, ABBR_DAYS, DAYS_NAMES } from './constants';
import { isPlainObject } from './types';

/*
 * Every recognized key, and how many entries its array must hold. Months are
 * indexed 0..11 in calendar order (فروردین first); both day lists are indexed by
 * Date#getDay(), so 0 is Sunday — not Saturday.
 */
const CONFIG_SHAPE = {
  monthNames: 12,
  abbrDays: 7,
  dayNames: 7
};

const KNOWN_KEYS = Object.keys(CONFIG_SHAPE);

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const freezeNames = (names) => Object.freeze(names.slice());

export const DEFAULT_CONFIG = Object.freeze({
  monthNames: freezeNames(MONTH_NAMES),
  abbrDays: freezeNames(ABBR_DAYS),
  dayNames: freezeNames(DAYS_NAMES)
});

function assertNames(key, value) {
  const expected = CONFIG_SHAPE[key];

  if (!Array.isArray(value)) {
    throw new Error(`JDate config: "${key}" must be an array of ${expected} strings`);
  }
  if (value.length !== expected) {
    throw new Error(`JDate config: "${key}" must have ${expected} entries, got ${value.length}`);
  }

  const badIndex = value.findIndex((name) => typeof name !== 'string');
  if (badIndex !== -1) {
    throw new Error(`JDate config: "${key}[${badIndex}]" must be a string`);
  }
}

/*
 * Throws on anything unusable. Every key is optional — what is checked is that
 * the keys present are ones JDate knows about and that their values are the
 * right shape.
 *
 * The plain-object requirement is what keeps a Date or an Array in the config
 * position a loud error rather than a silently empty override: neither has own
 * enumerable keys, so both would otherwise sail through the loop below.
 *
 * @params {Object} config
 */
export function validateConfig(config) {
  if (!isPlainObject(config)) {
    throw new Error('JDate config: expected a plain object');
  }

  Object.keys(config).forEach((key) => {
    if (!hasOwn(CONFIG_SHAPE, key)) {
      throw new Error(`JDate config: unknown key "${key}", expected one of ${KNOWN_KEYS.join(', ')}`);
    }
    assertNames(key, config[key]);
  });
}

/*
 * Layers `overrides` over `base` and returns a frozen config. Arrays are copied,
 * so mutating the array you passed in afterwards cannot reach back into an
 * existing JDate.
 *
 * @params {Object} base       an already-resolved config
 * @params {Object} overrides  optional partial config; undefined returns `base`
 * @return {Object}
 */
export function resolveConfig(base, overrides) {
  if (overrides === undefined) { return base; }

  validateConfig(overrides);

  const resolved = {};
  KNOWN_KEYS.forEach((key) => {
    resolved[key] = hasOwn(overrides, key) ? freezeNames(overrides[key]) : base[key];
  });

  return Object.freeze(resolved);
}

/*
 * The app-wide default. Instances capture it at construction time, so changing
 * it does not retroactively alter dates that already exist.
 */
let defaultConfig = DEFAULT_CONFIG;

export function getDefaultConfig() {
  return defaultConfig;
}

/*
 * Replaces the default outright rather than merging into whatever the previous
 * call left behind: the result depends only on `config`, so repeated calls do
 * not accumulate. Keys you omit fall back to the built-in Persian names.
 */
export function setDefaultConfig(config) {
  defaultConfig = resolveConfig(DEFAULT_CONFIG, config);
  return defaultConfig;
}

export function resetDefaultConfig() {
  defaultConfig = DEFAULT_CONFIG;
  return defaultConfig;
}
