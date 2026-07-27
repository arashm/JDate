(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("JDate", [], factory);
	else if(typeof exports === 'object')
		exports["JDate"] = factory();
	else
		root["JDate"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ABBR_DAYS: () => (/* binding */ ABBR_DAYS),
/* harmony export */   DAYS_NAMES: () => (/* binding */ DAYS_NAMES),
/* harmony export */   GREGORIAN_EPOCH: () => (/* binding */ GREGORIAN_EPOCH),
/* harmony export */   MONTH_NAMES: () => (/* binding */ MONTH_NAMES),
/* harmony export */   NON_LEAP_CORRECTION: () => (/* binding */ NON_LEAP_CORRECTION),
/* harmony export */   PERSIAN_CYCLE_DAYS: () => (/* binding */ PERSIAN_CYCLE_DAYS),
/* harmony export */   PERSIAN_EPOCH: () => (/* binding */ PERSIAN_EPOCH)
/* harmony export */ });
var MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
var ABBR_DAYS = ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'];
var DAYS_NAMES = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
var GREGORIAN_EPOCH = 1;
var PERSIAN_EPOCH = 226896;
var PERSIAN_CYCLE_DAYS = 12053;
var NON_LEAP_CORRECTION = [1502, 1601, 1634, 1667, 1700, 1733, 1766, 1799, 1832, 1865, 1898, 1931, 1964, 1997, 2030, 2059, 2063, 2096, 2129, 2158, 2162, 2191, 2195, 2224, 2228, 2257, 2261, 2290, 2294, 2323, 2327, 2356, 2360, 2389, 2393, 2422, 2426, 2455, 2459, 2488, 2492, 2521, 2525, 2554, 2558, 2587, 2591, 2620, 2624, 2653, 2657, 2686, 2690, 2719, 2723, 2748, 2752, 2756, 2781, 2785, 2789, 2818, 2822, 2847, 2851, 2855, 2880, 2884, 2888, 2913, 2917, 2921, 2946, 2950, 2954, 2979, 2983, 2987];

/***/ }),

/***/ "./src/converter.js":
/*!**************************!*\
  !*** ./src/converter.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Converter)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Converter = /*#__PURE__*/function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }
  return _createClass(Converter, null, [{
    key: "gregorianToFixed",
    value: function gregorianToFixed(year, month, day) {
      var result = _constants__WEBPACK_IMPORTED_MODULE_1__.GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12)
      // eslint-disable-next-line no-nested-ternary
      + (month <= 2 ? 0 : Converter.leapGregorian(year) ? -1 : -2) + day;
      return result;
    }
  }, {
    key: "gregorianYearFromFixed",
    value: function gregorianYearFromFixed(date) {
      var d0 = date - _constants__WEBPACK_IMPORTED_MODULE_1__.GREGORIAN_EPOCH;
      var n400 = Math.floor(d0 / 146097);
      var d1 = d0 % 146097;
      var n100 = Math.floor(d1 / 36524);
      var d2 = d1 % 36524;
      var n4 = Math.floor(d2 / 1461);
      var d3 = d2 % 1461;
      var n1 = Math.floor(d3 / 365);
      var year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
      if (n100 === 4 || n1 === 4) {
        return year;
      }
      return year + 1;
    }
  }, {
    key: "gregorianNewYear",
    value: function gregorianNewYear(year) {
      return Converter.gregorianToFixed(year, 1, 1);
    }
  }, {
    key: "fixedToGregorian",
    value: function fixedToGregorian(date) {
      var year = Converter.gregorianYearFromFixed(date);
      var priorDays = date - Converter.gregorianNewYear(year);
      var correction;
      if (date < Converter.gregorianToFixed(year, 3, 1)) {
        correction = 0;
      } else if (Converter.leapGregorian(year)) {
        correction = 1;
      } else {
        correction = 2;
      }
      var month = Math.floor((12 * (priorDays + correction) + 373) / 367);
      var day = date - Converter.gregorianToFixed(year, month, 1) + 1;
      return [year, month, day];
    }
  }, {
    key: "jalaliToFixed",
    value: function jalaliToFixed(year, month, day) {
      var newYear = _constants__WEBPACK_IMPORTED_MODULE_1__.PERSIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((8 * year + 21) / 33);
      if (_constants__WEBPACK_IMPORTED_MODULE_1__.NON_LEAP_CORRECTION.includes(year - 1)) {
        newYear -= 1;
      }
      return newYear - 1 + (month <= 7 ? 31 * (month - 1) : 30 * (month - 1) + 6) + day;
    }
  }, {
    key: "fixedToJalali",
    value: function fixedToJalali(fixedDate) {
      var daysSinceEpoch = fixedDate - Converter.jalaliToFixed(1, 1, 1);
      var year = 1 + Math.floor((33 * daysSinceEpoch + 3) / _constants__WEBPACK_IMPORTED_MODULE_1__.PERSIAN_CYCLE_DAYS);
      var dayOfYear = fixedDate - Converter.jalaliToFixed(year, 1, 1) + 1;
      if (dayOfYear === 366 && _constants__WEBPACK_IMPORTED_MODULE_1__.NON_LEAP_CORRECTION.includes(year)) {
        year += 1;
        dayOfYear = 1;
      }
      var month = dayOfYear <= 186 ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.divCeil)(dayOfYear, 31) : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.divCeil)(dayOfYear - 6, 30);
      var day = fixedDate - Converter.jalaliToFixed(year, month, 1) + 1;
      return [year, month, day];
    }
  }, {
    key: "leapPersian",
    value: function leapPersian(jdate) {
      if (_constants__WEBPACK_IMPORTED_MODULE_1__.NON_LEAP_CORRECTION.includes(jdate)) {
        return false;
      }
      if (_constants__WEBPACK_IMPORTED_MODULE_1__.NON_LEAP_CORRECTION.includes(jdate - 1)) {
        return true;
      }
      return (25 * jdate + 11) % 33 < 8;
    }
  }, {
    key: "leapGregorian",
    value: function leapGregorian(year) {
      return year % 4 === 0 && ![100, 200, 300].includes(year % 400);
    }
  }]);
}();


