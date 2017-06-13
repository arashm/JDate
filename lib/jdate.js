(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("jdate", [], factory);
	else if(typeof exports === 'object')
		exports["jdate"] = factory();
	else
		root["jdate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(1),
    div = _require.div,
    mod = _require.mod;

var Converter = function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, null, [{
    key: 'jalCal',

    /*
      This function determines if the Jalaali (Persian) year is
      leap (366-day long) or is the common year (365 days), and
      finds the day in March (Gregorian calendar) of the first
      day of the Jalaali year (jy).
       @param jy Jalaali calendar year (-61 to 3177)
      @return
        leap: number of years since the last leap year (0 to 4)
        gy: Gregorian year of the beginning of Jalaali year
        march: the March day of Farvardin the 1st (1st day of jy)
      @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
      @see: http://www.fourmilab.ch/documents/calendar/
    */
    value: function jalCal(jy) {
      // Jalaali years starting the 33-year rule.
      var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
      var bl = breaks.length;
      var gy = jy + 621;
      var leapJ = -14;
      var jp = breaks[0];
      // const jm, jump, leap, leapG, march, n, i

      if (jy < jp || jy >= breaks[bl - 1]) {
        throw new Error('Invalid Jalaali year ' + jy);
      }

      // Find the limiting years for the Jalaali year jy.
      for (i = 1; i < bl; i += 1) {
        jm = breaks[i];
        jump = jm - jp;
        if (jy < jm) {
          break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
      }
      n = jy - jp;

      // Find the number of leap years from AD 621 to the beginning
      // of the current Jalaali year in the Persian calendar.
      leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
      if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
      }

      // And the same in the Gregorian calendar (until the year gy).
      leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

      // Determine the Gregorian date of Farvardin the 1st.
      march = 20 + leapJ - leapG;

      // Find how many years have passed since the last leap year.
      if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
      }
      leap = mod(mod(n + 1, 33) - 1, 4);
      if (leap === -1) {
        leap = 4;
      }

      return {
        leap: leap,
        gy: gy,
        march: march
      };
    }

    /*
      Converts a date of the Jalaali calendar to the Julian Day number.
       @param jy Jalaali year (1 to 3100)
      @param jm Jalaali month (1 to 12)
      @param jd Jalaali day (1 to 29/31)
      @return Julian Day number
    */

  }, {
    key: 'j2d',
    value: function j2d(jy, jm, jd) {
      var r = jalCal(jy);
      return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
    }

    /*
      Converts the Julian Day number to a date in the Jalaali calendar.
       @param jdn Julian Day number
      @return
        jy: Jalaali year (1 to 3100)
        jm: Jalaali month (1 to 12)
        jd: Jalaali day (1 to 29/31)
    */

  }, {
    key: 'd2j',
    value: function d2j(jdn) {
      var gy = d2g(jdn).gy,
          // Calculate Gregorian year (gy).
      jy = gy - 621,
          r = jalCal(jy),
          jdn1f = g2d(gy, 3, r.march),
          jd = void 0,
          jm = void 0,
          k = void 0;

      // Find number of days that passed since 1 Farvardin.
      k = jdn - jdn1f;
      if (k >= 0) {
        if (k <= 185) {
          // The first 6 months.
          jm = 1 + div(k, 31);
          jd = mod(k, 31) + 1;
          return { jy: jy,
            jm: jm,
            jd: jd
          };
        }
        // The remaining months.
        k -= 186;
      } else {
        // Previous Jalaali year.
        jy -= 1;
        k += 179;
        if (r.leap === 1) {
          k += 1;
        }
      }
      jm = 7 + div(k, 30);
      jd = mod(k, 30) + 1;

      return {
        jy: jy,
        jm: jm,
        jd: jd
      };
    }

    /*
      Calculates the Julian Day number from Gregorian or Julian
      calendar dates. This integer number corresponds to the noon of
      the date (i.e. 12 hours of Universal Time).
      The procedure was tested to be good since 1 March, -100100 (of both
      calendars) up to a few million years into the future.
       @param gy Calendar year (years BC numbered 0, -1, -2, ...)
      @param gm Calendar month (1 to 12)
      @param gd Calendar day of the month (1 to 28/29/30/31)
      @return Julian Day number
    */

  }, {
    key: 'g2d',
    value: function g2d(gy, gm, gd) {
      var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
      d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
      return d;
    }

    /*
      Calculates Gregorian and Julian calendar dates from the Julian Day number
      (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
      calendars) to some millions years ahead of the present.
       @param jdn Julian Day number
      @return
        gy: Calendar year (years BC numbered 0, -1, -2, ...)
        gm: Calendar month (1 to 12)
        gd: Calendar day of the month M (1 to 28/29/30/31)
    */

  }, {
    key: 'd2g',
    value: function d2g(jdn) {
      var julian = 4 * jdn + 139361631 + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
      var i = div(mod(j, 1461), 4) * 5 + 308;
      var gregorianDay = div(mod(i, 153), 5) + 1;
      var gregorianMonth = mod(div(i, 153), 12) + 1;
      var gregorianYear = div(j, 1461) - 100100 + div(8 - gm, 6);

      return {
        gy: gregorianYear,
        gm: gregorianMonth,
        gd: gregorianDay
      };
    }
  }]);

  return Converter;
}();

