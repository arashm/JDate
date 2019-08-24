(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("JDate", [], factory);
	else if(typeof exports === 'object')
		exports["JDate"] = factory();
	else
		root["JDate"] = factory();
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/jdate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  MONTH_NAMES: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  ABBR_DAYS: ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'],
  DAYS_NAMES: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  GREGORIAN_EPOCH: 1721425.5,
  PERSIAN_EPOCH: 1948320.5
};

/***/ }),

/***/ "./src/converter.js":
/*!**************************!*\
  !*** ./src/converter.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Converter; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Converter =
/*#__PURE__*/
function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, null, [{
    key: "leapGregorian",
    //  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year?
    value: function leapGregorian(year) {
      return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
    } // GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

  }, {
    key: "gregorianToJulian",
    value: function gregorianToJulian(year, month, day) {
      var pad;

      if (month <= 2) {
        pad = 0;
      } else if (Converter.leapGregorian(year)) {
        pad = -1;
      } else {
        pad = -2;
      }

      return _constants__WEBPACK_IMPORTED_MODULE_1__["GREGORIAN_EPOCH"] - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) + -Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12 + (pad + day));
    } //  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

  }, {
    key: "julianToGregorian",
    value: function julianToGregorian(jd) {
      var wjd = Math.floor(jd - 0.5) + 0.5;
      var depoch = wjd - _constants__WEBPACK_IMPORTED_MODULE_1__["GREGORIAN_EPOCH"];
      var quadricent = Math.floor(depoch / 146097);
      var dqc = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mod"])(depoch, 146097);
      var cent = Math.floor(dqc / 36524);
      var dcent = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mod"])(dqc, 36524);
      var quad = Math.floor(dcent / 1461);
      var dquad = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mod"])(dcent, 1461);
      var yindex = Math.floor(dquad / 365);
      var year = quadricent * 400 + cent * 100 + quad * 4 + yindex;

      if (!(cent === 4 || yindex === 4)) {
        year += 1;
      }

      var yearday = wjd - Converter.gregorianToJulian(year, 1, 1);
      var leapadj;

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
    } //  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?

  }, {
    key: "leapPersian",
    value: function leapPersian(year) {
      return ((year - (year > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
    } //  PERSIAN_TO_JD  --  Determine Julian day from Persian date

  }, {
    key: "persianToJulian",
    value: function persianToJulian(year, month, day) {
      var epbase = year - (year >= 0 ? 474 : 473);
      var epyear = 474 + Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mod"])(epbase, 2820);
      return day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + Math.floor((epyear * 682 - 110) / 2816) + (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983 + (_constants__WEBPACK_IMPORTED_MODULE_1__["PERSIAN_EPOCH"] - 1);
    } //  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

  }, {
    key: "julianToPersian",
    value: function julianToPersian(jd) {
      var njd = Math.floor(jd) + 0.5;
      var depoch = njd - Converter.persianToJulian(475, 1, 1);
      var cycle = Math.floor(depoch / 1029983);
      var cyear = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mod"])(depoch, 1029983);
      var ycycle;

      if (cyear === 1029982) {
        ycycle = 2820;
      } else {
        var aux1 = Math.floor(cyear / 366);
        var aux2 = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mod"])(cyear, 366);
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
    key: "persianToGregorian",
    value: function persianToGregorian(year, month, day) {
      var julian = Converter.persianToJulian(year, month, day);
      return Converter.julianToGregorian(julian);
    }
  }, {
    key: "gregorianToPersian",
    value: function gregorianToPersian(year, month, day) {
      var julian = Converter.gregorianToJulian(year, month, day);
      return Converter.julianToPersian(julian);
    }
  }]);

  return Converter;
}();



/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: div, mod, fixMonth, zeroLeading, replaceYear, replaceMonth, replaceDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixMonth", function() { return fixMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zeroLeading", function() { return zeroLeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceYear", function() { return replaceYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceMonth", function() { return replaceMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceDay", function() { return replaceDay; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-unused-vars */

function div(a, b) {
  return Math.floor(a / b);
}
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
    return "0".concat(str);
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
        var _value3 = replaceMonth(str.replace(match, _constants__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"][date.getMonth() - 1]), date);

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
        var _value5 = replaceDay(str.replace(match, _constants__WEBPACK_IMPORTED_MODULE_0__["ABBR_DAYS"][date.getDay()]), date);

        return _value5;
      }

    case 'ddd':
    case 'dddd':
      {
        var _value6 = replaceDay(str.replace(match, _constants__WEBPACK_IMPORTED_MODULE_0__["DAYS_NAMES"][date.getDay()]), date);

        return _value6;
      }

    default:
      {
        return str;
      }
  }
}

/***/ }),

/***/ "./src/jdate.js":
/*!**********************!*\
  !*** ./src/jdate.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JDate; });
/* harmony import */ var _converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converter */ "./src/converter.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 * @version: 1.0.0
 */



var JDate =
/*#__PURE__*/
function () {
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
    key: "toGregorian",

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
      var fixed = _helpers__WEBPACK_IMPORTED_MODULE_1__["fixMonth"](this.getFullYear(), parseInt(month, 10));
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
      var result = _helpers__WEBPACK_IMPORTED_MODULE_1__["replaceYear"](_format, this);
      result = _helpers__WEBPACK_IMPORTED_MODULE_1__["replaceMonth"](result, this);
      result = _helpers__WEBPACK_IMPORTED_MODULE_1__["replaceDay"](result, this);
      return result;
    }
  }], [{
    key: "toJalali",
    value: function toJalali(date) {
      var julianDate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate());
      var jdate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].julianToPersian(julianDate);
      return jdate;
    } // eslint-disable-next-line camelcase

  }, {
    key: "to_jalali",
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
    key: "toGregorian",
    value: function toGregorian(year, month, day) {
      var gdate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].julianToGregorian(_converter__WEBPACK_IMPORTED_MODULE_0__["default"].persianToJulian(year, month, day));
      return new Date(gdate[0], gdate[1] - 1, gdate[2]);
    } // eslint-disable-next-line camelcase

  }, {
    key: "to_gregorian",
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
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return _converter__WEBPACK_IMPORTED_MODULE_0__["default"].leapPersian(year);
    }
    /*
     * Returns month length.
     *
     * @params {Number} year
     * @params {Number} month zero based
     * @return {Number}
     */

  }, {
    key: "daysInMonth",
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
      }

      if (calcedMonth < 11) {
        return 30;
      }

      if (JDate.isLeapYear(calcedYear)) {
        return 30;
      }

      return 29;
    }
  }]);

  return JDate;
}();



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2pkYXRlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJNT05USF9OQU1FUyIsIkFCQlJfREFZUyIsIkRBWVNfTkFNRVMiLCJHUkVHT1JJQU5fRVBPQ0giLCJQRVJTSUFOX0VQT0NIIiwiQ29udmVydGVyIiwieWVhciIsIm1vbnRoIiwiZGF5IiwicGFkIiwibGVhcEdyZWdvcmlhbiIsIk1hdGgiLCJmbG9vciIsImpkIiwid2pkIiwiZGVwb2NoIiwicXVhZHJpY2VudCIsImRxYyIsIm1vZCIsImNlbnQiLCJkY2VudCIsInF1YWQiLCJkcXVhZCIsInlpbmRleCIsInllYXJkYXkiLCJncmVnb3JpYW5Ub0p1bGlhbiIsImxlYXBhZGoiLCJlcGJhc2UiLCJlcHllYXIiLCJuamQiLCJwZXJzaWFuVG9KdWxpYW4iLCJjeWNsZSIsImN5ZWFyIiwieWN5Y2xlIiwiYXV4MSIsImF1eDIiLCJ5ZGF5IiwiY2VpbCIsImp1bGlhbiIsImp1bGlhblRvR3JlZ29yaWFuIiwianVsaWFuVG9QZXJzaWFuIiwiZGl2IiwiYSIsImIiLCJmaXhNb250aCIsInllYXJEaWZmIiwibmV3WWVhciIsIm5ld01vbnRoIiwiemVyb0xlYWRpbmciLCJzdHIiLCJsZW5ndGgiLCJyZXBsYWNlWWVhciIsImRhdGUiLCJtYXRjaCIsInZhbHVlIiwicmVwbGFjZSIsImdldEZ1bGxZZWFyIiwiU3RyaW5nIiwic2xpY2UiLCJyZXBsYWNlTW9udGgiLCJnZXRNb250aCIsInplcm9MZWFkaW5nTW9udGgiLCJ0b1N0cmluZyIsInJlcGxhY2VEYXkiLCJnZXREYXRlIiwiemVyb0xlYWRpbmdEYXRlIiwiZ2V0RGF5IiwiSkRhdGUiLCJpbnB1dCIsIkRhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJudW0iLCJwYXJzZUludCIsIl9kIiwidG9HcmVnb3JpYW4iLCJ0b0phbGFsaSIsImZpeGVkIiwiaGVscGVycyIsImZvcm1hdCIsInJlc3VsdCIsImp1bGlhbkRhdGUiLCJqZGF0ZSIsImdkYXRlIiwibGVhcFBlcnNpYW4iLCJjYWxjZWRZZWFyIiwiY2FsY2VkTW9udGgiLCJpc0xlYXBZZWFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsYUFBVyxFQUFFLENBQUMsU0FBRCxFQUFZLFVB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TUFHTyxJQUFJQyxXQUFXLEtBQUssQ0FBcEIsRUFBdUI7QUFDNUJBLG1CQUFXLEdBQUcsRUFBZDtBQUNEOztBQUVELFVBQUlBLFdBQVcsR0FBRyxDQUFsQixFQUFxQjtBQUNuQixlQUFPLEVBQVA7QUFDRDs7QUFBQyxVQUFJQSxXQUFXLEdBQUcsRUFBbEIsRUFBc0I7QUFDdEIsZUFBTyxFQUFQO0FBQ0Q7O0FBQUMsVUFBSXBCLEtBQUssQ0FBQ3FCLFVBQU4sQ0FBaUJGLFVBQWpCLENBQUosRUFBa0M7QUFDbEMsZUFBTyxFQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxFQUFQO0FBQ0QiLCJmaWxlIjoiamRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkpEYXRlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvamRhdGUuanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTU9OVEhfTkFNRVM6IFsn2YHYsdmI2LHYr9uM2YYnLCAn2KfYsdiv24zYqNmH2LTYqicsICfYrtix2K/Yp9ivJywgJ9iq24zYsScsICfYp9mF2LHYr9in2K8nLCAn2LTZh9ix24zZiNixJywgJ9mF2YfYsScsICfYotio2KfZhicsICfYotiw2LEnLCAn2K/bjCcsICfYqNmH2YXZhicsICfYp9iz2YHZhtivJ10sXG4gIEFCQlJfREFZUzogWyfbsdi0JywgJ9uy2LQnLCAn27PYtCcsICfbtNi0JywgJ9u12LQnLCAn2KwnLCAn2LQnXSxcbiAgREFZU19OQU1FUzogWyfbjNqp2LTZhtio2YcnLCAn2K/ZiNi02YbYqNmHJywgJ9iz2YfigIzYtNmG2KjZhycsICfahtmH2KfYsdi02YbYqNmHJywgJ9m+2YbYrOKAjNi02YbYqNmHJywgJ9is2YXYudmHJywgJ9i02YbYqNmHJ10sXG4gIEdSRUdPUklBTl9FUE9DSDogMTcyMTQyNS41LFxuICBQRVJTSUFOX0VQT0NIOiAxOTQ4MzIwLjVcbn07XG4iLCJpbXBvcnQgeyBtb2QgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgR1JFR09SSUFOX0VQT0NILCBQRVJTSUFOX0VQT0NIIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXIge1xuICAvLyAgTEVBUF9HUkVHT1JJQU4gIC0tICBJcyBhIGdpdmVuIHllYXIgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciBhIGxlYXAgeWVhcj9cbiAgc3RhdGljIGxlYXBHcmVnb3JpYW4oeWVhcikge1xuICAgIHJldHVybiAoKHllYXIgJSA0KSA9PT0gMClcbiAgICAgICYmICghKCgoeWVhciAlIDEwMCkgPT09IDApICYmICgoeWVhciAlIDQwMCkgIT09IDApKSk7XG4gIH1cblxuICAvLyBHUkVHT1JJQU5fVE9fSkQgIC0tICBEZXRlcm1pbmUgSnVsaWFuIGRheSBudW1iZXIgZnJvbSBHcmVnb3JpYW4gY2FsZW5kYXIgZGF0ZVxuICBzdGF0aWMgZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGxldCBwYWQ7XG4gICAgaWYgKG1vbnRoIDw9IDIpIHtcbiAgICAgIHBhZCA9IDA7XG4gICAgfSBlbHNlIGlmIChDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSkge1xuICAgICAgcGFkID0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZCA9IC0yO1xuICAgIH1cblxuICAgIHJldHVybiAoR1JFR09SSUFOX0VQT0NIIC0gMSlcbiAgICAgICsgKDM2NSAqICh5ZWFyIC0gMSkpXG4gICAgICArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpXG4gICAgICArICgtTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSlcbiAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKVxuICAgICAgKyBNYXRoLmZsb29yKCgoKDM2NyAqIG1vbnRoKSAtIDM2MikgLyAxMikgKyAocGFkICsgZGF5KSk7XG4gIH1cblxuICAvLyAgSkRfVE9fR1JFR09SSUFOICAtLSAgQ2FsY3VsYXRlIEdyZWdvcmlhbiBjYWxlbmRhciBkYXRlIGZyb20gSnVsaWFuIGRheVxuICBzdGF0aWMganVsaWFuVG9HcmVnb3JpYW4oamQpIHtcbiAgICBjb25zdCB3amQgPSBNYXRoLmZsb29yKGpkIC0gMC41KSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0g7XG4gICAgY29uc3QgcXVhZHJpY2VudCA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTQ2MDk3KTtcbiAgICBjb25zdCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpO1xuICAgIGNvbnN0IGNlbnQgPSBNYXRoLmZsb29yKGRxYyAvIDM2NTI0KTtcbiAgICBjb25zdCBkY2VudCA9IG1vZChkcWMsIDM2NTI0KTtcbiAgICBjb25zdCBxdWFkID0gTWF0aC5mbG9vcihkY2VudCAvIDE0NjEpO1xuICAgIGNvbnN0IGRxdWFkID0gbW9kKGRjZW50LCAxNDYxKTtcbiAgICBjb25zdCB5aW5kZXggPSBNYXRoLmZsb29yKGRxdWFkIC8gMzY1KTtcbiAgICBsZXQgeWVhciA9IChxdWFkcmljZW50ICogNDAwKSArIChjZW50ICogMTAwKSArIChxdWFkICogNCkgKyB5aW5kZXg7XG4gICAgaWYgKCEoKGNlbnQgPT09IDQpIHx8ICh5aW5kZXggPT09IDQpKSkgeyB5ZWFyICs9IDE7IH1cbiAgICBjb25zdCB5ZWFyZGF5ID0gd2pkIC0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIDEsIDEpO1xuICAgIGxldCBsZWFwYWRqO1xuICAgIGlmICh3amQgPCBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgMywgMSkpIHtcbiAgICAgIGxlYXBhZGogPSAwO1xuICAgIH0gZWxzZSBpZiAoQ29udmVydGVyLmxlYXBHcmVnb3JpYW4oeWVhcikgPyAxIDogMikge1xuICAgICAgbGVhcGFkaiA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlYXBhZGogPSAyO1xuICAgIH1cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKCgoeWVhcmRheSArIGxlYXBhZGopICogMTIpICsgMzczKSAvIDM2Nyk7XG4gICAgY29uc3QgZGF5ID0gKHdqZCAtIENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgMSkpICsgMTtcblxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV07XG4gIH1cblxuICAvLyAgTEVBUF9QRVJTSUFOICAtLSAgSXMgYSBnaXZlbiB5ZWFyIGEgbGVhcCB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyID9cbiAgc3RhdGljIGxlYXBQZXJzaWFuKHllYXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKCgoKCh5ZWFyIC0gKCh5ZWFyID4gMCkgPyA0NzQgOiA0NzMpKSAlIDI4MjApICsgNDc0KSArIDM4KSAqIDY4MikgJSAyODE2XG4gICAgKSA8IDY4MjtcbiAgfVxuXG4gIC8vICBQRVJTSUFOX1RPX0pEICAtLSAgRGV0ZXJtaW5lIEp1bGlhbiBkYXkgZnJvbSBQZXJzaWFuIGRhdGVcbiAgc3RhdGljIHBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QgZXBiYXNlID0geWVhciAtICgoeWVhciA+PSAwKSA/IDQ3NCA6IDQ3Myk7XG4gICAgY29uc3QgZXB5ZWFyID0gNDc0ICsgbW9kKGVwYmFzZSwgMjgyMCk7XG5cbiAgICByZXR1cm4gZGF5XG4gICAgICArICgobW9udGggPD0gNylcbiAgICAgICAgPyAoKG1vbnRoIC0gMSkgKiAzMSlcbiAgICAgICAgOiAoKChtb250aCAtIDEpICogMzApICsgNilcbiAgICAgIClcbiAgICAgICsgTWF0aC5mbG9vcigoKGVweWVhciAqIDY4MikgLSAxMTApIC8gMjgxNilcbiAgICAgICsgKChlcHllYXIgLSAxKSAqIDM2NSlcbiAgICAgICsgKE1hdGguZmxvb3IoZXBiYXNlIC8gMjgyMCkgKiAxMDI5OTgzKSArIChQRVJTSUFOX0VQT0NIIC0gMSk7XG4gIH1cblxuICAvLyAgSkRfVE9fUEVSU0lBTiAgLS0gIENhbGN1bGF0ZSBQZXJzaWFuIGRhdGUgZnJvbSBKdWxpYW4gZGF5XG4gIHN0YXRpYyBqdWxpYW5Ub1BlcnNpYW4oamQpIHtcbiAgICBjb25zdCBuamQgPSBNYXRoLmZsb29yKGpkKSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSBuamQgLSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKDQ3NSwgMSwgMSk7XG4gICAgY29uc3QgY3ljbGUgPSBNYXRoLmZsb29yKGRlcG9jaCAvIDEwMjk5ODMpO1xuICAgIGNvbnN0IGN5ZWFyID0gbW9kKGRlcG9jaCwgMTAyOTk4Myk7XG4gICAgbGV0IHljeWNsZTtcbiAgICBpZiAoY3llYXIgPT09IDEwMjk5ODIpIHtcbiAgICAgIHljeWNsZSA9IDI4MjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF1eDEgPSBNYXRoLmZsb29yKGN5ZWFyIC8gMzY2KTtcbiAgICAgIGNvbnN0IGF1eDIgPSBtb2QoY3llYXIsIDM2Nik7XG4gICAgICB5Y3ljbGUgPSBNYXRoLmZsb29yKCgoMjEzNCAqIGF1eDEpICsgKDI4MTYgKiBhdXgyKSArIDI4MTUpIC8gMTAyODUyMilcbiAgICAgICAgKyBhdXgxICsgMTtcbiAgICB9XG4gICAgbGV0IHllYXIgPSB5Y3ljbGUgKyAoMjgyMCAqIGN5Y2xlKSArIDQ3NDtcbiAgICBpZiAoeWVhciA8PSAwKSB7XG4gICAgICB5ZWFyIC09IDE7XG4gICAgfVxuICAgIGNvbnN0IHlkYXkgPSAobmpkIC0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCAxLCAxKSkgKyAxO1xuICAgIGNvbnN0IG1vbnRoID0gKHlkYXkgPD0gMTg2KSA/IE1hdGguY2VpbCh5ZGF5IC8gMzEpIDogTWF0aC5jZWlsKCh5ZGF5IC0gNikgLyAzMCk7XG4gICAgY29uc3QgZGF5ID0gKG5qZCAtIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIDEpKSArIDE7XG5cbiAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldO1xuICB9XG5cbiAgc3RhdGljIHBlcnNpYW5Ub0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QganVsaWFuID0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9HcmVnb3JpYW4oanVsaWFuKTtcbiAgfVxuXG4gIHN0YXRpYyBncmVnb3JpYW5Ub1BlcnNpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGp1bGlhbiA9IENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9QZXJzaWFuKGp1bGlhbik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmltcG9ydCB7XG4gIE1PTlRIX05BTUVTLFxuICBBQkJSX0RBWVMsXG4gIERBWVNfTkFNRVNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2KGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoYSAvIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSAoTWF0aC5mbG9vcihhIC8gYikgKiBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeE1vbnRoKHllYXIsIG1vbnRoKSB7XG4gIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDw9IDApIHtcbiAgICBjb25zdCB5ZWFyRGlmZiA9IE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gICAgY29uc3QgbmV3WWVhciA9IHllYXIgLSB5ZWFyRGlmZjtcbiAgICBjb25zdCBuZXdNb250aCA9IG1vbnRoIC0gKHllYXJEaWZmICogMTIpO1xuXG4gICAgcmV0dXJuIFtuZXdZZWFyLCBuZXdNb250aF07XG4gIH1cblxuICByZXR1cm4gW3llYXIsIG1vbnRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm9MZWFkaW5nKHN0cikge1xuICBpZiAoc3RyICYmIHN0ci5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGAwJHtzdHJ9YDsgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVllYXIoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9beVldKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ1lZWVknOlxuICAgIGNhc2UgJ1lZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RnVsbFllYXIoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoXG4gICAgICAgIHN0ci5yZXBsYWNlKG1hdGNoLCBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgyKSksIGRhdGVcbiAgICAgICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTW9udGgoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bbU1dKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ00nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXRNb250aCgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdNb250aCA9IHplcm9MZWFkaW5nKGRhdGUuZ2V0TW9udGgoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKHN0ci5yZXBsYWNlKG1hdGNoLCB6ZXJvTGVhZGluZ01vbnRoKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NTSc6XG4gICAgY2FzZSAnTU1NTSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKFxuICAgICAgICBzdHIucmVwbGFjZShtYXRjaCwgTU9OVEhfTkFNRVNbZGF0ZS5nZXRNb250aCgpIC0gMV0pLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZURheShzdHIsIGRhdGUpIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL1tkRF0rLyk7XG4gIGlmICghbWF0Y2gpIHsgcmV0dXJuIHN0cjsgfVxuICBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgY2FzZSAnRCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXREYXRlKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnREQnOiB7XG4gICAgICBjb25zdCB6ZXJvTGVhZGluZ0RhdGUgPSB6ZXJvTGVhZGluZyhkYXRlLmdldERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdEYXRlKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2QnOlxuICAgIGNhc2UgJ2RkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBBQkJSX0RBWVNbZGF0ZS5nZXREYXkoKV0pLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnZGRkJzpcbiAgICBjYXNlICdkZGRkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBEQVlTX05BTUVTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FyYXNobS9KRGF0ZVxuICogQGF1dGhvcjogQXJhc2ggTW91c2F2aVxuICogQHZlcnNpb246IDEuMC4wXG4gKi9cblxuaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpEYXRlIHtcbiAgY29uc3RydWN0b3IoaW5wdXQgPSBuZXcgRGF0ZSgpKSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgdGhpcy5kYXRlID0gaW5wdXQubWFwKChudW0pID0+IHBhcnNlSW50KG51bSwgMTApKTtcbiAgICAgIHRoaXMuX2QgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG4gICAgfSBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHRoaXMuX2QgPSBpbnB1dDtcbiAgICAgIHRoaXMuZGF0ZSA9IEpEYXRlLnRvSmFsYWxpKHRoaXMuaW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIENvdmVydHMgYSBHcmVnb3JpYW4gZGF0ZSB0byBKYWxhbGkgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW1zIHtEYXRlfSBkYXRlXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHRvSmFsYWxpKGRhdGUpIHtcbiAgICBjb25zdCBqdWxpYW5EYXRlID0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKFxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICk7XG4gICAgY29uc3QgamRhdGUgPSBDb252ZXJ0ZXIuanVsaWFuVG9QZXJzaWFuKGp1bGlhbkRhdGUpO1xuXG4gICAgcmV0dXJuIGpkYXRlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBzdGF0aWMgdG9famFsYWxpKGRhdGUpIHsgcmV0dXJuIEpEYXRlLnRvSmFsYWxpKGRhdGUpOyB9XG5cbiAgLypcbiAgICogY29udmVydHMgYSBKYWxhbGkgZGF0ZSB0byBHcmVnb3JpYW5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGhcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBkYXlcbiAgICogQHJldHVybiB7RGF0ZX1cbiAgICovXG4gIHN0YXRpYyB0b0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QgZ2RhdGUgPSBDb252ZXJ0ZXIuanVsaWFuVG9HcmVnb3JpYW4oXG4gICAgICBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKHllYXIsIG1vbnRoLCBkYXkpXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgRGF0ZShnZGF0ZVswXSwgZ2RhdGVbMV0gLSAxLCBnZGF0ZVsyXSk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXRpYyB0b19ncmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSkgeyByZXR1cm4gSkRhdGUudG9HcmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSk7IH1cblxuICAvKlxuICAgKiBDaGVja3MgaWYgYSBnaXZlbiB5ZWFyIGlzIGEgbGVhcCB5ZWFyIG9yIG5vdFxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0xlYXBZZWFyKHllYXIpIHtcbiAgICByZXR1cm4gQ29udmVydGVyLmxlYXBQZXJzaWFuKHllYXIpO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyBtb250aCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IG1vbnRoIHplcm8gYmFzZWRcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgc3RhdGljIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XG4gICAgbGV0IGNhbGNlZFllYXIgPSB5ZWFyIC0gTWF0aC5mbG9vcihtb250aCAvIDEyKTtcbiAgICBsZXQgY2FsY2VkTW9udGggPSBtb250aCAtIChNYXRoLmZsb29yKG1vbnRoIC8gMTIpICogMTIpO1xuXG4gICAgaWYgKGNhbGNlZE1vbnRoIDwgMCkge1xuICAgICAgY2FsY2VkTW9udGggKz0gMTI7XG4gICAgICBjYWxjZWRZZWFyIC09IDE7XG4gICAgfSBlbHNlIGlmIChjYWxjZWRNb250aCA9PT0gMCkge1xuICAgICAgY2FsY2VkTW9udGggPSAxMjtcbiAgICB9XG5cbiAgICBpZiAoY2FsY2VkTW9udGggPCA2KSB7XG4gICAgICByZXR1cm4gMzE7XG4gICAgfSBpZiAoY2FsY2VkTW9udGggPCAxMSkge1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH0gaWYgKEpEYXRlLmlzTGVhcFllYXIoY2FsY2VkWWVhcikpIHtcbiAgICAgIHJldHVybiAzMDtcbiAgICB9XG4gICAgcmV0dXJuIDI5O1xuICB9XG5cbiAgLypcbiAgICogQ29udmVydHMgSkRhdGUgZGF0ZSB0byBHcmVnb3JpYW5cbiAgICovXG4gIHRvR3JlZ29yaWFuKCkge1xuICAgIHJldHVybiBKRGF0ZS50b0dyZWdvcmlhbih0aGlzLmRhdGVbMF0sIHRoaXMuZGF0ZVsxXSwgdGhpcy5kYXRlWzJdKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNob3dzIEphbGFsaSdzIGZ1bGwgeWVhciwgZXg6IDEzOTNcbiAgICpcbiAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICovXG4gIGdldEZ1bGxZZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMF07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIHRoZSBKYWxhbGkgZnVsbCB5ZWFyXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcmV0dXJuIHtKRGF0ZX1cbiAgICovXG4gIHNldEZ1bGxZZWFyKHllYXIpIHtcbiAgICB0aGlzLmRhdGVbMF0gPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFNob3dzIEphbGFsaSBtb250aCBudW1iZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gSmFsYWxpIG1vbnRoIG51bWJlclxuICAgKi9cbiAgZ2V0TW9udGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVsxXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgdGhlIEphbGFsaSBtb250aCBudW1iZXIuIEFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCAxMVxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IG1vbnRoXG4gICAqIEByZXR1cm5zIHtKRGF0ZX1cbiAgICovXG4gIHNldE1vbnRoKG1vbnRoKSB7XG4gICAgY29uc3QgZml4ZWQgPSBoZWxwZXJzLmZpeE1vbnRoKHRoaXMuZ2V0RnVsbFllYXIoKSwgcGFyc2VJbnQobW9udGgsIDEwKSk7XG4gICAgdGhpcy5kYXRlWzBdID0gZml4ZWRbMF07XG4gICAgdGhpcy5kYXRlWzFdID0gZml4ZWRbMV07XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIGRheSBudW1iZXIuIEEgbnVtYmVyIGJldHdlZW4gMCB0byAzMVxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBkYXkgbnVtYmVyXG4gICAqL1xuICBnZXREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMl07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIEphbGFsaSBkYXkgbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gMzFcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBkYXRlXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RGF0ZShkYXRlKSB7XG4gICAgdGhpcy5kYXRlWzJdID0gcGFyc2VJbnQoZGF0ZSwgMTApO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgdGhlIHNwZWNpZmllZCBkYXRlLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gNlxuICAgKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0RGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9kLmdldERheSgpO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyBhIGZvcm1hdGVkIG91dHB1dCBvZiBjdXJyZW50IGRhdGVcbiAgICpcbiAgICogQHBhcmFtcyB7U3RyaW5nfSBmb3JtYXRcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZm9ybWF0KGZvcm1hdCkge1xuICAgIGxldCByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VZZWFyKGZvcm1hdCwgdGhpcyk7XG4gICAgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlTW9udGgocmVzdWx0LCB0aGlzKTtcbiAgICByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VEYXkocmVzdWx0LCB0aGlzKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=