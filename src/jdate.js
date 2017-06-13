/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 * @version: 1.0.0
 */

const Converter = require("./converter");
const helpers = require("./helpers");
const {
  MONTH_NAMES,
  ABBR_DAYS,
  DAYS_NAMES
} = require("./constants.js");

class JDate {
  constructor(input) {
    this._d = input || new Date;
    this.date = this.to_jalali(this._d);
  }

  /*
   * Coverts a Gregorian date to Jalali date
   *
   * @params {Date} date
   * @return {Array}
   */
  static to_jalali(date) {
    const jdate = Converter.d2j(Converter.g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    return [jdate.jy, jdate.jm, jdate.jd]
  }

  /*
   * converts a Jalali date to Gregorian
   *
   * @params {Number} year
   * @params {Number} month
   * @params {Number} day
   * @return {Date}
   */
  static to_gregorian(year, month, day) {
    var gdate = Converter.d2g(Converter.j2d(year, month, day));
    return new Date(gdate.gy, gdate.gm - 1, gdate.gd);
  }

  /*
   * Checks if a given year is a leap year or not
   *
   * @params {Number} year
   * @return {Boolean}
   */
  static isLeapYear(year) {
    return Converter.jalCal(year).leap === 0
  }

  /*
   * Returns month length
   *
   * @params {Number} year
   * @params {Number} month
   * @return {Number}
   */
  static daysInMonth(year, month) {
    year += ~~(month / 12)
    month = month - ~~(month / 12) * 12
    if (month < 0) {
      month += 12
      year -= 1
    } else if (month == 0) {
      month = 12
    }
    if (month <= 6) {
      return 31
    } else if (month <= 11) {
      return 30
    } else if (JDate.isLeapYear(year)) {
      return 30
    } else {
      return 29
    }
  }

  /*
   * Converts JDate date to Gregorian
   */
  to_gregorian() {
    return JDate.to_gregorian(this.date[0], this.date[1], this.date[2]);
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
    this.date[0] = parseInt(year);
    this._d = this.to_gregorian();
    return this
  }

  /*
   * Shows Jalali month number.
   *
   * @return {Number} Jalali month number
   */
  getMonth() {
    return this.date[1];
  }

  /*
   * Sets the Jalali month number. An integer between 0 and 11
   *
   * @params {Number} month
   * @returns {JDate}
   */
  setMonth(month) {
    fixed = fix_month(this.getFullYear(), parseInt(month));
    this.date[0] = fixed[0];
    this.date[1] = fixed[1];
    this._d = this.to_gregorian();
    return this
  }

  /*
   * Shows Jalali day number. A number between 0 to 31
   *
   * @return {Number} Jalali day number
   */
  getDate() {
    return this.date[2];
  }

  /*
   * Sets Jalali day number. A number between 0 to 31
   *
   * @params {Number} date
   * @return {JDate}
   */
  setDate(date) {
    this.date[2] = parseInt(date);
    this._d = this.to_gregorian();
    return this
  }

  /*
   * Returns the day of the week for the specified date. A number between 0 to 6
   *
   * @returns {Number}
   */
  getDay() {
    return this._d.getDay()
  }

  /*
   * Returns a formated output of current date
   *
   * @params {String} format
   * @return {String}
   */
  format(format) {
    format = helpers.replaceYear(format, this);
    format = helpers.replaceMonth(format, this);
    format = helpers.replaceDay(format, this);
    return format;
  }
}

module.exports = JDate;