/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   divCeil: () => (/* binding */ divCeil),
/* harmony export */   fixMonth: () => (/* binding */ fixMonth),
/* harmony export */   replaceDay: () => (/* binding */ replaceDay),
/* harmony export */   replaceMonth: () => (/* binding */ replaceMonth),
/* harmony export */   replaceYear: () => (/* binding */ replaceYear),
/* harmony export */   zeroLeading: () => (/* binding */ zeroLeading)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function divCeil(a, b) {
  return Math.floor((a + b - 1) / b);
}

/*
 * Normalizes an out-of-range one-based month into a [year, month] pair,
 * carrying the overflow into the year. fixMonth(1396, 13) is [1397, 1].
 */
function fixMonth(year, month) {
  if (month > 12 || month <= 0) {
    var yearDiff = Math.floor((month - 1) / 12);
    var newYear = year + yearDiff;
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
        var _value = replaceYear(str.replace(match, String(date.getFullYear()).slice(-2)), date);
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
        var _value3 = replaceMonth(str.replace(match, _constants__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[date.getMonth() - 1]), date);
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
        var _value5 = replaceDay(str.replace(match, _constants__WEBPACK_IMPORTED_MODULE_0__.ABBR_DAYS[date.getDay()]), date);
        return _value5;
      }
    case 'ddd':
    case 'dddd':
      {
        var _value6 = replaceDay(str.replace(match, _constants__WEBPACK_IMPORTED_MODULE_0__.DAYS_NAMES[date.getDay()]), date);
        return _value6;
      }
    default:
      {
        return str;
      }
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/jdate.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JDate)
/* harmony export */ });
/* harmony import */ var _converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converter */ "./src/converter.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * https://github.com/arashm/JDate
 * @author: Arash Mousavi
 */