module.exports = Converter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function div(a, b) {
  return Math.floor(a / b);
}

function mod(a, b) {
  return a - ~~(a / b) * b;
}

function fix_month(year, month) {
  if (month > 12 || month <= 0) {
    var yearDiff = Math.floor((month - 1) / 12);
    year += yearDiff;
    month -= yearDiff * 12;
  }
  return [year, month];
}

function replaceYear(str, date) {
  match = str.match(/[yY]+/);
  if (match) {
    switch (match[0]) {
      case 'YYYY':
      case 'YYY':
        var value = replaceYear(str.replace(match, date.getFullYear()), date);
        return value;
      case 'YY':
        var value = replaceYear(str.replace(match, String(date.getFullYear()).slice(2)), date);
        return value;
    }
  } else {
    return str;
  }
}

function replaceMonth(str, date) {
  match = str.match(/[mM]+/);
  if (match) {
    switch (match[0]) {
      case 'M':
      case 'MM':
        var value = replaceMonth(str.replace(match, date.getMonth()), date);
        return value;
      case 'MMM':
      case 'MMMM':
        var value = replaceMonth(str.replace(match, MONTH_NAMES[date.getMonth() - 1]), date);
        return value;
    }
  } else {
    return str;
  }
}

function replaceDay(str, date) {
  match = str.match(/[dD]+/);
  if (match) {
    switch (match[0]) {
      case 'D':
      case 'DD':
        var value = replaceDay(str.replace(match, date.getDate()), date);
        return value;
      case 'd':
      case 'dd':
        var value = replaceDay(str.replace(match, ABBR_DAYS[date.getDay()]), date);
        return value;
      case 'ddd':
      case 'dddd':
        var value = replaceDay(str.replace(match, DAYS_NAMES[date.getDay()]), date);
        return value;
    }
  } else {
    return str;
  }
}

