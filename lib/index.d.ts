/*
 * The public type surface, hand written and kept in step with src/ by hand.
 *
 * This file is a fragment, not a module: it deliberately ends without an export
 * statement. scripts/build.mjs appends a per-format footer and writes the result
 * into lib/ three times, because the shape a consumer sees depends on how they
 * load the package:
 *
 *   lib/jdate.d.mts   export default JDate   matches lib/jdate.mjs
 *   lib/jdate.d.cts   export = JDate         matches lib/jdate.cjs, whose build
 *                                            footer unwraps .default away
 *   lib/index.d.ts    export = JDate         the "types" field, for consumers
 *                                            still on moduleResolution: node
 *
 * One shared `export default` would be wrong for two of those three: it would
 * type `require('jalali-date')` as `{ default: JDate }` when the CJS bundle
 * hands back the class itself. Nothing about that failure is loud — and it is
 * past what `npm run test:exports` looks at, which is how the entry points
 * resolve rather than what they export — so tests/types/node16.cts pins the
 * shape by requiring the package the way a CommonJS consumer does.
 *
 * Types are generated from this file rather than from the JSDoc in src/ because
 * the constructor is variadic there — `constructor(...args)` would emit
 * `...args: any[]` and lose the four call forms below, which are the most
 * useful thing here to type.
 */

/**
 * A Jalali date as `[year, month, day]`.
 *
 * The month is one based — `1` is فروردین and `12` is اسفند — matching
 * `getMonth()` and `setMonth()`, though not the zero based
 * {@link JDate.daysInMonth}.
 *
 * The length is part of the type on purpose. `new JDate([1396, 8])` throws
 * nothing at runtime; it quietly builds an Invalid Date, so the tuple is the
 * only place that mistake can be caught.
 */
type JalaliDate = [year: number, month: number, day: number];

/**
 * What `format()` prints, layered over the app-wide default by
 * {@link JDate.setDefaultConfig} or by the last argument to the constructor.
 * Every key is optional; the ones you leave out keep their built-in values.
 *
 * Entry counts are checked at runtime rather than in the type, so that a list
 * built elsewhere — inferred as `string[]` rather than as a fixed-length tuple —
 * can still be passed. A wrong length throws at the call site.
 */
interface JDateConfig {
  /** 12 entries in calendar order, فروردین first. */
  monthNames?: readonly string[];
  /** 7 entries indexed by `Date#getDay()`, so Sunday first — not Saturday. */
  dayNames?: readonly string[];
  /** 7 entries indexed by `Date#getDay()`, so Sunday first — not Saturday. */
  abbrDays?: readonly string[];
  /**
   * Prints the numeric identifiers (`YYYY`, `MM`, `DD`, …) in Persian digits.
   * Defaults to `false`; the name identifiers are unaffected either way.
   */
  persianNumerical?: boolean;
}

/**
 * A config with every key filled in. This is what the static config methods
 * return and what an instance holds as `config` — frozen at construction time,
 * hence readonly throughout.
 */
interface ResolvedJDateConfig {
  readonly monthNames: readonly string[];
  readonly dayNames: readonly string[];
  readonly abbrDays: readonly string[];
  readonly persianNumerical: boolean;
}

declare class JDate {
  /**
   * Today's date, optionally with display overrides.
   *
   * @example new JDate({ persianNumerical: true })
   */
  // Not `JDateConfig | null`, unlike the forms below. A trailing null is
  // dropped only when a whole date is left standing beside it, so `new
  // JDate(null)` reaches none of the constructor's branches and throws
  // "Unexpected input" — pass `{}` or nothing. Passing `undefined` explicitly
  // throws for the same reason and cannot be typed out of reach: TypeScript
  // lets `undefined` through any optional parameter.
  constructor(config?: JDateConfig);

  /**
   * A Jalali date as `[year, month, day]` with a one-based month, or a
   * Gregorian `Date` to convert.
   *
   * @example new JDate([1396, 8, 26])
   * @example new JDate(new Date(), { monthNames })
   */
  constructor(date: JalaliDate | Date, config?: JDateConfig | null);

