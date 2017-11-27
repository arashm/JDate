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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(1);

function div(a, b) {
  return Math.floor(a / b);
} /* eslint-disable no-unused-vars */

function mod(a, b) {
  return a - Math.floor(a / b) * b;
}

function fixMonth(year, month) {
  if (month > 12 || month <= 0) {
    var yearDiff = Math.floor((month - 1) / 12);
    var newYear = year - yearDiff;
    var newMonth = month - yearDiff * 12;

    return [newYear, newMonth];
  }

  return [year, month];
}

function zeroLeading(str) {
  if (str && str.length === 1) {
    return '0' + str;
  }
  return str;
}

function replaceYear(str, date) {
  var match = str.match(/[yY]+/);
  if (!match) {
    return str;
  }
  switch (match[0]) {
    case 'YYYY':
    case 'YYY':
      {
        var value = replaceYear(str.replace(match, date.getFullYear()), date);
        return value;
      }
    case 'YY':
      {
        var _value = replaceYear(str.replace(match, String(date.getFullYear()).slice(2)), date);
        return _value;
      }
    default:
      {
        return str;
      }
  }
}

function replaceMonth(str, date) {
  var match = str.match(/[mM]+/);
  if (!match) {
    return str;
  }
  switch (match[0]) {
    case 'M':
      {
        var value = replaceMonth(str.replace(match, date.getMonth()), date);
        return value;
      }
    case 'MM':
      {
        var zeroLeadingMonth = zeroLeading(date.getMonth().toString());
        var _value2 = replaceMonth(str.replace(match, zeroLeadingMonth), date);
        return _value2;
      }
    case 'MMM':
    case 'MMMM':
      {
        var _value3 = replaceMonth(str.replace(match, _constants.MONTH_NAMES[date.getMonth() - 1]), date);
        return _value3;
      }
    default:
      {
        return str;
      }
  }
}

function replaceDay(str, date) {
  var match = str.match(/[dD]+/);
  if (!match) {
    return str;
  }
  switch (match[0]) {
    case 'D':
      {
        var value = replaceDay(str.replace(match, date.getDate()), date);
        return value;
      }
    case 'DD':
      {
        var zeroLeadingDate = zeroLeading(date.getDate().toString());
        var _value4 = replaceDay(str.replace(match, zeroLeadingDate), date);
        return _value4;
      }
    case 'd':
    case 'dd':
      {
        var _value5 = replaceDay(str.replace(match, _constants.ABBR_DAYS[date.getDay()]), date);
        return _value5;
      }
    case 'ddd':
    case 'dddd':
      {
        var _value6 = replaceDay(str.replace(match, _constants.DAYS_NAMES[date.getDay()]), date);
        return _value6;
      }
    default:
      {
        return str;
      }
  }
}