var JDate = /*#__PURE__*/function () {
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
  return _createClass(JDate, [{
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
  }, {
    key: "getMonth",
    value: function getMonth() {
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
  }, {
    key: "setMonth",
    value: function setMonth(month) {
      var fixed = _helpers__WEBPACK_IMPORTED_MODULE_1__.fixMonth(this.getFullYear(), parseInt(month, 10));
      var _fixed = _slicedToArray(fixed, 2);
      this.date[0] = _fixed[0];
      this.date[1] = _fixed[1];
      this._d = this.toGregorian();
      return this;
    }

    /*
     * Shows Jalali day number. A number between 1 and 31
     *
     * @return {Number} Jalali day number
     */
  }, {
    key: "getDate",
    value: function getDate() {
      return this.date[2];
    }

    /*
     * Sets Jalali day number. A number between 1 and 31
     *
     * @params {Number} date
     * @return {JDate}
     */
  }, {
    key: "setDate",
    value: function setDate(date) {
      this.date[2] = parseInt(date, 10);
      this._d = this.toGregorian();
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
      var result = _helpers__WEBPACK_IMPORTED_MODULE_1__.replaceYear(_format, this);
      result = _helpers__WEBPACK_IMPORTED_MODULE_1__.replaceMonth(result, this);
      result = _helpers__WEBPACK_IMPORTED_MODULE_1__.replaceDay(result, this);
      return result;
    }
  }], [{
    key: "toJalali",
    value: function toJalali(date) {
      var fixedDate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].gregorianToFixed(date.getFullYear(), date.getMonth() + 1, date.getDate());
      var jdate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].fixedToJalali(fixedDate);
      return jdate;
    }

    // eslint-disable-next-line camelcase
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
      var gdate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].fixedToGregorian(_converter__WEBPACK_IMPORTED_MODULE_0__["default"].jalaliToFixed(year, month, day));
      return new Date(+gdate[0], +gdate[1] - 1, +gdate[2]);
    }

    // eslint-disable-next-line camelcase
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
     * Note: `month` is ZERO based here (0 is فروردین, 11 is اسفند), unlike
     * getMonth/setMonth which are one based. Out-of-range values carry into the
     * year, so daysInMonth(1395, 12) is فروردین of 1396.
     *
     * @params {Number} year
     * @params {Number} month zero based
     * @return {Number}
     */
  }, {
    key: "daysInMonth",
    value: function daysInMonth(year, month) {
      var calcedYear = year + Math.floor(month / 12);
      var calcedMonth = (month % 12 + 12) % 12;
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
}();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVDLEdBQUcsQ0FBQztJQUFFOztJQUVwRjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMRTtJQUFBTCxHQUFBO0lBQUFDLEtBQUEsRUFNQSxTQUFBbUYsV0FBa0JqRixJQUFJLEVBQUU7TUFDdEIsT0FBT04sa0RBQVMsQ0FBQ2tDLFdBQVcsQ0FBQzVCLElBQUksQ0FBQztJQUNwQzs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBVkU7SUFBQUgsR0FBQTtJQUFBQyxLQUFBLEVBV0EsU0FBQW9GLFlBQW1CbEYsSUFBSSxFQUFFQyxLQUFLLEVBQUU7TUFDOUIsSUFBTWtGLFVBQVUsR0FBR25GLElBQUksR0FBR0ksSUFBSSxDQUFDQyxLQUFLLENBQUNKLEtBQUssR0FBRyxFQUFFLENBQUM7TUFDaEQsSUFBTW1GLFdBQVcsR0FBRyxDQUFFbkYsS0FBSyxHQUFHLEVBQUUsR0FBSSxFQUFFLElBQUksRUFBRTtNQUU1QyxJQUFJbUYsV0FBVyxHQUFHLENBQUMsRUFBRTtRQUNuQixPQUFPLEVBQUU7TUFDWDtNQUNBLElBQUlBLFdBQVcsR0FBRyxFQUFFLEVBQUU7UUFDcEIsT0FBTyxFQUFFO01BQ1g7TUFDQSxJQUFJN0IsS0FBSyxDQUFDMEIsVUFBVSxDQUFDRSxVQUFVLENBQUMsRUFBRTtRQUNoQyxPQUFPLEVBQUU7TUFDWDtNQUNBLE9BQU8sRUFBRTtJQUNYO0VBQUM7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL0pEYXRlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29udmVydGVyLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0pEYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9qZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkpEYXRlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImV4cG9ydCBjb25zdCBNT05USF9OQU1FUyA9IFsn2YHYsdmI2LHYr9uM2YYnLCAn2KfYsdiv24zYqNmH2LTYqicsICfYrtix2K/Yp9ivJywgJ9iq24zYsScsICfYp9mF2LHYr9in2K8nLCAn2LTZh9ix24zZiNixJywgJ9mF2YfYsScsICfYotio2KfZhicsICfYotiw2LEnLCAn2K/bjCcsICfYqNmH2YXZhicsICfYp9iz2YHZhtivJ107XG5cbmV4cG9ydCBjb25zdCBBQkJSX0RBWVMgPSBbJ9ux2LQnLCAn27LYtCcsICfbs9i0JywgJ9u02LQnLCAn27XYtCcsICfYrCcsICfYtCddO1xuXG5leHBvcnQgY29uc3QgREFZU19OQU1FUyA9IFsn24zaqdi02YbYqNmHJywgJ9iv2YjYtNmG2KjZhycsICfYs9mH4oCM2LTZhtio2YcnLCAn2obZh9in2LHYtNmG2KjZhycsICfZvtmG2KzigIzYtNmG2KjZhycsICfYrNmF2LnZhycsICfYtNmG2KjZhyddO1xuXG5leHBvcnQgY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTtcblxuZXhwb3J0IGNvbnN0IFBFUlNJQU5fRVBPQ0ggPSAyMjY4OTY7XG5cbmV4cG9ydCBjb25zdCBQRVJTSUFOX0NZQ0xFX0RBWVMgPSAxMjA1MztcblxuZXhwb3J0IGNvbnN0IE5PTl9MRUFQX0NPUlJFQ1RJT04gPSBbXG4gIDE1MDIsXG4gIDE2MDEsIDE2MzQsIDE2NjcsXG4gIDE3MDAsIDE3MzMsIDE3NjYsIDE3OTksXG4gIDE4MzIsIDE4NjUsIDE4OTgsXG4gIDE5MzEsIDE5NjQsIDE5OTcsXG4gIDIwMzAsIDIwNTksIDIwNjMsIDIwOTYsXG4gIDIxMjksIDIxNTgsIDIxNjIsIDIxOTEsIDIxOTUsXG4gIDIyMjQsIDIyMjgsIDIyNTcsIDIyNjEsIDIyOTAsIDIyOTQsXG4gIDIzMjMsIDIzMjcsIDIzNTYsIDIzNjAsIDIzODksIDIzOTMsXG4gIDI0MjIsIDI0MjYsIDI0NTUsIDI0NTksIDI0ODgsIDI0OTIsXG4gIDI1MjEsIDI1MjUsIDI1NTQsIDI1NTgsIDI1ODcsIDI1OTEsXG4gIDI2MjAsIDI2MjQsIDI2NTMsIDI2NTcsIDI2ODYsIDI2OTAsXG4gIDI3MTksIDI3MjMsIDI3NDgsIDI3NTIsIDI3NTYsIDI3ODEsIDI3ODUsIDI3ODksXG4gIDI4MTgsIDI4MjIsIDI4NDcsIDI4NTEsIDI4NTUsIDI4ODAsIDI4ODQsIDI4ODgsXG4gIDI5MTMsIDI5MTcsIDI5MjEsIDI5NDYsIDI5NTAsIDI5NTQsIDI5NzksIDI5ODMsIDI5ODdcbl07XG4iLCJpbXBvcnQgeyBkaXZDZWlsIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7XG4gIEdSRUdPUklBTl9FUE9DSCwgUEVSU0lBTl9FUE9DSCwgTk9OX0xFQVBfQ09SUkVDVElPTiwgUEVSU0lBTl9DWUNMRV9EQVlTXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udmVydGVyIHtcbiAgc3RhdGljIGdyZWdvcmlhblRvRml4ZWQoeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IEdSRUdPUklBTl9FUE9DSCAtIDFcbiAgICAgICAgKyAzNjUgKiAoeWVhciAtIDEpXG4gICAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNClcbiAgICAgICAgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApXG4gICAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKVxuICAgICAgICArIE1hdGguZmxvb3IoKDM2NyAqIG1vbnRoIC0gMzYyKSAvIDEyKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgKyAobW9udGggPD0gMiA/IDAgOiBDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSA/IC0xIDogLTIpXG4gICAgICAgICsgZGF5O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZ3JlZ29yaWFuWWVhckZyb21GaXhlZChkYXRlKSB7XG4gICAgY29uc3QgZDAgPSBkYXRlIC0gR1JFR09SSUFOX0VQT0NIO1xuICAgIGNvbnN0IG40MDAgPSBNYXRoLmZsb29yKGQwIC8gMTQ2MDk3KTtcbiAgICBjb25zdCBkMSA9IGQwICUgMTQ2MDk3O1xuICAgIGNvbnN0IG4xMDAgPSBNYXRoLmZsb29yKGQxIC8gMzY1MjQpO1xuICAgIGNvbnN0IGQyID0gZDEgJSAzNjUyNDtcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IoZDIgLyAxNDYxKTtcbiAgICBjb25zdCBkMyA9IGQyICUgMTQ2MTtcbiAgICBjb25zdCBuMSA9IE1hdGguZmxvb3IoZDMgLyAzNjUpO1xuICAgIGNvbnN0IHllYXIgPSA0MDAgKiBuNDAwICsgMTAwICogbjEwMCArIDQgKiBuNCArIG4xO1xuICAgIGlmIChuMTAwID09PSA0IHx8IG4xID09PSA0KSB7XG4gICAgICByZXR1cm4geWVhcjtcbiAgICB9XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9XG5cbiAgc3RhdGljIGdyZWdvcmlhbk5ld1llYXIoeWVhcikge1xuICAgIHJldHVybiBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9GaXhlZCh5ZWFyLCAxLCAxKTtcbiAgfVxuXG4gIHN0YXRpYyBmaXhlZFRvR3JlZ29yaWFuKGRhdGUpIHtcbiAgICBjb25zdCB5ZWFyID0gQ29udmVydGVyLmdyZWdvcmlhblllYXJGcm9tRml4ZWQoZGF0ZSk7XG4gICAgY29uc3QgcHJpb3JEYXlzID0gZGF0ZSAtIENvbnZlcnRlci5ncmVnb3JpYW5OZXdZZWFyKHllYXIpO1xuICAgIGxldCBjb3JyZWN0aW9uO1xuICAgIGlmIChkYXRlIDwgQ29udmVydGVyLmdyZWdvcmlhblRvRml4ZWQoeWVhciwgMywgMSkpIHtcbiAgICAgIGNvcnJlY3Rpb24gPSAwO1xuICAgIH0gZWxzZSBpZiAoQ29udmVydGVyLmxlYXBHcmVnb3JpYW4oeWVhcikpIHtcbiAgICAgIGNvcnJlY3Rpb24gPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3JyZWN0aW9uID0gMjtcbiAgICB9XG4gICAgY29uc3QgbW9udGggPSBNYXRoLmZsb29yKCgxMiAqIChwcmlvckRheXMgKyBjb3JyZWN0aW9uKSArIDM3MykgLyAzNjcpO1xuICAgIGNvbnN0IGRheSA9IGRhdGUgLSBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9GaXhlZCh5ZWFyLCBtb250aCwgMSkgKyAxO1xuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV07XG4gIH1cblxuICBzdGF0aWMgamFsYWxpVG9GaXhlZCh5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgbGV0IG5ld1llYXIgPSBQRVJTSUFOX0VQT0NIIC0gMSArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCg4ICogeWVhciArIDIxKSAvIDMzKTtcbiAgICBpZiAoTk9OX0xFQVBfQ09SUkVDVElPTi5pbmNsdWRlcyh5ZWFyIC0gMSkpIHtcbiAgICAgIG5ld1llYXIgLT0gMTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIG5ld1llYXIgLSAxXG4gICAgICAgICsgKChtb250aCA8PSA3KSA/IDMxICogKG1vbnRoIC0gMSkgOiAzMCAqIChtb250aCAtIDEpICsgNilcbiAgICAgICAgKyBkYXlcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGZpeGVkVG9KYWxhbGkoZml4ZWREYXRlKSB7XG4gICAgY29uc3QgZGF5c1NpbmNlRXBvY2ggPSBmaXhlZERhdGUgLSBDb252ZXJ0ZXIuamFsYWxpVG9GaXhlZCgxLCAxLCAxKTtcbiAgICBsZXQgeWVhciA9IDEgKyBNYXRoLmZsb29yKCgzMyAqIGRheXNTaW5jZUVwb2NoICsgMykgLyBQRVJTSUFOX0NZQ0xFX0RBWVMpO1xuICAgIGxldCBkYXlPZlllYXIgPSBmaXhlZERhdGUgLSBDb252ZXJ0ZXIuamFsYWxpVG9GaXhlZCh5ZWFyLCAxLCAxKSArIDE7XG5cbiAgICBpZiAoZGF5T2ZZZWFyID09PSAzNjYgJiYgTk9OX0xFQVBfQ09SUkVDVElPTi5pbmNsdWRlcyh5ZWFyKSkge1xuICAgICAgeWVhciArPSAxO1xuICAgICAgZGF5T2ZZZWFyID0gMTtcbiAgICB9XG5cbiAgICBjb25zdCBtb250aCA9IChkYXlPZlllYXIgPD0gMTg2KSA/IGRpdkNlaWwoZGF5T2ZZZWFyLCAzMSkgOiBkaXZDZWlsKGRheU9mWWVhciAtIDYsIDMwKTtcbiAgICBjb25zdCBkYXkgPSBmaXhlZERhdGUgLSBDb252ZXJ0ZXIuamFsYWxpVG9GaXhlZCh5ZWFyLCBtb250aCwgMSkgKyAxO1xuXG4gICAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XTtcbiAgfVxuXG4gIHN0YXRpYyBsZWFwUGVyc2lhbihqZGF0ZSkge1xuICAgIGlmIChOT05fTEVBUF9DT1JSRUNUSU9OLmluY2x1ZGVzKGpkYXRlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gaWYgKE5PTl9MRUFQX0NPUlJFQ1RJT04uaW5jbHVkZXMoamRhdGUgLSAxKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAoMjUgKiBqZGF0ZSArIDExKSAlIDMzIDwgODtcbiAgfVxuXG4gIHN0YXRpYyBsZWFwR3JlZ29yaWFuKHllYXIpIHtcbiAgICByZXR1cm4gKHllYXIgJSA0ID09PSAwICYmICFbMTAwLCAyMDAsIDMwMF0uaW5jbHVkZXMoeWVhciAlIDQwMCkpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBNT05USF9OQU1FUyxcbiAgQUJCUl9EQVlTLFxuICBEQVlTX05BTUVTXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpdkNlaWwoYSwgYikge1xuICByZXR1cm4gTWF0aC5mbG9vcigoYSArIGIgLSAxKSAvIGIpO1xufVxuXG4vKlxuICogTm9ybWFsaXplcyBhbiBvdXQtb2YtcmFuZ2Ugb25lLWJhc2VkIG1vbnRoIGludG8gYSBbeWVhciwgbW9udGhdIHBhaXIsXG4gKiBjYXJyeWluZyB0aGUgb3ZlcmZsb3cgaW50byB0aGUgeWVhci4gZml4TW9udGgoMTM5NiwgMTMpIGlzIFsxMzk3LCAxXS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeE1vbnRoKHllYXIsIG1vbnRoKSB7XG4gIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDw9IDApIHtcbiAgICBjb25zdCB5ZWFyRGlmZiA9IE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gICAgY29uc3QgbmV3WWVhciA9IHllYXIgKyB5ZWFyRGlmZjtcbiAgICBjb25zdCBuZXdNb250aCA9IG1vbnRoIC0gKHllYXJEaWZmICogMTIpO1xuXG4gICAgcmV0dXJuIFtuZXdZZWFyLCBuZXdNb250aF07XG4gIH1cblxuICByZXR1cm4gW3llYXIsIG1vbnRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm9MZWFkaW5nKHN0cikge1xuICBpZiAoc3RyICYmIHN0ci5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGAwJHtzdHJ9YDsgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVllYXIoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9beVldKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ1lZWVknOlxuICAgIGNhc2UgJ1lZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RnVsbFllYXIoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoXG4gICAgICAgIHN0ci5yZXBsYWNlKG1hdGNoLCBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgtMikpLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU1vbnRoKHN0ciwgZGF0ZSkge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvW21NXSsvKTtcbiAgaWYgKCFtYXRjaCkgeyByZXR1cm4gc3RyOyB9XG4gIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICBjYXNlICdNJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlTW9udGgoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0TW9udGgoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdNTSc6IHtcbiAgICAgIGNvbnN0IHplcm9MZWFkaW5nTW9udGggPSB6ZXJvTGVhZGluZyhkYXRlLmdldE1vbnRoKCkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdNb250aCksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdNTU0nOlxuICAgIGNhc2UgJ01NTU0nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChcbiAgICAgICAgc3RyLnJlcGxhY2UobWF0Y2gsIE1PTlRIX05BTUVTW2RhdGUuZ2V0TW9udGgoKSAtIDFdKSwgZGF0ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VEYXkoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bZERdKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ0QnOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RGF0ZSgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ0REJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdEYXRlID0gemVyb0xlYWRpbmcoZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIHplcm9MZWFkaW5nRGF0ZSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdkJzpcbiAgICBjYXNlICdkZCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgQUJCUl9EQVlTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2RkZCc6XG4gICAgY2FzZSAnZGRkZCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgREFZU19OQU1FU1tkYXRlLmdldERheSgpXSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FyYXNobS9KRGF0ZVxuICogQGF1dGhvcjogQXJhc2ggTW91c2F2aVxuICovXG5cbmltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInO1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKRGF0ZSB7XG4gIC8qXG4gICAqIEFjY2VwdHMgYSBKYWxhbGkgZGF0ZSBhcyBhbiBhcnJheSBvciBhcyB0aHJlZSBudW1iZXJzLCBhIERhdGUgb2JqZWN0LCBvclxuICAgKiBub3RoaW5nIGF0IGFsbCAod2hpY2ggZGVmYXVsdHMgdG8gdG9kYXkpLlxuICAgKlxuICAgKiBJbnN0YW5jZSBzdGF0ZTpcbiAgICogICB0aGlzLmRhdGUgICB7QXJyYXl9ICB0aGUgSmFsYWxpIGRhdGUgYXMgW3llYXIsIG1vbnRoLCBkYXldXG4gICAqICAgdGhpcy5fZCAgICAge0RhdGV9ICAgdGhlIEdyZWdvcmlhbiBlcXVpdmFsZW50LCBrZXB0IGluIHN5bmMgYnkgdGhlIHNldHRlcnNcbiAgICogICB0aGlzLmlucHV0ICB7QXJyYXl8RGF0ZX0gIHdoYXRldmVyIHdhcyBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yOyBzZXR0ZXJzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbyBub3QgdG91Y2ggaXRcbiAgICovXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzBdKSB8fCBhcmdzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgW3RoaXMuaW5wdXRdID0gYXJncztcbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICB0aGlzLmlucHV0ID0gYXJncztcbiAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgdGhpcy5pbnB1dCA9IG5ldyBEYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBpbnB1dCcpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuaW5wdXQpKSB7XG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmlucHV0Lm1hcCgobnVtKSA9PiBwYXJzZUludChudW0sIDEwKSk7XG4gICAgICB0aGlzLl9kID0gdGhpcy50b0dyZWdvcmlhbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHRoaXMuX2QgPSB0aGlzLmlucHV0O1xuICAgICAgdGhpcy5kYXRlID0gSkRhdGUudG9KYWxhbGkodGhpcy5pbnB1dCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQ292ZXJ0cyBhIEdyZWdvcmlhbiBkYXRlIHRvIEphbGFsaSBkYXRlXG4gICAqXG4gICAqIEBwYXJhbXMge0RhdGV9IGRhdGVcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgdG9KYWxhbGkoZGF0ZSkge1xuICAgIGNvbnN0IGZpeGVkRGF0ZSA9IENvbnZlcnRlci5ncmVnb3JpYW5Ub0ZpeGVkKFxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgIGRhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcbiAgICBjb25zdCBqZGF0ZSA9IENvbnZlcnRlci5maXhlZFRvSmFsYWxpKGZpeGVkRGF0ZSk7XG5cbiAgICByZXR1cm4gamRhdGU7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXRpYyB0b19qYWxhbGkoZGF0ZSkgeyByZXR1cm4gSkRhdGUudG9KYWxhbGkoZGF0ZSk7IH1cblxuICAvKlxuICAgKiBjb252ZXJ0cyBhIEphbGFsaSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IGRheVxuICAgKiBAcmV0dXJuIHtEYXRlfVxuICAgKi9cbiAgc3RhdGljIHRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBnZGF0ZSA9IENvbnZlcnRlci5maXhlZFRvR3JlZ29yaWFuKFxuICAgICAgQ29udmVydGVyLmphbGFsaVRvRml4ZWQoeWVhciwgbW9udGgsIGRheSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKCtnZGF0ZVswXSwgK2dkYXRlWzFdIC0gMSwgK2dkYXRlWzJdKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc3RhdGljIHRvX2dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7IHJldHVybiBKRGF0ZS50b0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KTsgfVxuXG4gIC8qXG4gICAqIENoZWNrcyBpZiBhIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXIgb3Igbm90XG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHJldHVybiBDb252ZXJ0ZXIubGVhcFBlcnNpYW4oeWVhcik7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIG1vbnRoIGxlbmd0aC5cbiAgICpcbiAgICogTm90ZTogYG1vbnRoYCBpcyBaRVJPIGJhc2VkIGhlcmUgKDAgaXMg2YHYsdmI2LHYr9uM2YYsIDExIGlzINin2LPZgdmG2K8pLCB1bmxpa2VcbiAgICogZ2V0TW9udGgvc2V0TW9udGggd2hpY2ggYXJlIG9uZSBiYXNlZC4gT3V0LW9mLXJhbmdlIHZhbHVlcyBjYXJyeSBpbnRvIHRoZVxuICAgKiB5ZWFyLCBzbyBkYXlzSW5Nb250aCgxMzk1LCAxMikgaXMg2YHYsdmI2LHYr9uM2YYgb2YgMTM5Ni5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGggemVybyBiYXNlZFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICBjb25zdCBjYWxjZWRZZWFyID0geWVhciArIE1hdGguZmxvb3IobW9udGggLyAxMik7XG4gICAgY29uc3QgY2FsY2VkTW9udGggPSAoKG1vbnRoICUgMTIpICsgMTIpICUgMTI7XG5cbiAgICBpZiAoY2FsY2VkTW9udGggPCA2KSB7XG4gICAgICByZXR1cm4gMzE7XG4gICAgfVxuICAgIGlmIChjYWxjZWRNb250aCA8IDExKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfVxuICAgIGlmIChKRGF0ZS5pc0xlYXBZZWFyKGNhbGNlZFllYXIpKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfVxuICAgIHJldHVybiAyOTtcbiAgfVxuXG4gIC8qXG4gICAqIENvbnZlcnRzIEpEYXRlIGRhdGUgdG8gR3JlZ29yaWFuXG4gICAqL1xuICB0b0dyZWdvcmlhbigpIHtcbiAgICByZXR1cm4gSkRhdGUudG9HcmVnb3JpYW4odGhpcy5kYXRlWzBdLCB0aGlzLmRhdGVbMV0sIHRoaXMuZGF0ZVsyXSk7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkncyBmdWxsIHllYXIsIGV4OiAxMzkzXG4gICAqXG4gICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAqL1xuICBnZXRGdWxsWWVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzBdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyB0aGUgSmFsYWxpIGZ1bGwgeWVhclxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHJldHVybiB7SkRhdGV9XG4gICAqL1xuICBzZXRGdWxsWWVhcih5ZWFyKSB7XG4gICAgdGhpcy5kYXRlWzBdID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgIHRoaXMuX2QgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkgbW9udGggbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDEyLlxuICAgKlxuICAgKiBOb3RlOiB1bmxpa2UgRGF0ZSNnZXRNb250aCwgdGhpcyBpcyBvbmUtYmFzZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gSmFsYWxpIG1vbnRoIG51bWJlclxuICAgKi9cbiAgZ2V0TW9udGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVsxXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgdGhlIEphbGFsaSBtb250aCBudW1iZXIuIEFuIGludGVnZXIgYmV0d2VlbiAxIGFuZCAxMi5cbiAgICpcbiAgICogTm90ZTogdW5saWtlIERhdGUjc2V0TW9udGgsIHRoaXMgaXMgb25lLWJhc2VkLiBWYWx1ZXMgb3V0c2lkZSAxLi4xMiByb2xsXG4gICAqIHRoZSB5ZWFyIG92ZXIsIHNvIHNldE1vbnRoKDEzKSBpcyBtb250aCAxIG9mIHRoZSBmb2xsb3dpbmcgeWVhci5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcmV0dXJucyB7SkRhdGV9XG4gICAqL1xuICBzZXRNb250aChtb250aCkge1xuICAgIGNvbnN0IGZpeGVkID0gaGVscGVycy5maXhNb250aCh0aGlzLmdldEZ1bGxZZWFyKCksIHBhcnNlSW50KG1vbnRoLCAxMCkpO1xuICAgIFt0aGlzLmRhdGVbMF0sIHRoaXMuZGF0ZVsxXV0gPSBmaXhlZDtcbiAgICB0aGlzLl9kID0gdGhpcy50b0dyZWdvcmlhbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkgZGF5IG51bWJlci4gQSBudW1iZXIgYmV0d2VlbiAxIGFuZCAzMVxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBkYXkgbnVtYmVyXG4gICAqL1xuICBnZXREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMl07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIEphbGFsaSBkYXkgbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDMxXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0gZGF0ZVxuICAgKiBAcmV0dXJuIHtKRGF0ZX1cbiAgICovXG4gIHNldERhdGUoZGF0ZSkge1xuICAgIHRoaXMuZGF0ZVsyXSA9IHBhcnNlSW50KGRhdGUsIDEwKTtcbiAgICB0aGlzLl9kID0gdGhpcy50b0dyZWdvcmlhbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIHRoZSBzcGVjaWZpZWQgZGF0ZS4gQSBudW1iZXIgYmV0d2VlbiAwIHRvIDZcbiAgICpcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGdldERheSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZC5nZXREYXkoKTtcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgYSBmb3JtYXRlZCBvdXRwdXQgb2YgY3VycmVudCBkYXRlXG4gICAqXG4gICAqIEBwYXJhbXMge1N0cmluZ30gZm9ybWF0XG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGZvcm1hdChmb3JtYXQpIHtcbiAgICBsZXQgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlWWVhcihmb3JtYXQsIHRoaXMpO1xuICAgIHJlc3VsdCA9IGhlbHBlcnMucmVwbGFjZU1vbnRoKHJlc3VsdCwgdGhpcyk7XG4gICAgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlRGF5KHJlc3VsdCwgdGhpcyk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTU9OVEhfTkFNRVMiLCJBQkJSX0RBWVMiLCJEQVlTX05BTUVTIiwiR1JFR09SSUFOX0VQT0NIIiwiUEVSU0lBTl9FUE9DSCIsIlBFUlNJQU5fQ1lDTEVfREFZUyIsIk5PTl9MRUFQX0NPUlJFQ1RJT04iLCJkaXZDZWlsIiwiQ29udmVydGVyIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJncmVnb3JpYW5Ub0ZpeGVkIiwieWVhciIsIm1vbnRoIiwiZGF5IiwicmVzdWx0IiwiTWF0aCIsImZsb29yIiwibGVhcEdyZWdvcmlhbiIsImdyZWdvcmlhblllYXJGcm9tRml4ZWQiLCJkYXRlIiwiZDAiLCJuNDAwIiwiZDEiLCJuMTAwIiwiZDIiLCJuNCIsImQzIiwibjEiLCJncmVnb3JpYW5OZXdZZWFyIiwiZml4ZWRUb0dyZWdvcmlhbiIsInByaW9yRGF5cyIsImNvcnJlY3Rpb24iLCJqYWxhbGlUb0ZpeGVkIiwibmV3WWVhciIsImluY2x1ZGVzIiwiZml4ZWRUb0phbGFsaSIsImZpeGVkRGF0ZSIsImRheXNTaW5jZUVwb2NoIiwiZGF5T2ZZZWFyIiwibGVhcFBlcnNpYW4iLCJqZGF0ZSIsImRlZmF1bHQiLCJhIiwiYiIsImZpeE1vbnRoIiwieWVhckRpZmYiLCJuZXdNb250aCIsInplcm9MZWFkaW5nIiwic3RyIiwibGVuZ3RoIiwiY29uY2F0IiwicmVwbGFjZVllYXIiLCJtYXRjaCIsInJlcGxhY2UiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsInNsaWNlIiwicmVwbGFjZU1vbnRoIiwiZ2V0TW9udGgiLCJ6ZXJvTGVhZGluZ01vbnRoIiwidG9TdHJpbmciLCJyZXBsYWNlRGF5IiwiZ2V0RGF0ZSIsInplcm9MZWFkaW5nRGF0ZSIsImdldERheSIsImhlbHBlcnMiLCJKRGF0ZSIsIl9sZW4iLCJhcmd1bWVudHMiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiaXNBcnJheSIsIkRhdGUiLCJpbnB1dCIsIkVycm9yIiwibWFwIiwibnVtIiwicGFyc2VJbnQiLCJfZCIsInRvR3JlZ29yaWFuIiwidG9KYWxhbGkiLCJzZXRGdWxsWWVhciIsInNldE1vbnRoIiwiZml4ZWQiLCJfZml4ZWQiLCJfc2xpY2VkVG9BcnJheSIsInNldERhdGUiLCJmb3JtYXQiLCJ0b19qYWxhbGkiLCJnZGF0ZSIsInRvX2dyZWdvcmlhbiIsImlzTGVhcFllYXIiLCJkYXlzSW5Nb250aCIsImNhbGNlZFllYXIiLCJjYWxjZWRNb250aCJdLCJzb3VyY2VSb290IjoiIn0=