  /**
   * A Jalali date as three numbers, with a one-based month.
   *
   * @example new JDate(1396, 8, 26)
   */
  constructor(year: number, month: number, day: number, config?: JDateConfig | null);

  /** The Jalali date as `[year, month, day]`. The setters write through to it. */
  date: JalaliDate;

  /**
   * What the constructor was given, with any config argument stripped. The
   * setters do not touch it, so it still reflects the original input after a
   * `setMonth()`.
   */
  input: JalaliDate | Date;

  /** The Gregorian equivalent, kept in sync by the setters. */
  _d: Date;

  /** The frozen display options this instance formats with. */
  readonly config: ResolvedJDateConfig;

  /** The Gregorian equivalent of this instance's date. */
  toGregorian(): Date;

  /** The Jalali year, ex: `1396`. */
  getFullYear(): number;

  /** Returns this instance, so setters chain. */
  setFullYear(year: number): this;

  /** The Jalali month, `1` to `12`. Unlike `Date#getMonth`, this is one based. */
  getMonth(): number;

  /**
   * Sets the Jalali month. Unlike `Date#setMonth`, this is one based; values
   * outside `1..12` roll the year over, so `setMonth(13)` is month `1` of the
   * following year.
   *
   * @returns this instance, so setters chain.
   */
  setMonth(month: number): this;

  /** The Jalali day of the month, `1` to `31`. */
  getDate(): number;

  /** Returns this instance, so setters chain. */
  setDate(date: number): this;

  /** The day of the week, `0` (Sunday) to `6` (Saturday), as `Date#getDay`. */
  getDay(): number;

  /**
   * Formats the date. Identifiers: `YYYY`/`YYY`, `YY`, `MMMM`/`MMM`, `MM`, `M`,
   * `DD`, `D`, `dddd`/`ddd`, `dd`/`d`. Anything else passes through, so wrap
   * literal text containing an identifier character in square brackets —
   * `format('[Day] D')`.
   *
   * The name identifiers resolve against this instance's config, which also
   * decides whether the numeric ones print in ASCII or Persian digits.
   *
   * @example jdate.format('dddd DD MMMM YYYY') // => جمعه 26 آبان 1396
   */
  format(format: string): string;

  /**
   * Overrides what every later instance formats with. Replaces the default
   * rather than merging into a previous call, so the result depends only on
   * what you pass. Throws on an unknown key or a wrong-shaped value.
   *
   * Existing instances keep the config they captured at construction time.
   */
  static setDefaultConfig(config: JDateConfig): ResolvedJDateConfig;

  /** The frozen config new instances will pick up. */
  static getDefaultConfig(): ResolvedJDateConfig;

  /** Restores the built-in Persian names and ASCII numerals. */
  static resetDefaultConfig(): ResolvedJDateConfig;

  /** Converts a Gregorian `Date` to a Jalali `[year, month, day]`. */
  static toJalali(date: Date): JalaliDate;

  /**
   * @deprecated Renamed to {@link JDate.toJalali}; this alias is kept only for
   * backwards compatibility.
   */
  static to_jalali(date: Date): JalaliDate;

  /** Converts a Jalali date, with a one-based month, to a Gregorian `Date`. */
  static toGregorian(year: number, month: number, day: number): Date;

  /**
   * @deprecated Renamed to {@link JDate.toGregorian}; this alias is kept only
   * for backwards compatibility.
   */
  static to_gregorian(year: number, month: number, day: number): Date;

  /** Whether a Jalali year is a leap year. */
  static isLeapYear(year: number): boolean;

  /**
   * The length of a Jalali month.
   *
   * Note: `month` is **zero based** here (`0` is فروردین, `11` is اسفند),
   * unlike `getMonth`/`setMonth`, so it does not compose directly with
   * `getMonth()` — `daysInMonth(d.getFullYear(), d.getMonth() - 1)`.
   * Out-of-range values carry into the year.
   */
  static daysInMonth(year: number, month: number): number;
}

declare namespace JDate {
  export { JalaliDate, JDateConfig, ResolvedJDateConfig };
}

export = JDate;
