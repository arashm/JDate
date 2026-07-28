/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 */

import Converter from './converter';
import * as helpers from './helpers';
import {
  getDefaultConfig, resolveConfig, setDefaultConfig, resetDefaultConfig
} from './config';
import { isDate, isPlainObject } from './types';

export default class JDate {
  /*
   * Accepts a Jalali date as an array or as three numbers, a Date object, or
   * nothing at all (which defaults to today). Every form takes an optional
   * config object as its last argument, layered over the app-wide default:
   *
   *   new JDate({ monthNames })                     today
   *   new JDate([1396, 8, 26], { monthNames })
   *   new JDate(1396, 8, 26, { monthNames })
   *   new JDate(new Date(), { monthNames })
   *
   * Instance state:
   *   this.date   {Array}  the Jalali date as [year, month, day]
   *   this._d     {Date}   the Gregorian equivalent, kept in sync by the setters
   *   this.input  {Array|Date}  the date passed to the constructor, with any
   *                             config argument stripped; setters do not touch it
   *   this.config {Object} the frozen resolved display options used by format()
   */
  constructor(...args) {
    const dateArgs = [...args];
    const last = dateArgs[dateArgs.length - 1];

    // A trailing config is told apart from a date by being a plain object; the
    // two other things accepted in that position are an Array and a Date. The
    // resolved config is captured now, so a later setDefaultConfig() call does
    // not retroactively change instances that already exist.
    const overrides = isPlainObject(last) ? dateArgs.pop() : undefined;

    // A trailing null/undefined in that position means "no config", so that
    // `new JDate(date, maybeConfig)` keeps working when the caller has nothing
    // to pass — the ordinary shape of an optional argument. It is dropped only
    // when what remains is still a whole date form (one array or Date, or three
    // numbers), so `new JDate(1396, 8, undefined)` keeps its old meaning rather
    // than becoming a two-argument error.
    if ((last === undefined || last === null)
      && (dateArgs.length === 2 || dateArgs.length === 4)) {
      dateArgs.pop();
    }

    this.config = resolveConfig(getDefaultConfig(), overrides);

    if (Array.isArray(dateArgs[0]) || isDate(dateArgs[0])) {
      // Anything left beside the date is neither a config (it would have been
      // popped above) nor part of a supported form, so it is a mistake worth
      // reporting rather than dropping — most likely a config that is not a
      // plain object, such as a bare array of names.
      if (dateArgs.length > 1) {
        throw new Error('Unexpected input');
      }
      [this.input] = dateArgs;
    } else if (dateArgs.length === 3) {
      this.input = dateArgs;
    } else if (!dateArgs.length) {
      this.input = new Date();
    } else {
      throw new Error('Unexpected input');
    }

    if (Array.isArray(this.input)) {
      this.date = this.input.map((num) => parseInt(num, 10));
      this._d = this.toGregorian();
    } else if (isDate(this.input)) {
      this._d = this.input;
      this.date = JDate.toJalali(this.input);
    }
  }

  /*
   * Overrides what every later instance formats with. Any of `monthNames` (12
   * entries, فروردین first), `dayNames` and `abbrDays` (7 entries each, Sunday
   * first to match Date#getDay), and `persianNumerical` (a boolean, false by
   * default, printing the numeric identifiers in Persian digits) may be given;
   * the ones you omit fall back to their built-in values.
   *
   * This replaces the default rather than merging into a previous call, so the
   * result depends only on what you pass. Throws on an unknown key or a
   * wrong-shaped value.
   *
   * @params {Object} config
   * @return {Object} the resolved config
   */
  static setDefaultConfig(config) {
    return setDefaultConfig(config);
  }

  /*
   * The frozen config new instances will pick up.
   *
   * @return {Object}
   */
  static getDefaultConfig() {
    return getDefaultConfig();
  }

  /*
   * Restores the built-in Persian names and ASCII numerals.
   *
   * @return {Object} the resolved config
   */
  static resetDefaultConfig() {
    return resetDefaultConfig();
  }

