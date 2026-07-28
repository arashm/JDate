/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 */

import Converter from './converter';
import * as helpers from './helpers';

export default class JDate {
  /*
   * Accepts a Jalali date as an array or as three numbers, a Date object, or
   * nothing at all (which defaults to today).
   *
   * Instance state:
   *   this.date   {Array}  the Jalali date as [year, month, day]
   *   this._d     {Date}   the Gregorian equivalent, kept in sync by the setters
   *   this.input  {Array|Date}  whatever was passed to the constructor; setters
   *                             do not touch it
   */
  constructor(...args) {
    if (Array.isArray(args[0]) || args[0] instanceof Date) {
      [this.input] = args;
    } else if (args.length === 3) {
      this.input = args;
    } else if (!args.length) {
      this.input = new Date();
    } else {
      throw new Error('Unexpected input');
    }

    if (Array.isArray(this.input)) {
      this.date = this.input.map((num) => parseInt(num, 10));
      this._d = this.toGregorian();
    } else if (this.input instanceof Date) {
      this._d = this.input;
      this.date = JDate.toJalali(this.input);
    }
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
   * @params {String} format
   * @return {String}
   */
  format(format) {
    return helpers.formatDate(format, this);
  }
}
