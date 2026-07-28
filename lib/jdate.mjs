var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/constants.js
var MONTH_NAMES = ["فروردین", "اردیبهشت", "خرداد", "تیر", "امرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
var ABBR_DAYS = ["۱ش", "۲ش", "۳ش", "۴ش", "۵ش", "ج", "ش"];
var DAYS_NAMES = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
var GREGORIAN_EPOCH = 1;
var PERSIAN_EPOCH = 226896;
var PERSIAN_CYCLE_DAYS = 12053;
var NON_LEAP_CORRECTION = [
  1502,
  1601,
  1634,
  1667,
  1700,
  1733,
  1766,
  1799,
  1832,
  1865,
  1898,
  1931,
  1964,
  1997,
  2030,
  2059,
  2063,
  2096,
  2129,
  2158,
  2162,
  2191,
  2195,
  2224,
  2228,
  2257,
  2261,
  2290,
  2294,
  2323,
  2327,
  2356,
  2360,
  2389,
  2393,
  2422,
  2426,
  2455,
  2459,
  2488,
  2492,
  2521,
  2525,
  2554,
  2558,
  2587,
  2591,
  2620,
  2624,
  2653,
  2657,
  2686,
  2690,
  2719,
  2723,
  2748,
  2752,
  2756,
  2781,
  2785,
  2789,
  2818,
  2822,
  2847,
  2851,
  2855,
  2880,
  2884,
  2888,
  2913,
  2917,
  2921,
  2946,
  2950,
  2954,
  2979,
  2983,
  2987
];

// src/helpers.js
function divCeil(a, b) {
  return Math.floor((a + b - 1) / b);
}
__name(divCeil, "divCeil");
function fixMonth(year, month) {
  if (month > 12 || month <= 0) {
    const yearDiff = Math.floor((month - 1) / 12);
    const newYear = year + yearDiff;
    const newMonth = month - yearDiff * 12;
    return [newYear, newMonth];
  }
  return [year, month];
}
__name(fixMonth, "fixMonth");
function zeroLeading(str) {
  if (str && str.length === 1) {
    return `0${str}`;
  }
  return str;
}
__name(zeroLeading, "zeroLeading");
var TOKENS = {
  YYYY: /* @__PURE__ */ __name((date) => String(date.getFullYear()), "YYYY"),
  YYY: /* @__PURE__ */ __name((date) => String(date.getFullYear()), "YYY"),
  YY: /* @__PURE__ */ __name((date) => String(date.getFullYear()).slice(-2), "YY"),
  M: /* @__PURE__ */ __name((date) => String(date.getMonth()), "M"),
  MM: /* @__PURE__ */ __name((date) => zeroLeading(String(date.getMonth())), "MM"),
  MMM: /* @__PURE__ */ __name((date) => MONTH_NAMES[date.getMonth() - 1], "MMM"),
  MMMM: /* @__PURE__ */ __name((date) => MONTH_NAMES[date.getMonth() - 1], "MMMM"),
  D: /* @__PURE__ */ __name((date) => String(date.getDate()), "D"),
  DD: /* @__PURE__ */ __name((date) => zeroLeading(String(date.getDate())), "DD"),
  d: /* @__PURE__ */ __name((date) => ABBR_DAYS[date.getDay()], "d"),
  dd: /* @__PURE__ */ __name((date) => ABBR_DAYS[date.getDay()], "dd"),
  ddd: /* @__PURE__ */ __name((date) => DAYS_NAMES[date.getDay()], "ddd"),
  dddd: /* @__PURE__ */ __name((date) => DAYS_NAMES[date.getDay()], "dddd")
};
var TOKEN_PATTERN = /\[([^\]]*)\]?|Y+|M+|D+|d+/g;
function formatDate(str, date) {
  return str.replace(TOKEN_PATTERN, (token, literal) => {
    if (literal !== void 0) {
      return literal;
    }
    const resolve = TOKENS[token];
    return resolve ? resolve(date) : token;
  });
}
__name(formatDate, "formatDate");