  /*
   * Coverts a Gregorian date to Jalali date
   *
   * @params {Date} date
   * @return {Array}
   */
  static toJalali(date) {
    const fixedDate = Converter.gregorianToFixed(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    const jdate = Converter.fixedToJalali(fixedDate);

    return jdate;
  }

  // Deprecated snake_case alias, kept for backwards compatibility.
  static to_jalali(date) { return JDate.toJalali(date); }

  /*
   * converts a Jalali date to Gregorian
   *
   * @params {Number} year
   * @params {Number} month
   * @params {Number} day
   * @return {Date}
   */
  static toGregorian(year, month, day) {
    const gdate = Converter.fixedToGregorian(
      Converter.jalaliToFixed(year, month, day)
    );

    return new Date(+gdate[0], +gdate[1] - 1, +gdate[2]);
  }

  // Deprecated snake_case alias, kept for backwards compatibility.
  static to_gregorian(year, month, day) { return JDate.toGregorian(year, month, day); }

  /*
   * Checks if a given year is a leap year or not
   *
   * @params {Number} year
   * @return {Boolean}
   */
  static isLeapYear(year) {
    return Converter.leapPersian(year);
  }

  /*
   * Returns month length.
   *
   * Note: `month` is ZERO based here (0 is فروردین, 11 is اسفند), unlike
   * getMonth/setMonth which are one based. Out-of-range values carry into the
   * year, so daysInMonth(1395, 12) is فروردین of 1396.
   *
   * @params {Number} year
   * @params {Number} month zero based
   * @return {Number}
   */
  static daysInMonth(year, month) {
    const calcedYear = year + Math.floor(month / 12);
    const calcedMonth = ((month % 12) + 12) % 12;

    if (calcedMonth < 6) {
      return 31;
    }
    if (calcedMonth < 11) {
      return 30;
    }
    if (JDate.isLeapYear(calcedYear)) {
      return 30;
    }
    return 29;
  }

  /*
   * Converts JDate date to Gregorian
   */
  toGregorian() {
    return JDate.toGregorian(this.date[0], this.date[1], this.date[2]);
  }

  /*
   * Shows Jalali's full year, ex: 1393
   *
   * @return {Integer}
   */
  getFullYear() {
    return this.date[0];
  }

  /*
   * Sets the Jalali full year
   *
   * @params {Number} year
   * @return {JDate}
   */
  setFullYear(year) {
    this.date[0] = parseInt(year, 10);
    this._d = this.toGregorian();
    return this;
  }

  /*
   * Shows Jalali month number. A number between 1 and 12.
   *
   * Note: unlike Date#getMonth, this is one-based.
   *
   * @return {Number} Jalali month number
   */
  getMonth() {
    return this.date[1];
  }

  /*
   * Sets the Jalali month number. An integer between 1 and 12.
   *
   * Note: unlike Date#setMonth, this is one-based. Values outside 1..12 roll
   * the year over, so setMonth(13) is month 1 of the following year.
   *
   * @params {Number} month
   * @returns {JDate}
   */
  setMonth(month) {
    const fixed = helpers.fixMonth(this.getFullYear(), parseInt(month, 10));
    [this.date[0], this.date[1]] = fixed;
    this._d = this.toGregorian();

    return this;
  }

  /*
   * Shows Jalali day number. A number between 1 and 31
   *
   * @return {Number} Jalali day number
   */
  getDate() {
    return this.date[2];
  }

  /*
   * Sets Jalali day number. A number between 1 and 31
   *
   * @params {Number} date
   * @return {JDate}
   */
  setDate(date) {
    this.date[2] = parseInt(date, 10);
    this._d = this.toGregorian();

    return this;
  }

  /*
   * Returns the day of the week for the specified date. A number between 0 to 6
   *
   * @returns {Number}
   */
  getDay() {
    return this._d.getDay();
  }

  /*
   * Returns a formated output of current date.
   *
   * Identifiers: YYYY/YYY, YY, MMMM/MMM, MM, M, DD, D, dddd/ddd, dd/d.
   * Anything else is passed through, so wrap literal text that contains an
   * identifier character in square brackets: format('[Day] D').
   *
   * The name identifiers (MMM/MMMM, d/dd, ddd/dddd) resolve against this
   * instance's config, which also decides whether the numeric ones print in
   * ASCII or Persian digits.
   *
   * @params {String} format
   * @return {String}
   */
  format(format) {
    return helpers.formatDate(format, this, this.config);
  }
}