module.exports = {
  mod: mod,
  div: div
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 * @version: 1.0.0
 */

var Converter = __webpack_require__(0);
var helpers = __webpack_require__(1);

var _require = __webpack_require__(3),
    MONTH_NAMES = _require.MONTH_NAMES,
    ABBR_DAYS = _require.ABBR_DAYS,
    DAYS_NAMES = _require.DAYS_NAMES;

var JDate = function () {
  function JDate(input) {
    _classCallCheck(this, JDate);

    this._d = input || new Date();
    this.date = this.to_jalali(this._d);
  }

  /*
   * Coverts a Gregorian date to Jalali date
   *
   * @params {Date} date
   * @return {Array}
   */


  _createClass(JDate, [{
    key: "to_gregorian",


    /*
     * Converts JDate date to Gregorian
     */
    value: function to_gregorian() {
      return JDate.to_gregorian(this.date[0], this.date[1], this.date[2]);
    }

    /*
     * Shows Jalali's full year, ex: 1393
     *
     * @return {Integer}
     */

  }, {
    key: "getFullYear",
    value: function getFullYear() {
      return this.date[0];
    }

    /*
     * Sets the Jalali full year
     *
     * @params {Number} year
     * @return {JDate}
     */

  }, {
    key: "setFullYear",
    value: function setFullYear(year) {
      this.date[0] = parseInt(year);
      this._d = this.to_gregorian();
      return this;
    }

    /*
     * Shows Jalali month number.
     *
     * @return {Number} Jalali month number
     */

  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.date[1];
    }

    /*
     * Sets the Jalali month number. An integer between 0 and 11
     *
     * @params {Number} month
     * @returns {JDate}
     */

  }, {
    key: "setMonth",
    value: function setMonth(month) {
      fixed = fix_month(this.getFullYear(), parseInt(month));
      this.date[0] = fixed[0];
      this.date[1] = fixed[1];
      this._d = this.to_gregorian();
      return this;
    }

    /*
     * Shows Jalali day number. A number between 0 to 31
     *
     * @return {Number} Jalali day number
     */

  }, {
    key: "getDate",
    value: function getDate() {
      return this.date[2];
    }

    /*
     * Sets Jalali day number. A number between 0 to 31
     *
     * @params {Number} date
     * @return {JDate}
     */

  }, {
    key: "setDate",
    value: function setDate(date) {
      this.date[2] = parseInt(date);
      this._d = this.to_gregorian();
      return this;
    }

    /*
     * Returns the day of the week for the specified date. A number between 0 to 6
     *
     * @returns {Number}
     */

  }, {
    key: "getDay",
    value: function getDay() {
      return this._d.getDay();
    }

    /*
     * Returns a formated output of current date
     *
     * @params {String} format
     * @return {String}
     */

  }, {
    key: "format",
    value: function format(_format) {
      _format = helpers.replaceYear(_format, this);
      _format = helpers.replaceMonth(_format, this);
      _format = helpers.replaceDay(_format, this);
      return _format;
    }
  }], [{
    key: "to_jalali",
    value: function to_jalali(date) {
      var jdate = Converter.d2j(Converter.g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
      return [jdate.jy, jdate.jm, jdate.jd];
    }

    /*
     * converts a Jalali date to Gregorian
     *
     * @params {Number} year
     * @params {Number} month
     * @params {Number} day
     * @return {Date}
     */

  }, {
    key: "to_gregorian",
    value: function to_gregorian(year, month, day) {
      var gdate = Converter.d2g(Converter.j2d(year, month, day));
      return new Date(gdate.gy, gdate.gm - 1, gdate.gd);
    }

    /*
     * Checks if a given year is a leap year or not
     *
     * @params {Number} year
     * @return {Boolean}
     */

  }, {
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return Converter.jalCal(year).leap === 0;
    }

    /*
     * Returns month length
     *
     * @params {Number} year
     * @params {Number} month
     * @return {Number}
     */

  }, {
    key: "daysInMonth",
    value: function daysInMonth(year, month) {
      year += ~~(month / 12);
      month = month - ~~(month / 12) * 12;
      if (month < 0) {
        month += 12;
        year -= 1;
      } else if (month == 0) {
        month = 12;
      }
      if (month <= 6) {
        return 31;
      } else if (month <= 11) {
        return 30;
      } else if (JDate.isLeapYear(year)) {
        return 30;
      } else {
        return 29;
      }
    }
  }]);

  return JDate;
}();

module.exports = JDate;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  MONTH_NAMES: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  ABBR_DAYS: ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'],
  DAYS_NAMES: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=jdate.js.map