module.exports = {
  mod: mod,
  div: div,
  replaceDay: replaceDay,
  replaceMonth: replaceMonth,
  replaceYear: replaceYear
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  MONTH_NAMES: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  ABBR_DAYS: ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'],
  DAYS_NAMES: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  GREGORIAN_EPOCH: 1721425.5,
  PERSIAN_EPOCH: 1948320.5
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

var _constants = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Converter = function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, null, [{
    key: 'leapGregorian',

    //  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year?
    value: function leapGregorian(year) {
      return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
    }

    // GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

  }, {
    key: 'gregorianToJulian',
    value: function gregorianToJulian(year, month, day) {
      var pad = void 0;
      if (month <= 2) {
        pad = 0;
      } else if (Converter.leapGregorian(year)) {
        pad = -1;
      } else {
        pad = -2;
      }

      return _constants.GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) + -Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12 + (pad + day));
    }

    //  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

  }, {
    key: 'julianToGregorian',
    value: function julianToGregorian(jd) {
      var wjd = Math.floor(jd - 0.5) + 0.5;
      var depoch = wjd - _constants.GREGORIAN_EPOCH;
      var quadricent = Math.floor(depoch / 146097);
      var dqc = (0, _helpers.mod)(depoch, 146097);
      var cent = Math.floor(dqc / 36524);
      var dcent = (0, _helpers.mod)(dqc, 36524);
      var quad = Math.floor(dcent / 1461);
      var dquad = (0, _helpers.mod)(dcent, 1461);
      var yindex = Math.floor(dquad / 365);
      var year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
      if (!(cent === 4 || yindex === 4)) {
        year += 1;
      }
      var yearday = wjd - Converter.gregorianToJulian(year, 1, 1);
      var leapadj = void 0;
      if (wjd < Converter.gregorianToJulian(year, 3, 1)) {
        leapadj = 0;
      } else if (Converter.leapGregorian(year) ? 1 : 2) {
        leapadj = 1;
      } else {
        leapadj = 2;
      }
      var month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
      var day = wjd - Converter.gregorianToJulian(year, month, 1) + 1;

      return [year, month, day];
    }

    //  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?

  }, {
    key: 'leapPersian',
    value: function leapPersian(year) {
      return ((year - (year > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
    }

    //  PERSIAN_TO_JD  --  Determine Julian day from Persian date

  }, {
    key: 'persianToJulian',
    value: function persianToJulian(year, month, day) {
      var epbase = year - (year >= 0 ? 474 : 473);
      var epyear = 474 + (0, _helpers.mod)(epbase, 2820);

      return day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + Math.floor((epyear * 682 - 110) / 2816) + (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983 + (_constants.PERSIAN_EPOCH - 1);
    }

    //  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

  }, {
    key: 'julianToPersian',
    value: function julianToPersian(jd) {
      var njd = Math.floor(jd) + 0.5;
      var depoch = njd - Converter.persianToJulian(475, 1, 1);
      var cycle = Math.floor(depoch / 1029983);
      var cyear = (0, _helpers.mod)(depoch, 1029983);
      var ycycle = void 0;
      if (cyear === 1029982) {
        ycycle = 2820;
      } else {
        var aux1 = Math.floor(cyear / 366);
        var aux2 = (0, _helpers.mod)(cyear, 366);
        ycycle = Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
      }
      var year = ycycle + 2820 * cycle + 474;
      if (year <= 0) {
        year -= 1;
      }
      var yday = njd - Converter.persianToJulian(year, 1, 1) + 1;
      var month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
      var day = njd - Converter.persianToJulian(year, month, 1) + 1;

      return [year, month, day];
    }
  }, {
    key: 'persianToGregorian',
    value: function persianToGregorian(year, month, day) {
      var julian = Converter.persianToJulian(year, month, day);

      return Converter.julianToGregorian(julian);
    }
  }, {
    key: 'gregorianToPersian',
    value: function gregorianToPersian(year, month, day) {
      var julian = Converter.gregorianToJulian(year, month, day);

      return Converter.julianToPersian(julian);
    }
  }]);

  return Converter;
}();

exports.default = Converter;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/arashm/JDate
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author: Arash Mousavi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @version: 1.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _converter = __webpack_require__(2);

var _converter2 = _interopRequireDefault(_converter);

var _helpers = __webpack_require__(0);

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JDate = function () {
  function JDate() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    _classCallCheck(this, JDate);

    this.input = input;
    if (Array.isArray(input)) {
      this.date = input.map(function (num) {
        return parseInt(num, 10);
      });
      this._d = this.toGregorian();
    } else if (input instanceof Date) {
      this._d = input;
      this.date = JDate.toJalali(this.input);
    }
  }

  /*
   * Coverts a Gregorian date to Jalali date
   *
   * @params {Date} date
   * @return {Array}
   */


  _createClass(JDate, [{
    key: 'toGregorian',


    /*
     * Converts JDate date to Gregorian
     */
    value: function toGregorian() {
      return JDate.toGregorian(this.date[0], this.date[1], this.date[2]);
    }

    /*
     * Shows Jalali's full year, ex: 1393
     *
     * @return {Integer}
     */

  }, {
    key: 'getFullYear',
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
    key: 'setFullYear',
    value: function setFullYear(year) {
      this.date[0] = parseInt(year, 10);
      this.input = this.toGregorian();
      return this;
    }

    /*
     * Shows Jalali month number.
     *
     * @return {Number} Jalali month number
     */

  }, {
    key: 'getMonth',
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
    key: 'setMonth',
    value: function setMonth(month) {
      var fixed = helpers.fixMonth(this.getFullYear(), parseInt(month, 10));
      this.date[0] = fixed[0];
      this.date[1] = fixed[1];
      this.input = this.toGregorian();

      return this;
    }

    /*
     * Shows Jalali day number. A number between 0 to 31
     *
     * @return {Number} Jalali day number
     */

  }, {
    key: 'getDate',
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
    key: 'setDate',
    value: function setDate(date) {
      this.date[2] = parseInt(date, 10);
      this.input = this.toGregorian();

      return this;
    }

    /*
     * Returns the day of the week for the specified date. A number between 0 to 6
     *
     * @returns {Number}
     */

  }, {
    key: 'getDay',
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
    key: 'format',
    value: function format(_format) {
      var result = helpers.replaceYear(_format, this);
      result = helpers.replaceMonth(result, this);
      result = helpers.replaceDay(result, this);

      return result;
    }
  }], [{
    key: 'toJalali',
    value: function toJalali(date) {
      var julianDate = _converter2.default.gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate());
      var jdate = _converter2.default.julianToPersian(julianDate);

      return jdate;
    }
    // eslint-disable-next-line camelcase

  }, {
    key: 'to_jalali',
    value: function to_jalali(date) {
      return JDate.toJalali(date);
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
    key: 'toGregorian',
    value: function toGregorian(year, month, day) {
      var gdate = _converter2.default.julianToGregorian(_converter2.default.persianToJulian(year, month, day));

      return new Date(gdate[0], gdate[1] - 1, gdate[2]);
    }
    // eslint-disable-next-line camelcase

  }, {
    key: 'to_gregorian',
    value: function to_gregorian(year, month, day) {
      return JDate.toGregorian(year, month, day);
    }

    /*
     * Checks if a given year is a leap year or not
     *
     * @params {Number} year
     * @return {Boolean}
     */

  }, {
    key: 'isLeapYear',
    value: function isLeapYear(year) {
      return _converter2.default.leapPersian(year);
    }

    /*
     * Returns month length.
     *
     * @params {Number} year
     * @params {Number} month zero based
     * @return {Number}
     */

  }, {
    key: 'daysInMonth',
    value: function daysInMonth(year, month) {
      var calcedYear = year - Math.floor(month / 12);
      var calcedMonth = month - Math.floor(month / 12) * 12;

      if (calcedMonth < 0) {
        calcedMonth += 12;
        calcedYear -= 1;
      } else if (calcedMonth === 0) {
        calcedMonth = 12;
      }

      if (calcedMonth < 6) {
        return 31;
      } else if (calcedMonth < 11) {
        return 30;
      } else if (JDate.isLeapYear(calcedYear)) {
        return 30;
      }
      return 29;
    }
  }]);

  return JDate;
}();

exports.default = JDate;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=jdate.js.map