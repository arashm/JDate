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




var Converter = /*#__PURE__*/function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, null, [{
    key: "leapGregorian",
    value: //  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year?
    function leapGregorian(year) {
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
      if (year === 1403) return true; // Well, algorithms are not perfect \o/

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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 */



var JDate = /*#__PURE__*/function () {
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
    value:
    /*
     * Converts JDate date to Gregorian
     */
    function toGregorian() {
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
      return new Date(+gdate[0], +gdate[1] - 1, +gdate[2]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2pkYXRlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJNT05USF9OQU1FUyIsIkFCQlJfREFZUyIsIkRBWVNfTkFNRVMiLCJHUkVHT1JJQU5fRVBPQ0giLCJQRVJTSUFOX0VQT0NIIiwiQ29udmVydGVyIiwieWVhciIsIm1vbnRoIiwiZGF5IiwicGFkIiwibGVhcEdyZWdvcmlhbiIsIk1hdGgiLCJmbG9vciIsImpkIiwid2pkIiwiZGVwb2NoIiwicXVhZHJpY2VudCIsImRxYyIsIm1vZCIsImNlbnQiLCJkY2VudCIsInF1YWQiLCJkcXVhZCIsInlpbmRleCIsInllYXJkYXkiLCJncmVnb3JpYW5Ub0p1bGlhbiIsImxlYXBhZGoiLCJlcGJhc2UiLCJlcHllYXIiLCJuamQiLCJwZXJzaWFuVG9KdWxpYW4iLCJjeWNsZSIsImN5ZWFyIiwieWN5Y2xlIiwiYXV4MSIsImF1eDIiLCJ5ZGF5IiwiY2VpbCIsImp1bGlhbiIsImp1bGlhblRvR3JlZ29yaWFuIiwianVsaWFuVG9QZXJzaWFuIiwiZGl2IiwiYSIsImIiLCJmaXhNb250aCIsInllYXJEaWZmIiwibmV3WWVhciIsIm5ld01vbnRoIiwiemVyb0xlYWRpbmciLCJzdHIiLCJsZW5ndGgiLCJyZXBsYWNlWWVhciIsImRhdGUiLCJtYXRjaCIsInZhbHVlIiwicmVwbGFjZSIsImdldEZ1bGxZZWFyIiwiU3RyaW5nIiwic2xpY2UiLCJyZXBsYWNlTW9udGgiLCJnZXRNb250aCIsInplcm9MZWFkaW5nTW9udGgiLCJ0b1N0cmluZyIsInJlcGxhY2VEYXkiLCJnZXREYXRlIiwiemVyb0xlYWRpbmdEYXRlIiwiZ2V0RGF5IiwiSkRhdGUiLCJhcmdzIiwiQXJyYXkiLCJpc0FycmF5IiwiRGF0ZSIsImlucHV0IiwiRXJyb3IiLCJtYXAiLCJudW0iLCJwYXJzZUludCIsIl9kIiwidG9HcmVnb3JpYW4iLCJ0b0phbGFsaSIsImZpeGVkIiwiaGVscGVycyIsImZvcm1hdCIsInJlc3VsdCIsImp1bGlhbkRhdGUiLCJqZGF0ZSIsImdkYXRlIiwibGVhcFBlcnNpYW4iLCJjYWxjZWRZZWFyIiwiY2FsY2VkTW9udGgiLCJpc0xlYXBZZWFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsYUFBVyxFQUFFLENB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SSxFQUFmO0FBQ0FELGtCQUFVLElBQUksQ0FBZDtBQUNELE9BSEQsTUFHTyxJQUFJQyxXQUFXLEtBQUssQ0FBcEIsRUFBdUI7QUFDNUJBLG1CQUFXLEdBQUcsRUFBZDtBQUNEOztBQUVELFVBQUlBLFdBQVcsR0FBRyxDQUFsQixFQUFxQjtBQUNuQixlQUFPLEVBQVA7QUFDRDs7QUFBQyxVQUFJQSxXQUFXLEdBQUcsRUFBbEIsRUFBc0I7QUFDdEIsZUFBTyxFQUFQO0FBQ0Q7O0FBQUMsVUFBSXRCLEtBQUssQ0FBQ3VCLFVBQU4sQ0FBaUJGLFVBQWpCLENBQUosRUFBa0M7QUFDbEMsZUFBTyxFQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxFQUFQO0FBQ0QiLCJmaWxlIjoiamRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkpEYXRlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvamRhdGUuanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTU9OVEhfTkFNRVM6IFsn2YHYsdmI2LHYr9uM2YYnLCAn2KfYsdiv24zYqNmH2LTYqicsICfYrtix2K/Yp9ivJywgJ9iq24zYsScsICfYp9mF2LHYr9in2K8nLCAn2LTZh9ix24zZiNixJywgJ9mF2YfYsScsICfYotio2KfZhicsICfYotiw2LEnLCAn2K/bjCcsICfYqNmH2YXZhicsICfYp9iz2YHZhtivJ10sXG4gIEFCQlJfREFZUzogWyfbsdi0JywgJ9uy2LQnLCAn27PYtCcsICfbtNi0JywgJ9u12LQnLCAn2KwnLCAn2LQnXSxcbiAgREFZU19OQU1FUzogWyfbjNqp2LTZhtio2YcnLCAn2K/ZiNi02YbYqNmHJywgJ9iz2YfigIzYtNmG2KjZhycsICfahtmH2KfYsdi02YbYqNmHJywgJ9m+2YbYrOKAjNi02YbYqNmHJywgJ9is2YXYudmHJywgJ9i02YbYqNmHJ10sXG4gIEdSRUdPUklBTl9FUE9DSDogMTcyMTQyNS41LFxuICBQRVJTSUFOX0VQT0NIOiAxOTQ4MzIwLjVcbn07XG4iLCJpbXBvcnQgeyBtb2QgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgR1JFR09SSUFOX0VQT0NILCBQRVJTSUFOX0VQT0NIIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXIge1xuICAvLyAgTEVBUF9HUkVHT1JJQU4gIC0tICBJcyBhIGdpdmVuIHllYXIgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciBhIGxlYXAgeWVhcj9cbiAgc3RhdGljIGxlYXBHcmVnb3JpYW4oeWVhcikge1xuICAgIHJldHVybiAoKHllYXIgJSA0KSA9PT0gMClcbiAgICAgICYmICghKCgoeWVhciAlIDEwMCkgPT09IDApICYmICgoeWVhciAlIDQwMCkgIT09IDApKSk7XG4gIH1cblxuICAvLyBHUkVHT1JJQU5fVE9fSkQgIC0tICBEZXRlcm1pbmUgSnVsaWFuIGRheSBudW1iZXIgZnJvbSBHcmVnb3JpYW4gY2FsZW5kYXIgZGF0ZVxuICBzdGF0aWMgZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGxldCBwYWQ7XG4gICAgaWYgKG1vbnRoIDw9IDIpIHtcbiAgICAgIHBhZCA9IDA7XG4gICAgfSBlbHNlIGlmIChDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSkge1xuICAgICAgcGFkID0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZCA9IC0yO1xuICAgIH1cblxuICAgIHJldHVybiAoR1JFR09SSUFOX0VQT0NIIC0gMSlcbiAgICAgICsgKDM2NSAqICh5ZWFyIC0gMSkpXG4gICAgICArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpXG4gICAgICArICgtTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSlcbiAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKVxuICAgICAgKyBNYXRoLmZsb29yKCgoKDM2NyAqIG1vbnRoKSAtIDM2MikgLyAxMikgKyAocGFkICsgZGF5KSk7XG4gIH1cblxuICAvLyAgSkRfVE9fR1JFR09SSUFOICAtLSAgQ2FsY3VsYXRlIEdyZWdvcmlhbiBjYWxlbmRhciBkYXRlIGZyb20gSnVsaWFuIGRheVxuICBzdGF0aWMganVsaWFuVG9HcmVnb3JpYW4oamQpIHtcbiAgICBjb25zdCB3amQgPSBNYXRoLmZsb29yKGpkIC0gMC41KSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0g7XG4gICAgY29uc3QgcXVhZHJpY2VudCA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTQ2MDk3KTtcbiAgICBjb25zdCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpO1xuICAgIGNvbnN0IGNlbnQgPSBNYXRoLmZsb29yKGRxYyAvIDM2NTI0KTtcbiAgICBjb25zdCBkY2VudCA9IG1vZChkcWMsIDM2NTI0KTtcbiAgICBjb25zdCBxdWFkID0gTWF0aC5mbG9vcihkY2VudCAvIDE0NjEpO1xuICAgIGNvbnN0IGRxdWFkID0gbW9kKGRjZW50LCAxNDYxKTtcbiAgICBjb25zdCB5aW5kZXggPSBNYXRoLmZsb29yKGRxdWFkIC8gMzY1KTtcbiAgICBsZXQgeWVhciA9IChxdWFkcmljZW50ICogNDAwKSArIChjZW50ICogMTAwKSArIChxdWFkICogNCkgKyB5aW5kZXg7XG4gICAgaWYgKCEoKGNlbnQgPT09IDQpIHx8ICh5aW5kZXggPT09IDQpKSkgeyB5ZWFyICs9IDE7IH1cbiAgICBjb25zdCB5ZWFyZGF5ID0gd2pkIC0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIDEsIDEpO1xuICAgIGxldCBsZWFwYWRqO1xuICAgIGlmICh3amQgPCBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgMywgMSkpIHtcbiAgICAgIGxlYXBhZGogPSAwO1xuICAgIH0gZWxzZSBpZiAoQ29udmVydGVyLmxlYXBHcmVnb3JpYW4oeWVhcikgPyAxIDogMikge1xuICAgICAgbGVhcGFkaiA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlYXBhZGogPSAyO1xuICAgIH1cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKCgoeWVhcmRheSArIGxlYXBhZGopICogMTIpICsgMzczKSAvIDM2Nyk7XG4gICAgY29uc3QgZGF5ID0gKHdqZCAtIENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgMSkpICsgMTtcblxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV07XG4gIH1cblxuICAvLyAgTEVBUF9QRVJTSUFOICAtLSAgSXMgYSBnaXZlbiB5ZWFyIGEgbGVhcCB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyID9cbiAgc3RhdGljIGxlYXBQZXJzaWFuKHllYXIpIHtcbiAgICBpZiAoeWVhciA9PT0gMTQwMykgcmV0dXJuIHRydWU7IC8vIFdlbGwsIGFsZ29yaXRobXMgYXJlIG5vdCBwZXJmZWN0IFxcby9cbiAgICByZXR1cm4gKFxuICAgICAgKCgoKCh5ZWFyIC0gKCh5ZWFyID4gMCkgPyA0NzQgOiA0NzMpKSAlIDI4MjApICsgNDc0KSArIDM4KSAqIDY4MikgJSAyODE2XG4gICAgKSA8IDY4MjtcbiAgfVxuXG4gIC8vICBQRVJTSUFOX1RPX0pEICAtLSAgRGV0ZXJtaW5lIEp1bGlhbiBkYXkgZnJvbSBQZXJzaWFuIGRhdGVcbiAgc3RhdGljIHBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QgZXBiYXNlID0geWVhciAtICgoeWVhciA+PSAwKSA/IDQ3NCA6IDQ3Myk7XG4gICAgY29uc3QgZXB5ZWFyID0gNDc0ICsgbW9kKGVwYmFzZSwgMjgyMCk7XG5cbiAgICByZXR1cm4gZGF5XG4gICAgICArICgobW9udGggPD0gNylcbiAgICAgICAgPyAoKG1vbnRoIC0gMSkgKiAzMSlcbiAgICAgICAgOiAoKChtb250aCAtIDEpICogMzApICsgNilcbiAgICAgIClcbiAgICAgICsgTWF0aC5mbG9vcigoKGVweWVhciAqIDY4MikgLSAxMTApIC8gMjgxNilcbiAgICAgICsgKChlcHllYXIgLSAxKSAqIDM2NSlcbiAgICAgICsgKE1hdGguZmxvb3IoZXBiYXNlIC8gMjgyMCkgKiAxMDI5OTgzKSArIChQRVJTSUFOX0VQT0NIIC0gMSk7XG4gIH1cblxuICAvLyAgSkRfVE9fUEVSU0lBTiAgLS0gIENhbGN1bGF0ZSBQZXJzaWFuIGRhdGUgZnJvbSBKdWxpYW4gZGF5XG4gIHN0YXRpYyBqdWxpYW5Ub1BlcnNpYW4oamQpIHtcbiAgICBjb25zdCBuamQgPSBNYXRoLmZsb29yKGpkKSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSBuamQgLSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKDQ3NSwgMSwgMSk7XG4gICAgY29uc3QgY3ljbGUgPSBNYXRoLmZsb29yKGRlcG9jaCAvIDEwMjk5ODMpO1xuICAgIGNvbnN0IGN5ZWFyID0gbW9kKGRlcG9jaCwgMTAyOTk4Myk7XG4gICAgbGV0IHljeWNsZTtcbiAgICBpZiAoY3llYXIgPT09IDEwMjk5ODIpIHtcbiAgICAgIHljeWNsZSA9IDI4MjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF1eDEgPSBNYXRoLmZsb29yKGN5ZWFyIC8gMzY2KTtcbiAgICAgIGNvbnN0IGF1eDIgPSBtb2QoY3llYXIsIDM2Nik7XG4gICAgICB5Y3ljbGUgPSBNYXRoLmZsb29yKCgoMjEzNCAqIGF1eDEpICsgKDI4MTYgKiBhdXgyKSArIDI4MTUpIC8gMTAyODUyMilcbiAgICAgICAgKyBhdXgxICsgMTtcbiAgICB9XG4gICAgbGV0IHllYXIgPSB5Y3ljbGUgKyAoMjgyMCAqIGN5Y2xlKSArIDQ3NDtcbiAgICBpZiAoeWVhciA8PSAwKSB7XG4gICAgICB5ZWFyIC09IDE7XG4gICAgfVxuICAgIGNvbnN0IHlkYXkgPSAobmpkIC0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCAxLCAxKSkgKyAxO1xuICAgIGNvbnN0IG1vbnRoID0gKHlkYXkgPD0gMTg2KSA/IE1hdGguY2VpbCh5ZGF5IC8gMzEpIDogTWF0aC5jZWlsKCh5ZGF5IC0gNikgLyAzMCk7XG4gICAgY29uc3QgZGF5ID0gKG5qZCAtIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIDEpKSArIDE7XG5cbiAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldO1xuICB9XG5cbiAgc3RhdGljIHBlcnNpYW5Ub0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QganVsaWFuID0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9HcmVnb3JpYW4oanVsaWFuKTtcbiAgfVxuXG4gIHN0YXRpYyBncmVnb3JpYW5Ub1BlcnNpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGp1bGlhbiA9IENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9QZXJzaWFuKGp1bGlhbik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmltcG9ydCB7XG4gIE1PTlRIX05BTUVTLFxuICBBQkJSX0RBWVMsXG4gIERBWVNfTkFNRVNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2KGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoYSAvIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSAoTWF0aC5mbG9vcihhIC8gYikgKiBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeE1vbnRoKHllYXIsIG1vbnRoKSB7XG4gIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDw9IDApIHtcbiAgICBjb25zdCB5ZWFyRGlmZiA9IE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gICAgY29uc3QgbmV3WWVhciA9IHllYXIgLSB5ZWFyRGlmZjtcbiAgICBjb25zdCBuZXdNb250aCA9IG1vbnRoIC0gKHllYXJEaWZmICogMTIpO1xuXG4gICAgcmV0dXJuIFtuZXdZZWFyLCBuZXdNb250aF07XG4gIH1cblxuICByZXR1cm4gW3llYXIsIG1vbnRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm9MZWFkaW5nKHN0cikge1xuICBpZiAoc3RyICYmIHN0ci5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGAwJHtzdHJ9YDsgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVllYXIoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9beVldKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ1lZWVknOlxuICAgIGNhc2UgJ1lZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RnVsbFllYXIoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoXG4gICAgICAgIHN0ci5yZXBsYWNlKG1hdGNoLCBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgyKSksIGRhdGVcbiAgICAgICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTW9udGgoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bbU1dKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ00nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXRNb250aCgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdNb250aCA9IHplcm9MZWFkaW5nKGRhdGUuZ2V0TW9udGgoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKHN0ci5yZXBsYWNlKG1hdGNoLCB6ZXJvTGVhZGluZ01vbnRoKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NTSc6XG4gICAgY2FzZSAnTU1NTSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKFxuICAgICAgICBzdHIucmVwbGFjZShtYXRjaCwgTU9OVEhfTkFNRVNbZGF0ZS5nZXRNb250aCgpIC0gMV0pLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZURheShzdHIsIGRhdGUpIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL1tkRF0rLyk7XG4gIGlmICghbWF0Y2gpIHsgcmV0dXJuIHN0cjsgfVxuICBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgY2FzZSAnRCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXREYXRlKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnREQnOiB7XG4gICAgICBjb25zdCB6ZXJvTGVhZGluZ0RhdGUgPSB6ZXJvTGVhZGluZyhkYXRlLmdldERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdEYXRlKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2QnOlxuICAgIGNhc2UgJ2RkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBBQkJSX0RBWVNbZGF0ZS5nZXREYXkoKV0pLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnZGRkJzpcbiAgICBjYXNlICdkZGRkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBEQVlTX05BTUVTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FyYXNobS9KRGF0ZVxuICogQGF1dGhvcjogQXJhc2ggTW91c2F2aVxuICovXG5cbmltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInO1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKRGF0ZSB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzBdKSB8fCBhcmdzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgW3RoaXMuaW5wdXRdID0gYXJncztcbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICB0aGlzLmlucHV0ID0gYXJncztcbiAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgdGhpcy5pbnB1dCA9IG5ldyBEYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBpbnB1dCcpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuaW5wdXQpKSB7XG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmlucHV0Lm1hcCgobnVtKSA9PiBwYXJzZUludChudW0sIDEwKSk7XG4gICAgICB0aGlzLl9kID0gdGhpcy50b0dyZWdvcmlhbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHRoaXMuX2QgPSB0aGlzLmlucHV0O1xuICAgICAgdGhpcy5kYXRlID0gSkRhdGUudG9KYWxhbGkodGhpcy5pbnB1dCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQ292ZXJ0cyBhIEdyZWdvcmlhbiBkYXRlIHRvIEphbGFsaSBkYXRlXG4gICAqXG4gICAqIEBwYXJhbXMge0RhdGV9IGRhdGVcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgdG9KYWxhbGkoZGF0ZSkge1xuICAgIGNvbnN0IGp1bGlhbkRhdGUgPSBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBkYXRlLmdldE1vbnRoKCkgKyAxLFxuICAgICAgZGF0ZS5nZXREYXRlKClcbiAgICApO1xuICAgIGNvbnN0IGpkYXRlID0gQ29udmVydGVyLmp1bGlhblRvUGVyc2lhbihqdWxpYW5EYXRlKTtcblxuICAgIHJldHVybiBqZGF0ZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc3RhdGljIHRvX2phbGFsaShkYXRlKSB7IHJldHVybiBKRGF0ZS50b0phbGFsaShkYXRlKTsgfVxuXG4gIC8qXG4gICAqIGNvbnZlcnRzIGEgSmFsYWxpIGRhdGUgdG8gR3JlZ29yaWFuXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IG1vbnRoXG4gICAqIEBwYXJhbXMge051bWJlcn0gZGF5XG4gICAqIEByZXR1cm4ge0RhdGV9XG4gICAqL1xuICBzdGF0aWMgdG9HcmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGdkYXRlID0gQ29udmVydGVyLmp1bGlhblRvR3JlZ29yaWFuKFxuICAgICAgQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KVxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IERhdGUoK2dkYXRlWzBdLCArZ2RhdGVbMV0gLSAxLCArZ2RhdGVbMl0pO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBzdGF0aWMgdG9fZ3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHsgcmV0dXJuIEpEYXRlLnRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpOyB9XG5cbiAgLypcbiAgICogQ2hlY2tzIGlmIGEgZ2l2ZW4geWVhciBpcyBhIGxlYXAgeWVhciBvciBub3RcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgcmV0dXJuIENvbnZlcnRlci5sZWFwUGVyc2lhbih5ZWFyKTtcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgbW9udGggbGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aCB6ZXJvIGJhc2VkXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIHN0YXRpYyBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgIGxldCBjYWxjZWRZZWFyID0geWVhciAtIE1hdGguZmxvb3IobW9udGggLyAxMik7XG4gICAgbGV0IGNhbGNlZE1vbnRoID0gbW9udGggLSAoTWF0aC5mbG9vcihtb250aCAvIDEyKSAqIDEyKTtcblxuICAgIGlmIChjYWxjZWRNb250aCA8IDApIHtcbiAgICAgIGNhbGNlZE1vbnRoICs9IDEyO1xuICAgICAgY2FsY2VkWWVhciAtPSAxO1xuICAgIH0gZWxzZSBpZiAoY2FsY2VkTW9udGggPT09IDApIHtcbiAgICAgIGNhbGNlZE1vbnRoID0gMTI7XG4gICAgfVxuXG4gICAgaWYgKGNhbGNlZE1vbnRoIDwgNikge1xuICAgICAgcmV0dXJuIDMxO1xuICAgIH0gaWYgKGNhbGNlZE1vbnRoIDwgMTEpIHtcbiAgICAgIHJldHVybiAzMDtcbiAgICB9IGlmIChKRGF0ZS5pc0xlYXBZZWFyKGNhbGNlZFllYXIpKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfVxuICAgIHJldHVybiAyOTtcbiAgfVxuXG4gIC8qXG4gICAqIENvbnZlcnRzIEpEYXRlIGRhdGUgdG8gR3JlZ29yaWFuXG4gICAqL1xuICB0b0dyZWdvcmlhbigpIHtcbiAgICByZXR1cm4gSkRhdGUudG9HcmVnb3JpYW4odGhpcy5kYXRlWzBdLCB0aGlzLmRhdGVbMV0sIHRoaXMuZGF0ZVsyXSk7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkncyBmdWxsIHllYXIsIGV4OiAxMzkzXG4gICAqXG4gICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAqL1xuICBnZXRGdWxsWWVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzBdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyB0aGUgSmFsYWxpIGZ1bGwgeWVhclxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHJldHVybiB7SkRhdGV9XG4gICAqL1xuICBzZXRGdWxsWWVhcih5ZWFyKSB7XG4gICAgdGhpcy5kYXRlWzBdID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkgbW9udGggbnVtYmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBtb250aCBudW1iZXJcbiAgICovXG4gIGdldE1vbnRoKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMV07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIHRoZSBKYWxhbGkgbW9udGggbnVtYmVyLiBBbiBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgMTFcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcmV0dXJucyB7SkRhdGV9XG4gICAqL1xuICBzZXRNb250aChtb250aCkge1xuICAgIGNvbnN0IGZpeGVkID0gaGVscGVycy5maXhNb250aCh0aGlzLmdldEZ1bGxZZWFyKCksIHBhcnNlSW50KG1vbnRoLCAxMCkpO1xuICAgIFt0aGlzLmRhdGVbMF0sIHRoaXMuZGF0ZVsxXV0gPSBmaXhlZDtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50b0dyZWdvcmlhbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkgZGF5IG51bWJlci4gQSBudW1iZXIgYmV0d2VlbiAwIHRvIDMxXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gSmFsYWxpIGRheSBudW1iZXJcbiAgICovXG4gIGdldERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVsyXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgSmFsYWxpIGRheSBudW1iZXIuIEEgbnVtYmVyIGJldHdlZW4gMCB0byAzMVxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IGRhdGVcbiAgICogQHJldHVybiB7SkRhdGV9XG4gICAqL1xuICBzZXREYXRlKGRhdGUpIHtcbiAgICB0aGlzLmRhdGVbMl0gPSBwYXJzZUludChkYXRlLCAxMCk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0aGUgc3BlY2lmaWVkIGRhdGUuIEEgbnVtYmVyIGJldHdlZW4gMCB0byA2XG4gICAqXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBnZXREYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2QuZ2V0RGF5KCk7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIGEgZm9ybWF0ZWQgb3V0cHV0IG9mIGN1cnJlbnQgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW1zIHtTdHJpbmd9IGZvcm1hdFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBmb3JtYXQoZm9ybWF0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGhlbHBlcnMucmVwbGFjZVllYXIoZm9ybWF0LCB0aGlzKTtcbiAgICByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VNb250aChyZXN1bHQsIHRoaXMpO1xuICAgIHJlc3VsdCA9IGhlbHBlcnMucmVwbGFjZURheShyZXN1bHQsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==