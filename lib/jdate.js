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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

      var _fixed = _slicedToArray(fixed, 2);

      this.date[0] = _fixed[0];
      this.date[1] = _fixed[1];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2pkYXRlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJNT05USF9OQU1FUyIsIkFCQlJfREFZUyIsIkRBWVNfTkFNRVMiLCJHUkVHT1JJQU5fRVBPQ0giLCJQRVJTSUFOX0VQT0NIIiwiQ29udmVydGVyIiwieWVhciIsIm1vbnRoIiwiZGF5IiwicGFkIiwibGVhcEdyZWdvcmlhbiIsIk1hdGgiLCJmbG9vciIsImpkIiwid2pkIiwiZGVwb2NoIiwicXVhZHJpY2VudCIsImRxYyIsIm1vZCIsImNlbnQiLCJkY2VudCIsInF1YWQiLCJkcXVhZCIsInlpbmRleCIsInllYXJkYXkiLCJncmVnb3JpYW5Ub0p1bGlhbiIsImxlYXBhZGoiLCJlcGJhc2UiLCJlcHllYXIiLCJuamQiLCJwZXJzaWFuVG9KdWxpYW4iLCJjeWNsZSIsImN5ZWFyIiwieWN5Y2xlIiwiYXV4MSIsImF1eDIiLCJ5ZGF5IiwiY2VpbCIsImp1bGlhbiIsImp1bGlhblRvR3JlZ29yaWFuIiwianVsaWFuVG9QZXJzaWFuIiwiZGl2IiwiYSIsImIiLCJmaXhNb250aCIsInllYXJEaWZmIiwibmV3WWVhciIsIm5ld01vbnRoIiwiemVyb0xlYWRpbmciLCJzdHIiLCJsZW5ndGgiLCJyZXBsYWNlWWVhciIsImRhdGUiLCJtYXRjaCIsInZhbHVlIiwicmVwbGFjZSIsImdldEZ1bGxZZWFyIiwiU3RyaW5nIiwic2xpY2UiLCJyZXBsYWNlTW9udGgiLCJnZXRNb250aCIsInplcm9MZWFkaW5nTW9udGgiLCJ0b1N0cmluZyIsInJlcGxhY2VEYXkiLCJnZXREYXRlIiwiemVyb0xlYWRpbmdEYXRlIiwiZ2V0RGF5IiwiSkRhdGUiLCJpbnB1dCIsIkRhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJudW0iLCJwYXJzZUludCIsIl9kIiwidG9HcmVnb3JpYW4iLCJ0b0phbGFsaSIsImZpeGVkIiwiaGVscGVycyIsImZvcm1hdCIsInJlc3VsdCIsImp1bGlhbkRhdGUiLCJqZGF0ZSIsImdkYXRlIiwibGVhcFBlcnNpYW4iLCJjYWxjZWRZZWFyIiwiY2FsY2VkTW9udGgiLCJpc0xlYXBZZWFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsYUFBVyxFQUFFLENBQUMsU0FBRCxFQUFZLFVB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S0FBSyxDQUFwQixFQUF1QjtBQUM1QkEsbUJBQVcsR0FBRyxFQUFkO0FBQ0Q7O0FBRUQsVUFBSUEsV0FBVyxHQUFHLENBQWxCLEVBQXFCO0FBQ25CLGVBQU8sRUFBUDtBQUNEOztBQUFDLFVBQUlBLFdBQVcsR0FBRyxFQUFsQixFQUFzQjtBQUN0QixlQUFPLEVBQVA7QUFDRDs7QUFBQyxVQUFJcEIsS0FBSyxDQUFDcUIsVUFBTixDQUFpQkYsVUFBakIsQ0FBSixFQUFrQztBQUNsQyxlQUFPLEVBQVA7QUFDRDs7QUFDRCxhQUFPLEVBQVA7QUFDRCIsImZpbGUiOiJqZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiSkRhdGVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiSkRhdGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSkRhdGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qZGF0ZS5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNT05USF9OQU1FUzogWyfZgdix2YjYsdiv24zZhicsICfYp9ix2K/bjNio2YfYtNiqJywgJ9iu2LHYr9in2K8nLCAn2KrbjNixJywgJ9in2YXYsdiv2KfYrycsICfYtNmH2LHbjNmI2LEnLCAn2YXZh9ixJywgJ9ii2KjYp9mGJywgJ9ii2LDYsScsICfYr9uMJywgJ9io2YfZhdmGJywgJ9in2LPZgdmG2K8nXSxcbiAgQUJCUl9EQVlTOiBbJ9ux2LQnLCAn27LYtCcsICfbs9i0JywgJ9u02LQnLCAn27XYtCcsICfYrCcsICfYtCddLFxuICBEQVlTX05BTUVTOiBbJ9uM2qnYtNmG2KjZhycsICfYr9mI2LTZhtio2YcnLCAn2LPZh+KAjNi02YbYqNmHJywgJ9qG2YfYp9ix2LTZhtio2YcnLCAn2b7Zhtis4oCM2LTZhtio2YcnLCAn2KzZhdi52YcnLCAn2LTZhtio2YcnXSxcbiAgR1JFR09SSUFOX0VQT0NIOiAxNzIxNDI1LjUsXG4gIFBFUlNJQU5fRVBPQ0g6IDE5NDgzMjAuNVxufTtcbiIsImltcG9ydCB7IG1vZCB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBHUkVHT1JJQU5fRVBPQ0gsIFBFUlNJQU5fRVBPQ0ggfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnZlcnRlciB7XG4gIC8vICBMRUFQX0dSRUdPUklBTiAgLS0gIElzIGEgZ2l2ZW4geWVhciBpbiB0aGUgR3JlZ29yaWFuIGNhbGVuZGFyIGEgbGVhcCB5ZWFyP1xuICBzdGF0aWMgbGVhcEdyZWdvcmlhbih5ZWFyKSB7XG4gICAgcmV0dXJuICgoeWVhciAlIDQpID09PSAwKVxuICAgICAgJiYgKCEoKCh5ZWFyICUgMTAwKSA9PT0gMCkgJiYgKCh5ZWFyICUgNDAwKSAhPT0gMCkpKTtcbiAgfVxuXG4gIC8vIEdSRUdPUklBTl9UT19KRCAgLS0gIERldGVybWluZSBKdWxpYW4gZGF5IG51bWJlciBmcm9tIEdyZWdvcmlhbiBjYWxlbmRhciBkYXRlXG4gIHN0YXRpYyBncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgbGV0IHBhZDtcbiAgICBpZiAobW9udGggPD0gMikge1xuICAgICAgcGFkID0gMDtcbiAgICB9IGVsc2UgaWYgKENvbnZlcnRlci5sZWFwR3JlZ29yaWFuKHllYXIpKSB7XG4gICAgICBwYWQgPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFkID0gLTI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChHUkVHT1JJQU5fRVBPQ0ggLSAxKVxuICAgICAgKyAoMzY1ICogKHllYXIgLSAxKSlcbiAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNClcbiAgICAgICsgKC1NYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApKVxuICAgICAgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApXG4gICAgICArIE1hdGguZmxvb3IoKCgoMzY3ICogbW9udGgpIC0gMzYyKSAvIDEyKSArIChwYWQgKyBkYXkpKTtcbiAgfVxuXG4gIC8vICBKRF9UT19HUkVHT1JJQU4gIC0tICBDYWxjdWxhdGUgR3JlZ29yaWFuIGNhbGVuZGFyIGRhdGUgZnJvbSBKdWxpYW4gZGF5XG4gIHN0YXRpYyBqdWxpYW5Ub0dyZWdvcmlhbihqZCkge1xuICAgIGNvbnN0IHdqZCA9IE1hdGguZmxvb3IoamQgLSAwLjUpICsgMC41O1xuICAgIGNvbnN0IGRlcG9jaCA9IHdqZCAtIEdSRUdPUklBTl9FUE9DSDtcbiAgICBjb25zdCBxdWFkcmljZW50ID0gTWF0aC5mbG9vcihkZXBvY2ggLyAxNDYwOTcpO1xuICAgIGNvbnN0IGRxYyA9IG1vZChkZXBvY2gsIDE0NjA5Nyk7XG4gICAgY29uc3QgY2VudCA9IE1hdGguZmxvb3IoZHFjIC8gMzY1MjQpO1xuICAgIGNvbnN0IGRjZW50ID0gbW9kKGRxYywgMzY1MjQpO1xuICAgIGNvbnN0IHF1YWQgPSBNYXRoLmZsb29yKGRjZW50IC8gMTQ2MSk7XG4gICAgY29uc3QgZHF1YWQgPSBtb2QoZGNlbnQsIDE0NjEpO1xuICAgIGNvbnN0IHlpbmRleCA9IE1hdGguZmxvb3IoZHF1YWQgLyAzNjUpO1xuICAgIGxldCB5ZWFyID0gKHF1YWRyaWNlbnQgKiA0MDApICsgKGNlbnQgKiAxMDApICsgKHF1YWQgKiA0KSArIHlpbmRleDtcbiAgICBpZiAoISgoY2VudCA9PT0gNCkgfHwgKHlpbmRleCA9PT0gNCkpKSB7IHllYXIgKz0gMTsgfVxuICAgIGNvbnN0IHllYXJkYXkgPSB3amQgLSBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgMSwgMSk7XG4gICAgbGV0IGxlYXBhZGo7XG4gICAgaWYgKHdqZCA8IENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCAzLCAxKSkge1xuICAgICAgbGVhcGFkaiA9IDA7XG4gICAgfSBlbHNlIGlmIChDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSA/IDEgOiAyKSB7XG4gICAgICBsZWFwYWRqID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVhcGFkaiA9IDI7XG4gICAgfVxuICAgIGNvbnN0IG1vbnRoID0gTWF0aC5mbG9vcigoKCh5ZWFyZGF5ICsgbGVhcGFkaikgKiAxMikgKyAzNzMpIC8gMzY3KTtcbiAgICBjb25zdCBkYXkgPSAod2pkIC0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIG1vbnRoLCAxKSkgKyAxO1xuXG4gICAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XTtcbiAgfVxuXG4gIC8vICBMRUFQX1BFUlNJQU4gIC0tICBJcyBhIGdpdmVuIHllYXIgYSBsZWFwIHllYXIgaW4gdGhlIFBlcnNpYW4gY2FsZW5kYXIgP1xuICBzdGF0aWMgbGVhcFBlcnNpYW4oeWVhcikge1xuICAgIHJldHVybiAoXG4gICAgICAoKCgoKHllYXIgLSAoKHllYXIgPiAwKSA/IDQ3NCA6IDQ3MykpICUgMjgyMCkgKyA0NzQpICsgMzgpICogNjgyKSAlIDI4MTZcbiAgICApIDwgNjgyO1xuICB9XG5cbiAgLy8gIFBFUlNJQU5fVE9fSkQgIC0tICBEZXRlcm1pbmUgSnVsaWFuIGRheSBmcm9tIFBlcnNpYW4gZGF0ZVxuICBzdGF0aWMgcGVyc2lhblRvSnVsaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBlcGJhc2UgPSB5ZWFyIC0gKCh5ZWFyID49IDApID8gNDc0IDogNDczKTtcbiAgICBjb25zdCBlcHllYXIgPSA0NzQgKyBtb2QoZXBiYXNlLCAyODIwKTtcblxuICAgIHJldHVybiBkYXlcbiAgICAgICsgKChtb250aCA8PSA3KVxuICAgICAgICA/ICgobW9udGggLSAxKSAqIDMxKVxuICAgICAgICA6ICgoKG1vbnRoIC0gMSkgKiAzMCkgKyA2KVxuICAgICAgKVxuICAgICAgKyBNYXRoLmZsb29yKCgoZXB5ZWFyICogNjgyKSAtIDExMCkgLyAyODE2KVxuICAgICAgKyAoKGVweWVhciAtIDEpICogMzY1KVxuICAgICAgKyAoTWF0aC5mbG9vcihlcGJhc2UgLyAyODIwKSAqIDEwMjk5ODMpICsgKFBFUlNJQU5fRVBPQ0ggLSAxKTtcbiAgfVxuXG4gIC8vICBKRF9UT19QRVJTSUFOICAtLSAgQ2FsY3VsYXRlIFBlcnNpYW4gZGF0ZSBmcm9tIEp1bGlhbiBkYXlcbiAgc3RhdGljIGp1bGlhblRvUGVyc2lhbihqZCkge1xuICAgIGNvbnN0IG5qZCA9IE1hdGguZmxvb3IoamQpICsgMC41O1xuICAgIGNvbnN0IGRlcG9jaCA9IG5qZCAtIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oNDc1LCAxLCAxKTtcbiAgICBjb25zdCBjeWNsZSA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTAyOTk4Myk7XG4gICAgY29uc3QgY3llYXIgPSBtb2QoZGVwb2NoLCAxMDI5OTgzKTtcbiAgICBsZXQgeWN5Y2xlO1xuICAgIGlmIChjeWVhciA9PT0gMTAyOTk4Mikge1xuICAgICAgeWN5Y2xlID0gMjgyMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXV4MSA9IE1hdGguZmxvb3IoY3llYXIgLyAzNjYpO1xuICAgICAgY29uc3QgYXV4MiA9IG1vZChjeWVhciwgMzY2KTtcbiAgICAgIHljeWNsZSA9IE1hdGguZmxvb3IoKCgyMTM0ICogYXV4MSkgKyAoMjgxNiAqIGF1eDIpICsgMjgxNSkgLyAxMDI4NTIyKVxuICAgICAgICArIGF1eDEgKyAxO1xuICAgIH1cbiAgICBsZXQgeWVhciA9IHljeWNsZSArICgyODIwICogY3ljbGUpICsgNDc0O1xuICAgIGlmICh5ZWFyIDw9IDApIHtcbiAgICAgIHllYXIgLT0gMTtcbiAgICB9XG4gICAgY29uc3QgeWRheSA9IChuamQgLSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKHllYXIsIDEsIDEpKSArIDE7XG4gICAgY29uc3QgbW9udGggPSAoeWRheSA8PSAxODYpID8gTWF0aC5jZWlsKHlkYXkgLyAzMSkgOiBNYXRoLmNlaWwoKHlkYXkgLSA2KSAvIDMwKTtcbiAgICBjb25zdCBkYXkgPSAobmpkIC0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgMSkpICsgMTtcblxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV07XG4gIH1cblxuICBzdGF0aWMgcGVyc2lhblRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBqdWxpYW4gPSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKHllYXIsIG1vbnRoLCBkYXkpO1xuXG4gICAgcmV0dXJuIENvbnZlcnRlci5qdWxpYW5Ub0dyZWdvcmlhbihqdWxpYW4pO1xuICB9XG5cbiAgc3RhdGljIGdyZWdvcmlhblRvUGVyc2lhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QganVsaWFuID0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIG1vbnRoLCBkYXkpO1xuXG4gICAgcmV0dXJuIENvbnZlcnRlci5qdWxpYW5Ub1BlcnNpYW4oanVsaWFuKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuaW1wb3J0IHtcbiAgTU9OVEhfTkFNRVMsXG4gIEFCQlJfREFZUyxcbiAgREFZU19OQU1FU1xufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXYoYSwgYikge1xuICByZXR1cm4gTWF0aC5mbG9vcihhIC8gYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2QoYSwgYikge1xuICByZXR1cm4gYSAtIChNYXRoLmZsb29yKGEgLyBiKSAqIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZml4TW9udGgoeWVhciwgbW9udGgpIHtcbiAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPD0gMCkge1xuICAgIGNvbnN0IHllYXJEaWZmID0gTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcbiAgICBjb25zdCBuZXdZZWFyID0geWVhciAtIHllYXJEaWZmO1xuICAgIGNvbnN0IG5ld01vbnRoID0gbW9udGggLSAoeWVhckRpZmYgKiAxMik7XG5cbiAgICByZXR1cm4gW25ld1llYXIsIG5ld01vbnRoXTtcbiAgfVxuXG4gIHJldHVybiBbeWVhciwgbW9udGhdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gemVyb0xlYWRpbmcoc3RyKSB7XG4gIGlmIChzdHIgJiYgc3RyLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gYDAke3N0cn1gOyB9XG4gIHJldHVybiBzdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlWWVhcihzdHIsIGRhdGUpIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL1t5WV0rLyk7XG4gIGlmICghbWF0Y2gpIHsgcmV0dXJuIHN0cjsgfVxuICBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgY2FzZSAnWVlZWSc6XG4gICAgY2FzZSAnWVlZJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlWWVhcihzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXRGdWxsWWVhcigpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ1lZJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlWWVhcihcbiAgICAgICAgc3RyLnJlcGxhY2UobWF0Y2gsIFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKDIpKSwgZGF0ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VNb250aChzdHIsIGRhdGUpIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL1ttTV0rLyk7XG4gIGlmICghbWF0Y2gpIHsgcmV0dXJuIHN0cjsgfVxuICBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgY2FzZSAnTSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKHN0ci5yZXBsYWNlKG1hdGNoLCBkYXRlLmdldE1vbnRoKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnTU0nOiB7XG4gICAgICBjb25zdCB6ZXJvTGVhZGluZ01vbnRoID0gemVyb0xlYWRpbmcoZGF0ZS5nZXRNb250aCgpLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlTW9udGgoc3RyLnJlcGxhY2UobWF0Y2gsIHplcm9MZWFkaW5nTW9udGgpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnTU1NJzpcbiAgICBjYXNlICdNTU1NJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlTW9udGgoXG4gICAgICAgIHN0ci5yZXBsYWNlKG1hdGNoLCBNT05USF9OQU1FU1tkYXRlLmdldE1vbnRoKCkgLSAxXSksIGRhdGVcbiAgICAgICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlRGF5KHN0ciwgZGF0ZSkge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvW2REXSsvKTtcbiAgaWYgKCFtYXRjaCkgeyByZXR1cm4gc3RyOyB9XG4gIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICBjYXNlICdEJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBkYXRlLmdldERhdGUoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdERCc6IHtcbiAgICAgIGNvbnN0IHplcm9MZWFkaW5nRGF0ZSA9IHplcm9MZWFkaW5nKGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCB6ZXJvTGVhZGluZ0RhdGUpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnZCc6XG4gICAgY2FzZSAnZGQnOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIEFCQlJfREFZU1tkYXRlLmdldERheSgpXSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdkZGQnOlxuICAgIGNhc2UgJ2RkZGQnOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIERBWVNfTkFNRVNbZGF0ZS5nZXREYXkoKV0pLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH1cbn1cbiIsIi8qXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJhc2htL0pEYXRlXG4gKiBAYXV0aG9yOiBBcmFzaCBNb3VzYXZpXG4gKiBAdmVyc2lvbjogMS4wLjBcbiAqL1xuXG5pbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkRhdGUge1xuICBjb25zdHJ1Y3RvcihpbnB1dCA9IG5ldyBEYXRlKCkpIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICB0aGlzLmRhdGUgPSBpbnB1dC5tYXAoKG51bSkgPT4gcGFyc2VJbnQobnVtLCAxMCkpO1xuICAgICAgdGhpcy5fZCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcbiAgICB9IGVsc2UgaWYgKGlucHV0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdGhpcy5fZCA9IGlucHV0O1xuICAgICAgdGhpcy5kYXRlID0gSkRhdGUudG9KYWxhbGkodGhpcy5pbnB1dCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQ292ZXJ0cyBhIEdyZWdvcmlhbiBkYXRlIHRvIEphbGFsaSBkYXRlXG4gICAqXG4gICAqIEBwYXJhbXMge0RhdGV9IGRhdGVcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgdG9KYWxhbGkoZGF0ZSkge1xuICAgIGNvbnN0IGp1bGlhbkRhdGUgPSBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBkYXRlLmdldE1vbnRoKCkgKyAxLFxuICAgICAgZGF0ZS5nZXREYXRlKCksXG4gICAgKTtcbiAgICBjb25zdCBqZGF0ZSA9IENvbnZlcnRlci5qdWxpYW5Ub1BlcnNpYW4oanVsaWFuRGF0ZSk7XG5cbiAgICByZXR1cm4gamRhdGU7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXRpYyB0b19qYWxhbGkoZGF0ZSkgeyByZXR1cm4gSkRhdGUudG9KYWxhbGkoZGF0ZSk7IH1cblxuICAvKlxuICAgKiBjb252ZXJ0cyBhIEphbGFsaSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IGRheVxuICAgKiBAcmV0dXJuIHtEYXRlfVxuICAgKi9cbiAgc3RhdGljIHRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBnZGF0ZSA9IENvbnZlcnRlci5qdWxpYW5Ub0dyZWdvcmlhbihcbiAgICAgIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKGdkYXRlWzBdLCBnZGF0ZVsxXSAtIDEsIGdkYXRlWzJdKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc3RhdGljIHRvX2dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7IHJldHVybiBKRGF0ZS50b0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KTsgfVxuXG4gIC8qXG4gICAqIENoZWNrcyBpZiBhIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXIgb3Igbm90XG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHJldHVybiBDb252ZXJ0ZXIubGVhcFBlcnNpYW4oeWVhcik7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIG1vbnRoIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGggemVybyBiYXNlZFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICBsZXQgY2FsY2VkWWVhciA9IHllYXIgLSBNYXRoLmZsb29yKG1vbnRoIC8gMTIpO1xuICAgIGxldCBjYWxjZWRNb250aCA9IG1vbnRoIC0gKE1hdGguZmxvb3IobW9udGggLyAxMikgKiAxMik7XG5cbiAgICBpZiAoY2FsY2VkTW9udGggPCAwKSB7XG4gICAgICBjYWxjZWRNb250aCArPSAxMjtcbiAgICAgIGNhbGNlZFllYXIgLT0gMTtcbiAgICB9IGVsc2UgaWYgKGNhbGNlZE1vbnRoID09PSAwKSB7XG4gICAgICBjYWxjZWRNb250aCA9IDEyO1xuICAgIH1cblxuICAgIGlmIChjYWxjZWRNb250aCA8IDYpIHtcbiAgICAgIHJldHVybiAzMTtcbiAgICB9IGlmIChjYWxjZWRNb250aCA8IDExKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBpZiAoSkRhdGUuaXNMZWFwWWVhcihjYWxjZWRZZWFyKSkge1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH1cbiAgICByZXR1cm4gMjk7XG4gIH1cblxuICAvKlxuICAgKiBDb252ZXJ0cyBKRGF0ZSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKi9cbiAgdG9HcmVnb3JpYW4oKSB7XG4gICAgcmV0dXJuIEpEYXRlLnRvR3JlZ29yaWFuKHRoaXMuZGF0ZVswXSwgdGhpcy5kYXRlWzFdLCB0aGlzLmRhdGVbMl0pO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpJ3MgZnVsbCB5ZWFyLCBleDogMTM5M1xuICAgKlxuICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgKi9cbiAgZ2V0RnVsbFllYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVswXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgdGhlIEphbGFsaSBmdWxsIHllYXJcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RnVsbFllYXIoeWVhcikge1xuICAgIHRoaXMuZGF0ZVswXSA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50b0dyZWdvcmlhbigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIG1vbnRoIG51bWJlci5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBKYWxhbGkgbW9udGggbnVtYmVyXG4gICAqL1xuICBnZXRNb250aCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzFdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyB0aGUgSmFsYWxpIG1vbnRoIG51bWJlci4gQW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDExXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGhcbiAgICogQHJldHVybnMge0pEYXRlfVxuICAgKi9cbiAgc2V0TW9udGgobW9udGgpIHtcbiAgICBjb25zdCBmaXhlZCA9IGhlbHBlcnMuZml4TW9udGgodGhpcy5nZXRGdWxsWWVhcigpLCBwYXJzZUludChtb250aCwgMTApKTtcbiAgICBbdGhpcy5kYXRlWzBdLCB0aGlzLmRhdGVbMV1dID0gZml4ZWQ7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIGRheSBudW1iZXIuIEEgbnVtYmVyIGJldHdlZW4gMCB0byAzMVxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBkYXkgbnVtYmVyXG4gICAqL1xuICBnZXREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMl07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIEphbGFsaSBkYXkgbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gMzFcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBkYXRlXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RGF0ZShkYXRlKSB7XG4gICAgdGhpcy5kYXRlWzJdID0gcGFyc2VJbnQoZGF0ZSwgMTApO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgdGhlIHNwZWNpZmllZCBkYXRlLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gNlxuICAgKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0RGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9kLmdldERheSgpO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyBhIGZvcm1hdGVkIG91dHB1dCBvZiBjdXJyZW50IGRhdGVcbiAgICpcbiAgICogQHBhcmFtcyB7U3RyaW5nfSBmb3JtYXRcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZm9ybWF0KGZvcm1hdCkge1xuICAgIGxldCByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VZZWFyKGZvcm1hdCwgdGhpcyk7XG4gICAgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlTW9udGgocmVzdWx0LCB0aGlzKTtcbiAgICByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VEYXkocmVzdWx0LCB0aGlzKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=