// src/converter.js
var _Converter = class _Converter {
  static gregorianToFixed(year, month, day) {
    const result = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12) + (month <= 2 ? 0 : _Converter.leapGregorian(year) ? -1 : -2) + day;
    return result;
  }
  static gregorianYearFromFixed(date) {
    const d0 = date - GREGORIAN_EPOCH;
    const n400 = Math.floor(d0 / 146097);
    const d1 = d0 % 146097;
    const n100 = Math.floor(d1 / 36524);
    const d2 = d1 % 36524;
    const n4 = Math.floor(d2 / 1461);
    const d3 = d2 % 1461;
    const n1 = Math.floor(d3 / 365);
    const year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    if (n100 === 4 || n1 === 4) {
      return year;
    }
    return year + 1;
  }
  static gregorianNewYear(year) {
    return _Converter.gregorianToFixed(year, 1, 1);
  }
  static fixedToGregorian(date) {
    const year = _Converter.gregorianYearFromFixed(date);
    const priorDays = date - _Converter.gregorianNewYear(year);
    let correction;
    if (date < _Converter.gregorianToFixed(year, 3, 1)) {
      correction = 0;
    } else if (_Converter.leapGregorian(year)) {
      correction = 1;
    } else {
      correction = 2;
    }
    const month = Math.floor((12 * (priorDays + correction) + 373) / 367);
    const day = date - _Converter.gregorianToFixed(year, month, 1) + 1;
    return [year, month, day];
  }
  static jalaliToFixed(year, month, day) {
    let newYear = PERSIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((8 * year + 21) / 33);
    if (NON_LEAP_CORRECTION.includes(year - 1)) {
      newYear -= 1;
    }
    return newYear - 1 + (month <= 7 ? 31 * (month - 1) : 30 * (month - 1) + 6) + day;
  }
  static fixedToJalali(fixedDate) {
    const daysSinceEpoch = fixedDate - _Converter.jalaliToFixed(1, 1, 1);
    let year = 1 + Math.floor((33 * daysSinceEpoch + 3) / PERSIAN_CYCLE_DAYS);
    let dayOfYear = fixedDate - _Converter.jalaliToFixed(year, 1, 1) + 1;
    if (dayOfYear === 366 && NON_LEAP_CORRECTION.includes(year)) {
      year += 1;
      dayOfYear = 1;
    }
    const month = dayOfYear <= 186 ? divCeil(dayOfYear, 31) : divCeil(dayOfYear - 6, 30);
    const day = fixedDate - _Converter.jalaliToFixed(year, month, 1) + 1;
    return [year, month, day];
  }
  static leapPersian(jdate) {
    if (NON_LEAP_CORRECTION.includes(jdate)) {
      return false;
    }
    if (NON_LEAP_CORRECTION.includes(jdate - 1)) {
      return true;
    }
    return (25 * jdate + 11) % 33 < 8;
  }
  static leapGregorian(year) {
    return year % 4 === 0 && ![100, 200, 300].includes(year % 400);
  }
};
__name(_Converter, "Converter");
var Converter = _Converter;

// src/jdate.js
var _JDate = class _JDate {
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
      this.input = /* @__PURE__ */ new Date();
    } else {
      throw new Error("Unexpected input");
    }
    if (Array.isArray(this.input)) {
      this.date = this.input.map((num) => parseInt(num, 10));
      this._d = this.toGregorian();
    } else if (this.input instanceof Date) {
      this._d = this.input;
      this.date = _JDate.toJalali(this.input);
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
  static to_jalali(date) {
    return _JDate.toJalali(date);
  }
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
  static to_gregorian(year, month, day) {
    return _JDate.toGregorian(year, month, day);
  }
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
    const calcedMonth = (month % 12 + 12) % 12;
    if (calcedMonth < 6) {
      return 31;
    }
    if (calcedMonth < 11) {
      return 30;
    }
    if (_JDate.isLeapYear(calcedYear)) {
      return 30;
    }
    return 29;
  }
  /*
   * Converts JDate date to Gregorian
   */
  toGregorian() {
    return _JDate.toGregorian(this.date[0], this.date[1], this.date[2]);
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
    const fixed = fixMonth(this.getFullYear(), parseInt(month, 10));
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
    return formatDate(format, this);
  }
};
__name(_JDate, "JDate");
var JDate = _JDate;
export {
  JDate as default
};
//# sourceMappingURL=jdate.mjs.map
