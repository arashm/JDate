/*
 * The main type fixture. Nothing here runs — `tsc --noEmit` compiling it
 * cleanly is the assertion, and every `@ts-expect-error` is the opposite one:
 * tsc reports an unused directive if the line below it stops being an error.
 *
 * Being a .mts file, this resolves "jalali-date" through the "import" condition
 * of the exports map, so what it checks is lib/jdate.d.mts.
 */

import JDate from 'jalali-date';
import type { JalaliDate, JDateConfig, ResolvedJDateConfig } from 'jalali-date';

/*
 * Assignability is too weak on its own here: `any` is assignable to everything,
 * so a declaration that had quietly degraded to `any` would pass. This compares
 * types exactly, by the identity of two conditional types over them.
 */
type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Assert<T extends true> = T;

/* The four constructor forms, each with and without a trailing config. */

const today = new JDate();
const fromTuple = new JDate([1396, 8, 26]);
const fromDate = new JDate(new Date());
const fromParts = new JDate(1396, 8, 26);

const configOnly = new JDate({ persianNumerical: true });
const tupleWithConfig = new JDate([1396, 8, 26], { monthNames: ['فروردین'] });
const dateWithConfig = new JDate(new Date(), { dayNames: [], abbrDays: [] });
const partsWithConfig = new JDate(1396, 8, 26, { persianNumerical: false });

/* A config the caller does not have is passed as null or undefined, not dropped. */
const nullConfig = new JDate(new Date(), null);
const undefinedConfig = new JDate(1396, 8, 26, undefined);

/* Config objects built ahead of time, the shape the README documents. */
const en = {
  monthNames: ['Farvardin', 'Ordibehesht'],
  dayNames: ['Yekshanbe'],
  abbrDays: ['1sh']
};
const fromVariable = new JDate([1396, 8, 26], en);
const asDeclared: JDateConfig = en;

/* Getters and format() come back as scalars, not as `any`. */

type FullYearIsNumber = Assert<Equals<ReturnType<JDate['getFullYear']>, number>>;
type MonthIsNumber = Assert<Equals<ReturnType<JDate['getMonth']>, number>>;
type DateIsNumber = Assert<Equals<ReturnType<JDate['getDate']>, number>>;
type DayIsNumber = Assert<Equals<ReturnType<JDate['getDay']>, number>>;
type FormatIsString = Assert<Equals<ReturnType<JDate['format']>, string>>;
type ToGregorianIsDate = Assert<Equals<ReturnType<JDate['toGregorian']>, Date>>;

/* Instance state. */

type DateFieldIsTuple = Assert<Equals<JDate['date'], JalaliDate>>;
type InputIsUnion = Assert<Equals<JDate['input'], JalaliDate | Date>>;
type GregorianFieldIsDate = Assert<Equals<JDate['_d'], Date>>;
type ConfigIsResolved = Assert<Equals<JDate['config'], ResolvedJDateConfig>>;

/* Statics. */

type ToJalaliIsTuple = Assert<Equals<ReturnType<typeof JDate.toJalali>, JalaliDate>>;
type ToGregorianStaticIsDate = Assert<Equals<ReturnType<typeof JDate.toGregorian>, Date>>;
type IsLeapYearIsBoolean = Assert<Equals<ReturnType<typeof JDate.isLeapYear>, boolean>>;
type DaysInMonthIsNumber = Assert<Equals<ReturnType<typeof JDate.daysInMonth>, number>>;
type SetDefaultIsResolved = Assert<Equals<ReturnType<typeof JDate.setDefaultConfig>, ResolvedJDateConfig>>;

const jalali: JalaliDate = JDate.toJalali(new Date());
const gregorian: Date = JDate.toGregorian(1396, 8, 26);
const leap: boolean = JDate.isLeapYear(1395);
const length: number = JDate.daysInMonth(1395, 11);
const resolved: ResolvedJDateConfig = JDate.setDefaultConfig({ persianNumerical: true });
const current: ResolvedJDateConfig = JDate.getDefaultConfig();
const restored: ResolvedJDateConfig = JDate.resetDefaultConfig();

/* The deprecated aliases still type-check, so upgrading is not a breaking change. */
const oldJalali: JalaliDate = JDate.to_jalali(new Date());
const oldGregorian: Date = JDate.to_gregorian(1396, 8, 26);

/* Setters return the instance, so they chain. */
const chained: JDate = fromTuple.setFullYear(1397).setMonth(9).setDate(1);

/* A resolved config is frozen at runtime, and readonly here to match. */
// @ts-expect-error `config` is frozen
today.config.persianNumerical = true;
// @ts-expect-error the name lists inside it are frozen too
today.config.monthNames[0] = 'x';

/* Date forms the runtime does not reject, but does not honour either. */
// @ts-expect-error a two-element array leaves the day undefined, for an Invalid Date
const short = new JDate([1396, 8]);
// @ts-expect-error a fourth entry is silently ignored, so it is a mistake going unheard
const long = new JDate([1396, 8, 26, 0]);
// @ts-expect-error two of the three parts
const missingDay = new JDate(1396, 8);

/*
 * A trailing null stands in for an absent config only where a whole date is
 * left beside it — as a lone argument it matches no branch and throws.
 */
// @ts-expect-error `new JDate(null)` throws "Unexpected input"
const nullOnly = new JDate(null);

/* Config arguments the runtime validation rejects. */
// @ts-expect-error a bare list of names is not a config
const bareArray = new JDate([1396, 8, 26], ['شنبه']);
// @ts-expect-error a Date in the config position is not a config
const dateAsConfig = new JDate([1396, 8, 26], new Date());
// @ts-expect-error unknown key
const typo = new JDate({ monthName: [] });
// @ts-expect-error persianNumerical is strictly boolean, truthiness is not enough
const truthy = new JDate({ persianNumerical: 'yes' });
// @ts-expect-error the name lists hold strings
const numbers = JDate.setDefaultConfig({ monthNames: [1, 2] });

/* Argument types. */
// @ts-expect-error format takes a format string
const notAString = today.format(1396);
// @ts-expect-error the setters take numbers
const notANumber = today.setFullYear('1396');

/* The ESM bundle exports the class as `default` and nothing else. */
// @ts-expect-error there is no named JDate binding to import at runtime
import { JDate as Named } from 'jalali-date';
