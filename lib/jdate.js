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
 */



var JDate =
/*#__PURE__*/
function () {
  function JDate() {
    _classCallCheck(this, JDate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (Array.isArray(args[0]) || args[0] instanceof Date) {
      this.input = args[0];
    } else if (args.length === 3) {
      this.input = args;
    } else if (!args.length) {
      this.input = new Date();
    } else {
      throw new Error('Unexpected input');
    }

    if (Array.isArray(this.input)) {
      this.date = this.input.map(function (num) {
        return parseInt(num, 10);
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2pkYXRlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJNT05USF9OQU1FUyIsIkFCQlJfREFZUyIsIkRBWVNfTkFNRVMiLCJHUkVHT1JJQU5fRVBPQ0giLCJQRVJTSUFOX0VQT0NIIiwiQ29udmVydGVyIiwieWVhciIsIm1vbnRoIiwiZGF5IiwicGFkIiwibGVhcEdyZWdvcmlhbiIsIk1hdGgiLCJmbG9vciIsImpkIiwid2pkIiwiZGVwb2NoIiwicXVhZHJpY2VudCIsImRxYyIsIm1vZCIsImNlbnQiLCJkY2VudCIsInF1YWQiLCJkcXVhZCIsInlpbmRleCIsInllYXJkYXkiLCJncmVnb3JpYW5Ub0p1bGlhbiIsImxlYXBhZGoiLCJlcGJhc2UiLCJlcHllYXIiLCJuamQiLCJwZXJzaWFuVG9KdWxpYW4iLCJjeWNsZSIsImN5ZWFyIiwieWN5Y2xlIiwiYXV4MSIsImF1eDIiLCJ5ZGF5IiwiY2VpbCIsImp1bGlhbiIsImp1bGlhblRvR3JlZ29yaWFuIiwianVsaWFuVG9QZXJzaWFuIiwiZGl2IiwiYSIsImIiLCJmaXhNb250aCIsInllYXJEaWZmIiwibmV3WWVhciIsIm5ld01vbnRoIiwiemVyb0xlYWRpbmciLCJzdHIiLCJsZW5ndGgiLCJyZXBsYWNlWWVhciIsImRhdGUiLCJtYXRjaCIsInZhbHVlIiwicmVwbGFjZSIsImdldEZ1bGxZZWFyIiwiU3RyaW5nIiwic2xpY2UiLCJyZXBsYWNlTW9udGgiLCJnZXRNb250aCIsInplcm9MZWFkaW5nTW9udGgiLCJ0b1N0cmluZyIsInJlcGxhY2VEYXkiLCJnZXREYXRlIiwiemVyb0xlYWRpbmdEYXRlIiwiZ2V0RGF5IiwiSkRhdGUiLCJhcmdzIiwiQXJyYXkiLCJpc0FycmF5IiwiRGF0ZSIsImlucHV0IiwiRXJyb3IiLCJtYXAiLCJudW0iLCJwYXJzZUludCIsIl9kIiwidG9HcmVnb3JpYW4iLCJ0b0phbGFsaSIsImZpeGVkIiwiaGVscGVycyIsImZvcm1hdCIsInJlc3VsdCIsImp1bGlhbkRhdGUiLCJqZGF0ZSIsImdkYXRlIiwibGVhcFBlcnNpYW4iLCJjYWxjZWRZZWFyIiwiY2FsY2VkTW9udGgiLCJpc0xlYXBZZWFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsYUFBVyxFQUFFLENB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QU07QUFDdEIsYUFBT0Qsa0RBQVMsQ0FBQ2tGLFdBQVYsQ0FBc0JqRixJQUF0QixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztnQ0FPbUJBLEksRUFBTUMsSyxFQUFPO0FBQzlCLFVBQUlpRixVQUFVLEdBQUdsRixJQUFJLEdBQUdLLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxLQUFLLEdBQUcsRUFBbkIsQ0FBeEI7QUFDQSxVQUFJa0YsV0FBVyxHQUFHbEYsS0FBSyxHQUFJSSxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsS0FBSyxHQUFHLEVBQW5CLElBQXlCLEVBQXBEOztBQUVBLFVBQUlrRixXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDbkJBLG1CQUFXLElBQUksRUFBZjtBQUNBRCxrQkFBVSxJQUFJLENBQWQ7QUFDRCxPQUhELE1BR08sSUFBSUMsV0FBVyxLQUFLLENBQXBCLEVBQXVCO0FBQzVCQSxtQkFBVyxHQUFHLEVBQWQ7QUFDRDs7QUFFRCxVQUFJQSxXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDbkIsZUFBTyxFQUFQO0FBQ0Q7O0FBQUMsVUFBSUEsV0FBVyxHQUFHLEVBQWxCLEVBQXNCO0FBQ3RCLGVBQU8sRUFBUDtBQUNEOztBQUFDLFVBQUl0QixLQUFLLENBQUN1QixVQUFOLENBQWlCRixVQUFqQixDQUFKLEVBQWtDO0FBQ2xDLGVBQU8sRUFBUDtBQUNEOztBQUNELGFBQU8sRUFBUDtBQUNEIiwiZmlsZSI6ImpkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJKRGF0ZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJKRGF0ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJKRGF0ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pkYXRlLmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1PTlRIX05BTUVTOiBbJ9mB2LHZiNix2K/bjNmGJywgJ9in2LHYr9uM2KjZh9i02KonLCAn2K7Ysdiv2KfYrycsICfYqtuM2LEnLCAn2KfZhdix2K/Yp9ivJywgJ9i02YfYsduM2YjYsScsICfZhdmH2LEnLCAn2KLYqNin2YYnLCAn2KLYsNixJywgJ9iv24wnLCAn2KjZh9mF2YYnLCAn2KfYs9mB2YbYryddLFxuICBBQkJSX0RBWVM6IFsn27HYtCcsICfbsti0JywgJ9uz2LQnLCAn27TYtCcsICfbtdi0JywgJ9isJywgJ9i0J10sXG4gIERBWVNfTkFNRVM6IFsn24zaqdi02YbYqNmHJywgJ9iv2YjYtNmG2KjZhycsICfYs9mH4oCM2LTZhtio2YcnLCAn2obZh9in2LHYtNmG2KjZhycsICfZvtmG2KzigIzYtNmG2KjZhycsICfYrNmF2LnZhycsICfYtNmG2KjZhyddLFxuICBHUkVHT1JJQU5fRVBPQ0g6IDE3MjE0MjUuNSxcbiAgUEVSU0lBTl9FUE9DSDogMTk0ODMyMC41XG59O1xuIiwiaW1wb3J0IHsgbW9kIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IEdSRUdPUklBTl9FUE9DSCwgUEVSU0lBTl9FUE9DSCB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udmVydGVyIHtcbiAgLy8gIExFQVBfR1JFR09SSUFOICAtLSAgSXMgYSBnaXZlbiB5ZWFyIGluIHRoZSBHcmVnb3JpYW4gY2FsZW5kYXIgYSBsZWFwIHllYXI/XG4gIHN0YXRpYyBsZWFwR3JlZ29yaWFuKHllYXIpIHtcbiAgICByZXR1cm4gKCh5ZWFyICUgNCkgPT09IDApXG4gICAgICAmJiAoISgoKHllYXIgJSAxMDApID09PSAwKSAmJiAoKHllYXIgJSA0MDApICE9PSAwKSkpO1xuICB9XG5cbiAgLy8gR1JFR09SSUFOX1RPX0pEICAtLSAgRGV0ZXJtaW5lIEp1bGlhbiBkYXkgbnVtYmVyIGZyb20gR3JlZ29yaWFuIGNhbGVuZGFyIGRhdGVcbiAgc3RhdGljIGdyZWdvcmlhblRvSnVsaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBsZXQgcGFkO1xuICAgIGlmIChtb250aCA8PSAyKSB7XG4gICAgICBwYWQgPSAwO1xuICAgIH0gZWxzZSBpZiAoQ29udmVydGVyLmxlYXBHcmVnb3JpYW4oeWVhcikpIHtcbiAgICAgIHBhZCA9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWQgPSAtMjtcbiAgICB9XG5cbiAgICByZXR1cm4gKEdSRUdPUklBTl9FUE9DSCAtIDEpXG4gICAgICArICgzNjUgKiAoeWVhciAtIDEpKVxuICAgICAgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KVxuICAgICAgKyAoLU1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkpXG4gICAgICArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMClcbiAgICAgICsgTWF0aC5mbG9vcigoKCgzNjcgKiBtb250aCkgLSAzNjIpIC8gMTIpICsgKHBhZCArIGRheSkpO1xuICB9XG5cbiAgLy8gIEpEX1RPX0dSRUdPUklBTiAgLS0gIENhbGN1bGF0ZSBHcmVnb3JpYW4gY2FsZW5kYXIgZGF0ZSBmcm9tIEp1bGlhbiBkYXlcbiAgc3RhdGljIGp1bGlhblRvR3JlZ29yaWFuKGpkKSB7XG4gICAgY29uc3Qgd2pkID0gTWF0aC5mbG9vcihqZCAtIDAuNSkgKyAwLjU7XG4gICAgY29uc3QgZGVwb2NoID0gd2pkIC0gR1JFR09SSUFOX0VQT0NIO1xuICAgIGNvbnN0IHF1YWRyaWNlbnQgPSBNYXRoLmZsb29yKGRlcG9jaCAvIDE0NjA5Nyk7XG4gICAgY29uc3QgZHFjID0gbW9kKGRlcG9jaCwgMTQ2MDk3KTtcbiAgICBjb25zdCBjZW50ID0gTWF0aC5mbG9vcihkcWMgLyAzNjUyNCk7XG4gICAgY29uc3QgZGNlbnQgPSBtb2QoZHFjLCAzNjUyNCk7XG4gICAgY29uc3QgcXVhZCA9IE1hdGguZmxvb3IoZGNlbnQgLyAxNDYxKTtcbiAgICBjb25zdCBkcXVhZCA9IG1vZChkY2VudCwgMTQ2MSk7XG4gICAgY29uc3QgeWluZGV4ID0gTWF0aC5mbG9vcihkcXVhZCAvIDM2NSk7XG4gICAgbGV0IHllYXIgPSAocXVhZHJpY2VudCAqIDQwMCkgKyAoY2VudCAqIDEwMCkgKyAocXVhZCAqIDQpICsgeWluZGV4O1xuICAgIGlmICghKChjZW50ID09PSA0KSB8fCAoeWluZGV4ID09PSA0KSkpIHsgeWVhciArPSAxOyB9XG4gICAgY29uc3QgeWVhcmRheSA9IHdqZCAtIENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCAxLCAxKTtcbiAgICBsZXQgbGVhcGFkajtcbiAgICBpZiAod2pkIDwgQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIDMsIDEpKSB7XG4gICAgICBsZWFwYWRqID0gMDtcbiAgICB9IGVsc2UgaWYgKENvbnZlcnRlci5sZWFwR3JlZ29yaWFuKHllYXIpID8gMSA6IDIpIHtcbiAgICAgIGxlYXBhZGogPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZWFwYWRqID0gMjtcbiAgICB9XG4gICAgY29uc3QgbW9udGggPSBNYXRoLmZsb29yKCgoKHllYXJkYXkgKyBsZWFwYWRqKSAqIDEyKSArIDM3MykgLyAzNjcpO1xuICAgIGNvbnN0IGRheSA9ICh3amQgLSBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIDEpKSArIDE7XG5cbiAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldO1xuICB9XG5cbiAgLy8gIExFQVBfUEVSU0lBTiAgLS0gIElzIGEgZ2l2ZW4geWVhciBhIGxlYXAgeWVhciBpbiB0aGUgUGVyc2lhbiBjYWxlbmRhciA/XG4gIHN0YXRpYyBsZWFwUGVyc2lhbih5ZWFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICgoKCgoeWVhciAtICgoeWVhciA+IDApID8gNDc0IDogNDczKSkgJSAyODIwKSArIDQ3NCkgKyAzOCkgKiA2ODIpICUgMjgxNlxuICAgICkgPCA2ODI7XG4gIH1cblxuICAvLyAgUEVSU0lBTl9UT19KRCAgLS0gIERldGVybWluZSBKdWxpYW4gZGF5IGZyb20gUGVyc2lhbiBkYXRlXG4gIHN0YXRpYyBwZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGVwYmFzZSA9IHllYXIgLSAoKHllYXIgPj0gMCkgPyA0NzQgOiA0NzMpO1xuICAgIGNvbnN0IGVweWVhciA9IDQ3NCArIG1vZChlcGJhc2UsIDI4MjApO1xuXG4gICAgcmV0dXJuIGRheVxuICAgICAgKyAoKG1vbnRoIDw9IDcpXG4gICAgICAgID8gKChtb250aCAtIDEpICogMzEpXG4gICAgICAgIDogKCgobW9udGggLSAxKSAqIDMwKSArIDYpXG4gICAgICApXG4gICAgICArIE1hdGguZmxvb3IoKChlcHllYXIgKiA2ODIpIC0gMTEwKSAvIDI4MTYpXG4gICAgICArICgoZXB5ZWFyIC0gMSkgKiAzNjUpXG4gICAgICArIChNYXRoLmZsb29yKGVwYmFzZSAvIDI4MjApICogMTAyOTk4MykgKyAoUEVSU0lBTl9FUE9DSCAtIDEpO1xuICB9XG5cbiAgLy8gIEpEX1RPX1BFUlNJQU4gIC0tICBDYWxjdWxhdGUgUGVyc2lhbiBkYXRlIGZyb20gSnVsaWFuIGRheVxuICBzdGF0aWMganVsaWFuVG9QZXJzaWFuKGpkKSB7XG4gICAgY29uc3QgbmpkID0gTWF0aC5mbG9vcihqZCkgKyAwLjU7XG4gICAgY29uc3QgZGVwb2NoID0gbmpkIC0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbig0NzUsIDEsIDEpO1xuICAgIGNvbnN0IGN5Y2xlID0gTWF0aC5mbG9vcihkZXBvY2ggLyAxMDI5OTgzKTtcbiAgICBjb25zdCBjeWVhciA9IG1vZChkZXBvY2gsIDEwMjk5ODMpO1xuICAgIGxldCB5Y3ljbGU7XG4gICAgaWYgKGN5ZWFyID09PSAxMDI5OTgyKSB7XG4gICAgICB5Y3ljbGUgPSAyODIwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhdXgxID0gTWF0aC5mbG9vcihjeWVhciAvIDM2Nik7XG4gICAgICBjb25zdCBhdXgyID0gbW9kKGN5ZWFyLCAzNjYpO1xuICAgICAgeWN5Y2xlID0gTWF0aC5mbG9vcigoKDIxMzQgKiBhdXgxKSArICgyODE2ICogYXV4MikgKyAyODE1KSAvIDEwMjg1MjIpXG4gICAgICAgICsgYXV4MSArIDE7XG4gICAgfVxuICAgIGxldCB5ZWFyID0geWN5Y2xlICsgKDI4MjAgKiBjeWNsZSkgKyA0NzQ7XG4gICAgaWYgKHllYXIgPD0gMCkge1xuICAgICAgeWVhciAtPSAxO1xuICAgIH1cbiAgICBjb25zdCB5ZGF5ID0gKG5qZCAtIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgMSwgMSkpICsgMTtcbiAgICBjb25zdCBtb250aCA9ICh5ZGF5IDw9IDE4NikgPyBNYXRoLmNlaWwoeWRheSAvIDMxKSA6IE1hdGguY2VpbCgoeWRheSAtIDYpIC8gMzApO1xuICAgIGNvbnN0IGRheSA9IChuamQgLSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKHllYXIsIG1vbnRoLCAxKSkgKyAxO1xuXG4gICAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XTtcbiAgfVxuXG4gIHN0YXRpYyBwZXJzaWFuVG9HcmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGp1bGlhbiA9IENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSk7XG5cbiAgICByZXR1cm4gQ29udmVydGVyLmp1bGlhblRvR3JlZ29yaWFuKGp1bGlhbik7XG4gIH1cblxuICBzdGF0aWMgZ3JlZ29yaWFuVG9QZXJzaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBqdWxpYW4gPSBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSk7XG5cbiAgICByZXR1cm4gQ29udmVydGVyLmp1bGlhblRvUGVyc2lhbihqdWxpYW4pO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5pbXBvcnQge1xuICBNT05USF9OQU1FUyxcbiAgQUJCUl9EQVlTLFxuICBEQVlTX05BTUVTXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpdihhLCBiKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKGEgLyBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vZChhLCBiKSB7XG4gIHJldHVybiBhIC0gKE1hdGguZmxvb3IoYSAvIGIpICogYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXhNb250aCh5ZWFyLCBtb250aCkge1xuICBpZiAobW9udGggPiAxMiB8fCBtb250aCA8PSAwKSB7XG4gICAgY29uc3QgeWVhckRpZmYgPSBNYXRoLmZsb29yKChtb250aCAtIDEpIC8gMTIpO1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyIC0geWVhckRpZmY7XG4gICAgY29uc3QgbmV3TW9udGggPSBtb250aCAtICh5ZWFyRGlmZiAqIDEyKTtcblxuICAgIHJldHVybiBbbmV3WWVhciwgbmV3TW9udGhdO1xuICB9XG5cbiAgcmV0dXJuIFt5ZWFyLCBtb250aF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvTGVhZGluZyhzdHIpIHtcbiAgaWYgKHN0ciAmJiBzdHIubGVuZ3RoID09PSAxKSB7IHJldHVybiBgMCR7c3RyfWA7IH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VZZWFyKHN0ciwgZGF0ZSkge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvW3lZXSsvKTtcbiAgaWYgKCFtYXRjaCkgeyByZXR1cm4gc3RyOyB9XG4gIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICBjYXNlICdZWVlZJzpcbiAgICBjYXNlICdZWVknOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VZZWFyKHN0ci5yZXBsYWNlKG1hdGNoLCBkYXRlLmdldEZ1bGxZZWFyKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnWVknOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VZZWFyKFxuICAgICAgICBzdHIucmVwbGFjZShtYXRjaCwgU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoMikpLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU1vbnRoKHN0ciwgZGF0ZSkge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvW21NXSsvKTtcbiAgaWYgKCFtYXRjaCkgeyByZXR1cm4gc3RyOyB9XG4gIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICBjYXNlICdNJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlTW9udGgoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0TW9udGgoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdNTSc6IHtcbiAgICAgIGNvbnN0IHplcm9MZWFkaW5nTW9udGggPSB6ZXJvTGVhZGluZyhkYXRlLmdldE1vbnRoKCkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdNb250aCksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdNTU0nOlxuICAgIGNhc2UgJ01NTU0nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChcbiAgICAgICAgc3RyLnJlcGxhY2UobWF0Y2gsIE1PTlRIX05BTUVTW2RhdGUuZ2V0TW9udGgoKSAtIDFdKSwgZGF0ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VEYXkoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bZERdKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ0QnOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RGF0ZSgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ0REJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdEYXRlID0gemVyb0xlYWRpbmcoZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIHplcm9MZWFkaW5nRGF0ZSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdkJzpcbiAgICBjYXNlICdkZCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgQUJCUl9EQVlTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2RkZCc6XG4gICAgY2FzZSAnZGRkZCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgREFZU19OQU1FU1tkYXRlLmdldERheSgpXSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcmFzaG0vSkRhdGVcbiAqIEBhdXRob3I6IEFyYXNoIE1vdXNhdmlcbiAqL1xuXG5pbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkRhdGUge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkgfHwgYXJnc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIFt0aGlzLmlucHV0XSA9IGFyZ3M7XG4gICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgdGhpcy5pbnB1dCA9IGFyZ3M7XG4gICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5wdXQgPSBuZXcgRGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgaW5wdXQnKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmlucHV0KSkge1xuICAgICAgdGhpcy5kYXRlID0gdGhpcy5pbnB1dC5tYXAoKG51bSkgPT4gcGFyc2VJbnQobnVtLCAxMCkpO1xuICAgICAgdGhpcy5fZCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB0aGlzLl9kID0gdGhpcy5pbnB1dDtcbiAgICAgIHRoaXMuZGF0ZSA9IEpEYXRlLnRvSmFsYWxpKHRoaXMuaW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIENvdmVydHMgYSBHcmVnb3JpYW4gZGF0ZSB0byBKYWxhbGkgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW1zIHtEYXRlfSBkYXRlXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHRvSmFsYWxpKGRhdGUpIHtcbiAgICBjb25zdCBqdWxpYW5EYXRlID0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKFxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICk7XG4gICAgY29uc3QgamRhdGUgPSBDb252ZXJ0ZXIuanVsaWFuVG9QZXJzaWFuKGp1bGlhbkRhdGUpO1xuXG4gICAgcmV0dXJuIGpkYXRlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBzdGF0aWMgdG9famFsYWxpKGRhdGUpIHsgcmV0dXJuIEpEYXRlLnRvSmFsYWxpKGRhdGUpOyB9XG5cbiAgLypcbiAgICogY29udmVydHMgYSBKYWxhbGkgZGF0ZSB0byBHcmVnb3JpYW5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGhcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBkYXlcbiAgICogQHJldHVybiB7RGF0ZX1cbiAgICovXG4gIHN0YXRpYyB0b0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QgZ2RhdGUgPSBDb252ZXJ0ZXIuanVsaWFuVG9HcmVnb3JpYW4oXG4gICAgICBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKHllYXIsIG1vbnRoLCBkYXkpXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgRGF0ZShnZGF0ZVswXSwgZ2RhdGVbMV0gLSAxLCBnZGF0ZVsyXSk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXRpYyB0b19ncmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSkgeyByZXR1cm4gSkRhdGUudG9HcmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSk7IH1cblxuICAvKlxuICAgKiBDaGVja3MgaWYgYSBnaXZlbiB5ZWFyIGlzIGEgbGVhcCB5ZWFyIG9yIG5vdFxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0xlYXBZZWFyKHllYXIpIHtcbiAgICByZXR1cm4gQ29udmVydGVyLmxlYXBQZXJzaWFuKHllYXIpO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyBtb250aCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IG1vbnRoIHplcm8gYmFzZWRcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgc3RhdGljIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XG4gICAgbGV0IGNhbGNlZFllYXIgPSB5ZWFyIC0gTWF0aC5mbG9vcihtb250aCAvIDEyKTtcbiAgICBsZXQgY2FsY2VkTW9udGggPSBtb250aCAtIChNYXRoLmZsb29yKG1vbnRoIC8gMTIpICogMTIpO1xuXG4gICAgaWYgKGNhbGNlZE1vbnRoIDwgMCkge1xuICAgICAgY2FsY2VkTW9udGggKz0gMTI7XG4gICAgICBjYWxjZWRZZWFyIC09IDE7XG4gICAgfSBlbHNlIGlmIChjYWxjZWRNb250aCA9PT0gMCkge1xuICAgICAgY2FsY2VkTW9udGggPSAxMjtcbiAgICB9XG5cbiAgICBpZiAoY2FsY2VkTW9udGggPCA2KSB7XG4gICAgICByZXR1cm4gMzE7XG4gICAgfSBpZiAoY2FsY2VkTW9udGggPCAxMSkge1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH0gaWYgKEpEYXRlLmlzTGVhcFllYXIoY2FsY2VkWWVhcikpIHtcbiAgICAgIHJldHVybiAzMDtcbiAgICB9XG4gICAgcmV0dXJuIDI5O1xuICB9XG5cbiAgLypcbiAgICogQ29udmVydHMgSkRhdGUgZGF0ZSB0byBHcmVnb3JpYW5cbiAgICovXG4gIHRvR3JlZ29yaWFuKCkge1xuICAgIHJldHVybiBKRGF0ZS50b0dyZWdvcmlhbih0aGlzLmRhdGVbMF0sIHRoaXMuZGF0ZVsxXSwgdGhpcy5kYXRlWzJdKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNob3dzIEphbGFsaSdzIGZ1bGwgeWVhciwgZXg6IDEzOTNcbiAgICpcbiAgICogQHJldHVybiB7SW50ZWdlcn1cbiAgICovXG4gIGdldEZ1bGxZZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMF07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIHRoZSBKYWxhbGkgZnVsbCB5ZWFyXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcmV0dXJuIHtKRGF0ZX1cbiAgICovXG4gIHNldEZ1bGxZZWFyKHllYXIpIHtcbiAgICB0aGlzLmRhdGVbMF0gPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFNob3dzIEphbGFsaSBtb250aCBudW1iZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gSmFsYWxpIG1vbnRoIG51bWJlclxuICAgKi9cbiAgZ2V0TW9udGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVsxXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgdGhlIEphbGFsaSBtb250aCBudW1iZXIuIEFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCAxMVxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IG1vbnRoXG4gICAqIEByZXR1cm5zIHtKRGF0ZX1cbiAgICovXG4gIHNldE1vbnRoKG1vbnRoKSB7XG4gICAgY29uc3QgZml4ZWQgPSBoZWxwZXJzLmZpeE1vbnRoKHRoaXMuZ2V0RnVsbFllYXIoKSwgcGFyc2VJbnQobW9udGgsIDEwKSk7XG4gICAgW3RoaXMuZGF0ZVswXSwgdGhpcy5kYXRlWzFdXSA9IGZpeGVkO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFNob3dzIEphbGFsaSBkYXkgbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gMzFcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBKYWxhbGkgZGF5IG51bWJlclxuICAgKi9cbiAgZ2V0RGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzJdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyBKYWxhbGkgZGF5IG51bWJlci4gQSBudW1iZXIgYmV0d2VlbiAwIHRvIDMxXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0gZGF0ZVxuICAgKiBAcmV0dXJuIHtKRGF0ZX1cbiAgICovXG4gIHNldERhdGUoZGF0ZSkge1xuICAgIHRoaXMuZGF0ZVsyXSA9IHBhcnNlSW50KGRhdGUsIDEwKTtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50b0dyZWdvcmlhbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIHRoZSBzcGVjaWZpZWQgZGF0ZS4gQSBudW1iZXIgYmV0d2VlbiAwIHRvIDZcbiAgICpcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGdldERheSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZC5nZXREYXkoKTtcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgYSBmb3JtYXRlZCBvdXRwdXQgb2YgY3VycmVudCBkYXRlXG4gICAqXG4gICAqIEBwYXJhbXMge1N0cmluZ30gZm9ybWF0XG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGZvcm1hdChmb3JtYXQpIHtcbiAgICBsZXQgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlWWVhcihmb3JtYXQsIHRoaXMpO1xuICAgIHJlc3VsdCA9IGhlbHBlcnMucmVwbGFjZU1vbnRoKHJlc3VsdCwgdGhpcyk7XG4gICAgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlRGF5KHJlc3VsdCwgdGhpcyk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9