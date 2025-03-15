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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((module) => {

module.exports = {
  MONTH_NAMES: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  ABBR_DAYS: ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'],
  DAYS_NAMES: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  GREGORIAN_EPOCH: 1,
  GREGORIAN_TO_FIXED_OFFSET: 719528,
  PERSIAN_EPOCH: 226896,
  PERSIAN_CYCLE_DAYS: 12053,
  NON_LEAP_CORRECTION: [1502, 1601, 1634, 1667, 1700, 1733, 1766, 1799, 1832, 1865, 1898, 1931, 1964, 1997, 2030, 2059, 2063, 2096, 2129, 2158, 2162, 2191, 2195, 2224, 2228, 2257, 2261, 2290, 2294, 2323, 2327, 2356, 2360, 2389, 2393, 2422, 2426, 2455, 2459, 2488, 2492, 2521, 2525, 2554, 2558, 2587, 2591, 2620, 2624, 2653, 2657, 2686, 2690, 2719, 2723, 2748, 2752, 2756, 2781, 2785, 2789, 2818, 2822, 2847, 2851, 2855, 2880, 2884, 2888, 2913, 2917, 2921, 2946, 2950, 2954, 2979, 2983, 2987]
};

/***/ }),

/***/ "./src/converter.js":
/*!**************************!*\
  !*** ./src/converter.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Converter)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_1__);
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
      if (date < Converter.gregorianToFixed([year, 3, 1])) {
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

"use strict";
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-unused-vars */


function divCeil(a, b) {
  return Math.floor((a + b - 1) / b);
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
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
      var fixed = _helpers__WEBPACK_IMPORTED_MODULE_1__.fixMonth(this.getFullYear(), parseInt(month, 10));
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
}();

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQUU7O0lBRXBGO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUxFO0lBQUFMLEdBQUE7SUFBQUMsS0FBQSxFQU1BLFNBQUFtRixXQUFrQmpGLElBQUksRUFBRTtNQUN0QixPQUFPTixrREFBUyxDQUFDa0MsV0FBVyxDQUFDNUIsSUFBSSxDQUFDO0lBQ3BDOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQUgsR0FBQTtJQUFBQyxLQUFBLEVBT0EsU0FBQW9GLFlBQW1CbEYsSUFBSSxFQUFFQyxLQUFLLEVBQUU7TUFDOUIsSUFBSWtGLFVBQVUsR0FBR25GLElBQUksR0FBR0ksSUFBSSxDQUFDQyxLQUFLLENBQUNKLEtBQUssR0FBRyxFQUFFLENBQUM7TUFDOUMsSUFBSW1GLFdBQVcsR0FBR25GLEtBQUssR0FBSUcsSUFBSSxDQUFDQyxLQUFLLENBQUNKLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFHO01BRXZELElBQUltRixXQUFXLEdBQUcsQ0FBQyxFQUFFO1FBQ25CQSxXQUFXLElBQUksRUFBRTtRQUNqQkQsVUFBVSxJQUFJLENBQUM7TUFDakIsQ0FBQyxNQUFNLElBQUlDLFdBQVcsS0FBSyxDQUFDLEVBQUU7UUFDNUJBLFdBQVcsR0FBRyxFQUFFO01BQ2xCO01BRUEsSUFBSUEsV0FBVyxHQUFHLENBQUMsRUFBRTtRQUNuQixPQUFPLEVBQUU7TUFDWDtNQUFFLElBQUlBLFdBQVcsR0FBRyxFQUFFLEVBQUU7UUFDdEIsT0FBTyxFQUFFO01BQ1g7TUFBRSxJQUFJN0IsS0FBSyxDQUFDMEIsVUFBVSxDQUFDRSxVQUFVLENBQUMsRUFBRTtRQUNsQyxPQUFPLEVBQUU7TUFDWDtNQUNBLE9BQU8sRUFBRTtJQUNYO0VBQUM7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL0pEYXRlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29udmVydGVyLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0pEYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9qZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkpEYXRlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNT05USF9OQU1FUzogWyfZgdix2YjYsdiv24zZhicsICfYp9ix2K/bjNio2YfYtNiqJywgJ9iu2LHYr9in2K8nLCAn2KrbjNixJywgJ9in2YXYsdiv2KfYrycsICfYtNmH2LHbjNmI2LEnLCAn2YXZh9ixJywgJ9ii2KjYp9mGJywgJ9ii2LDYsScsICfYr9uMJywgJ9io2YfZhdmGJywgJ9in2LPZgdmG2K8nXSxcbiAgQUJCUl9EQVlTOiBbJ9ux2LQnLCAn27LYtCcsICfbs9i0JywgJ9u02LQnLCAn27XYtCcsICfYrCcsICfYtCddLFxuICBEQVlTX05BTUVTOiBbJ9uM2qnYtNmG2KjZhycsICfYr9mI2LTZhtio2YcnLCAn2LPZh+KAjNi02YbYqNmHJywgJ9qG2YfYp9ix2LTZhtio2YcnLCAn2b7Zhtis4oCM2LTZhtio2YcnLCAn2KzZhdi52YcnLCAn2LTZhtio2YcnXSxcbiAgR1JFR09SSUFOX0VQT0NIOiAxLFxuICBHUkVHT1JJQU5fVE9fRklYRURfT0ZGU0VUOiA3MTk1MjgsXG4gIFBFUlNJQU5fRVBPQ0g6IDIyNjg5NixcbiAgUEVSU0lBTl9DWUNMRV9EQVlTOiAxMjA1MyxcbiAgTk9OX0xFQVBfQ09SUkVDVElPTjogW1xuICAgIDE1MDIsXG4gICAgMTYwMSwgMTYzNCwgMTY2NyxcbiAgICAxNzAwLCAxNzMzLCAxNzY2LCAxNzk5LFxuICAgIDE4MzIsIDE4NjUsIDE4OTgsXG4gICAgMTkzMSwgMTk2NCwgMTk5NyxcbiAgICAyMDMwLCAyMDU5LCAyMDYzLCAyMDk2LFxuICAgIDIxMjksIDIxNTgsIDIxNjIsIDIxOTEsIDIxOTUsXG4gICAgMjIyNCwgMjIyOCwgMjI1NywgMjI2MSwgMjI5MCwgMjI5NCxcbiAgICAyMzIzLCAyMzI3LCAyMzU2LCAyMzYwLCAyMzg5LCAyMzkzLFxuICAgIDI0MjIsIDI0MjYsIDI0NTUsIDI0NTksIDI0ODgsIDI0OTIsXG4gICAgMjUyMSwgMjUyNSwgMjU1NCwgMjU1OCwgMjU4NywgMjU5MSxcbiAgICAyNjIwLCAyNjI0LCAyNjUzLCAyNjU3LCAyNjg2LCAyNjkwLFxuICAgIDI3MTksIDI3MjMsIDI3NDgsIDI3NTIsIDI3NTYsIDI3ODEsIDI3ODUsIDI3ODksXG4gICAgMjgxOCwgMjgyMiwgMjg0NywgMjg1MSwgMjg1NSwgMjg4MCwgMjg4NCwgMjg4OCxcbiAgICAyOTEzLCAyOTE3LCAyOTIxLCAyOTQ2LCAyOTUwLCAyOTU0LCAyOTc5LCAyOTgzLCAyOTg3XG4gIF1cbn07XG4iLCJpbXBvcnQgeyBkaXZDZWlsIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7XG4gIEdSRUdPUklBTl9FUE9DSCwgUEVSU0lBTl9FUE9DSCwgTk9OX0xFQVBfQ09SUkVDVElPTiwgUEVSU0lBTl9DWUNMRV9EQVlTXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udmVydGVyIHtcbiAgc3RhdGljIGdyZWdvcmlhblRvRml4ZWQoeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IEdSRUdPUklBTl9FUE9DSCAtIDFcbiAgICAgICAgKyAzNjUgKiAoeWVhciAtIDEpXG4gICAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNClcbiAgICAgICAgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApXG4gICAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKVxuICAgICAgICArIE1hdGguZmxvb3IoKDM2NyAqIG1vbnRoIC0gMzYyKSAvIDEyKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgKyAobW9udGggPD0gMiA/IDAgOiBDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSA/IC0xIDogLTIpXG4gICAgICAgICsgZGF5O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZ3JlZ29yaWFuWWVhckZyb21GaXhlZChkYXRlKSB7XG4gICAgY29uc3QgZDAgPSBkYXRlIC0gR1JFR09SSUFOX0VQT0NIO1xuICAgIGNvbnN0IG40MDAgPSBNYXRoLmZsb29yKGQwIC8gMTQ2MDk3KTtcbiAgICBjb25zdCBkMSA9IGQwICUgMTQ2MDk3O1xuICAgIGNvbnN0IG4xMDAgPSBNYXRoLmZsb29yKGQxIC8gMzY1MjQpO1xuICAgIGNvbnN0IGQyID0gZDEgJSAzNjUyNDtcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IoZDIgLyAxNDYxKTtcbiAgICBjb25zdCBkMyA9IGQyICUgMTQ2MTtcbiAgICBjb25zdCBuMSA9IE1hdGguZmxvb3IoZDMgLyAzNjUpO1xuICAgIGNvbnN0IHllYXIgPSA0MDAgKiBuNDAwICsgMTAwICogbjEwMCArIDQgKiBuNCArIG4xO1xuICAgIGlmIChuMTAwID09PSA0IHx8IG4xID09PSA0KSB7XG4gICAgICByZXR1cm4geWVhcjtcbiAgICB9XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9XG5cbiAgc3RhdGljIGdyZWdvcmlhbk5ld1llYXIoeWVhcikge1xuICAgIHJldHVybiBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9GaXhlZCh5ZWFyLCAxLCAxKTtcbiAgfVxuXG4gIHN0YXRpYyBmaXhlZFRvR3JlZ29yaWFuKGRhdGUpIHtcbiAgICBjb25zdCB5ZWFyID0gQ29udmVydGVyLmdyZWdvcmlhblllYXJGcm9tRml4ZWQoZGF0ZSk7XG4gICAgY29uc3QgcHJpb3JEYXlzID0gZGF0ZSAtIENvbnZlcnRlci5ncmVnb3JpYW5OZXdZZWFyKHllYXIpO1xuICAgIGxldCBjb3JyZWN0aW9uO1xuICAgIGlmIChkYXRlIDwgQ29udmVydGVyLmdyZWdvcmlhblRvRml4ZWQoW3llYXIsIDMsIDFdKSkge1xuICAgICAgY29ycmVjdGlvbiA9IDA7XG4gICAgfSBlbHNlIGlmIChDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSkge1xuICAgICAgY29ycmVjdGlvbiA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvcnJlY3Rpb24gPSAyO1xuICAgIH1cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKDEyICogKHByaW9yRGF5cyArIGNvcnJlY3Rpb24pICsgMzczKSAvIDM2Nyk7XG4gICAgY29uc3QgZGF5ID0gZGF0ZSAtIENvbnZlcnRlci5ncmVnb3JpYW5Ub0ZpeGVkKHllYXIsIG1vbnRoLCAxKSArIDE7XG4gICAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XTtcbiAgfVxuXG4gIHN0YXRpYyBqYWxhbGlUb0ZpeGVkKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBsZXQgbmV3WWVhciA9IFBFUlNJQU5fRVBPQ0ggLSAxICsgMzY1ICogKHllYXIgLSAxKSArIE1hdGguZmxvb3IoKDggKiB5ZWFyICsgMjEpIC8gMzMpO1xuICAgIGlmIChOT05fTEVBUF9DT1JSRUNUSU9OLmluY2x1ZGVzKHllYXIgLSAxKSkge1xuICAgICAgbmV3WWVhciAtPSAxO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgbmV3WWVhciAtIDFcbiAgICAgICAgKyAoKG1vbnRoIDw9IDcpID8gMzEgKiAobW9udGggLSAxKSA6IDMwICogKG1vbnRoIC0gMSkgKyA2KVxuICAgICAgICArIGRheVxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgZml4ZWRUb0phbGFsaShmaXhlZERhdGUpIHtcbiAgICBjb25zdCBkYXlzU2luY2VFcG9jaCA9IGZpeGVkRGF0ZSAtIENvbnZlcnRlci5qYWxhbGlUb0ZpeGVkKDEsIDEsIDEpO1xuICAgIGxldCB5ZWFyID0gMSArIE1hdGguZmxvb3IoKDMzICogZGF5c1NpbmNlRXBvY2ggKyAzKSAvIFBFUlNJQU5fQ1lDTEVfREFZUyk7XG4gICAgbGV0IGRheU9mWWVhciA9IGZpeGVkRGF0ZSAtIENvbnZlcnRlci5qYWxhbGlUb0ZpeGVkKHllYXIsIDEsIDEpICsgMTtcblxuICAgIGlmIChkYXlPZlllYXIgPT09IDM2NiAmJiBOT05fTEVBUF9DT1JSRUNUSU9OLmluY2x1ZGVzKHllYXIpKSB7XG4gICAgICB5ZWFyICs9IDE7XG4gICAgICBkYXlPZlllYXIgPSAxO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoID0gKGRheU9mWWVhciA8PSAxODYpID8gZGl2Q2VpbChkYXlPZlllYXIsIDMxKSA6IGRpdkNlaWwoZGF5T2ZZZWFyIC0gNiwgMzApO1xuICAgIGNvbnN0IGRheSA9IGZpeGVkRGF0ZSAtIENvbnZlcnRlci5qYWxhbGlUb0ZpeGVkKHllYXIsIG1vbnRoLCAxKSArIDE7XG5cbiAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldO1xuICB9XG5cbiAgc3RhdGljIGxlYXBQZXJzaWFuKGpkYXRlKSB7XG4gICAgaWYgKE5PTl9MRUFQX0NPUlJFQ1RJT04uaW5jbHVkZXMoamRhdGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBpZiAoTk9OX0xFQVBfQ09SUkVDVElPTi5pbmNsdWRlcyhqZGF0ZSAtIDEpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuICgyNSAqIGpkYXRlICsgMTEpICUgMzMgPCA4O1xuICB9XG5cbiAgc3RhdGljIGxlYXBHcmVnb3JpYW4oeWVhcikge1xuICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgIVsxMDAsIDIwMCwgMzAwXS5pbmNsdWRlcyh5ZWFyICUgNDAwKSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmltcG9ydCB7XG4gIE1PTlRIX05BTUVTLFxuICBBQkJSX0RBWVMsXG4gIERBWVNfTkFNRVNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2Q2VpbChhLCBiKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKChhICsgYiAtIDEpIC8gYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXhNb250aCh5ZWFyLCBtb250aCkge1xuICBpZiAobW9udGggPiAxMiB8fCBtb250aCA8PSAwKSB7XG4gICAgY29uc3QgeWVhckRpZmYgPSBNYXRoLmZsb29yKChtb250aCAtIDEpIC8gMTIpO1xuICAgIGNvbnN0IG5ld1llYXIgPSB5ZWFyIC0geWVhckRpZmY7XG4gICAgY29uc3QgbmV3TW9udGggPSBtb250aCAtICh5ZWFyRGlmZiAqIDEyKTtcblxuICAgIHJldHVybiBbbmV3WWVhciwgbmV3TW9udGhdO1xuICB9XG5cbiAgcmV0dXJuIFt5ZWFyLCBtb250aF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvTGVhZGluZyhzdHIpIHtcbiAgaWYgKHN0ciAmJiBzdHIubGVuZ3RoID09PSAxKSB7IHJldHVybiBgMCR7c3RyfWA7IH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VZZWFyKHN0ciwgZGF0ZSkge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvW3lZXSsvKTtcbiAgaWYgKCFtYXRjaCkgeyByZXR1cm4gc3RyOyB9XG4gIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICBjYXNlICdZWVlZJzpcbiAgICBjYXNlICdZWVknOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VZZWFyKHN0ci5yZXBsYWNlKG1hdGNoLCBkYXRlLmdldEZ1bGxZZWFyKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnWVknOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VZZWFyKFxuICAgICAgICBzdHIucmVwbGFjZShtYXRjaCwgU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoMikpLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU1vbnRoKHN0ciwgZGF0ZSkge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvW21NXSsvKTtcbiAgaWYgKCFtYXRjaCkgeyByZXR1cm4gc3RyOyB9XG4gIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICBjYXNlICdNJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlTW9udGgoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0TW9udGgoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdNTSc6IHtcbiAgICAgIGNvbnN0IHplcm9MZWFkaW5nTW9udGggPSB6ZXJvTGVhZGluZyhkYXRlLmdldE1vbnRoKCkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdNb250aCksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdNTU0nOlxuICAgIGNhc2UgJ01NTU0nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChcbiAgICAgICAgc3RyLnJlcGxhY2UobWF0Y2gsIE1PTlRIX05BTUVTW2RhdGUuZ2V0TW9udGgoKSAtIDFdKSwgZGF0ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VEYXkoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bZERdKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ0QnOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RGF0ZSgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ0REJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdEYXRlID0gemVyb0xlYWRpbmcoZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VEYXkoc3RyLnJlcGxhY2UobWF0Y2gsIHplcm9MZWFkaW5nRGF0ZSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdkJzpcbiAgICBjYXNlICdkZCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgQUJCUl9EQVlTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2RkZCc6XG4gICAgY2FzZSAnZGRkZCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgREFZU19OQU1FU1tkYXRlLmdldERheSgpXSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJhc2htL0pEYXRlXG4gKiBAYXV0aG9yOiBBcmFzaCBNb3VzYXZpXG4gKi9cblxuaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcic7XG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpEYXRlIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbMF0pIHx8IGFyZ3NbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBbdGhpcy5pbnB1dF0gPSBhcmdzO1xuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgIHRoaXMuaW5wdXQgPSBhcmdzO1xuICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICB0aGlzLmlucHV0ID0gbmV3IERhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGlucHV0Jyk7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5pbnB1dCkpIHtcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuaW5wdXQubWFwKChudW0pID0+IHBhcnNlSW50KG51bSwgMTApKTtcbiAgICAgIHRoaXMuX2QgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlucHV0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdGhpcy5fZCA9IHRoaXMuaW5wdXQ7XG4gICAgICB0aGlzLmRhdGUgPSBKRGF0ZS50b0phbGFsaSh0aGlzLmlucHV0KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBDb3ZlcnRzIGEgR3JlZ29yaWFuIGRhdGUgdG8gSmFsYWxpIGRhdGVcbiAgICpcbiAgICogQHBhcmFtcyB7RGF0ZX0gZGF0ZVxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyB0b0phbGFsaShkYXRlKSB7XG4gICAgY29uc3QgZml4ZWREYXRlID0gQ29udmVydGVyLmdyZWdvcmlhblRvRml4ZWQoXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBkYXRlLmdldE1vbnRoKCkgKyAxLFxuICAgICAgZGF0ZS5nZXREYXRlKClcbiAgICApO1xuICAgIGNvbnN0IGpkYXRlID0gQ29udmVydGVyLmZpeGVkVG9KYWxhbGkoZml4ZWREYXRlKTtcblxuICAgIHJldHVybiBqZGF0ZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc3RhdGljIHRvX2phbGFsaShkYXRlKSB7IHJldHVybiBKRGF0ZS50b0phbGFsaShkYXRlKTsgfVxuXG4gIC8qXG4gICAqIGNvbnZlcnRzIGEgSmFsYWxpIGRhdGUgdG8gR3JlZ29yaWFuXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IG1vbnRoXG4gICAqIEBwYXJhbXMge051bWJlcn0gZGF5XG4gICAqIEByZXR1cm4ge0RhdGV9XG4gICAqL1xuICBzdGF0aWMgdG9HcmVnb3JpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGdkYXRlID0gQ29udmVydGVyLmZpeGVkVG9HcmVnb3JpYW4oXG4gICAgICBDb252ZXJ0ZXIuamFsYWxpVG9GaXhlZCh5ZWFyLCBtb250aCwgZGF5KVxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IERhdGUoK2dkYXRlWzBdLCArZ2RhdGVbMV0gLSAxLCArZ2RhdGVbMl0pO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBzdGF0aWMgdG9fZ3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHsgcmV0dXJuIEpEYXRlLnRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpOyB9XG5cbiAgLypcbiAgICogQ2hlY2tzIGlmIGEgZ2l2ZW4geWVhciBpcyBhIGxlYXAgeWVhciBvciBub3RcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgcmV0dXJuIENvbnZlcnRlci5sZWFwUGVyc2lhbih5ZWFyKTtcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgbW9udGggbGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aCB6ZXJvIGJhc2VkXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIHN0YXRpYyBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgIGxldCBjYWxjZWRZZWFyID0geWVhciAtIE1hdGguZmxvb3IobW9udGggLyAxMik7XG4gICAgbGV0IGNhbGNlZE1vbnRoID0gbW9udGggLSAoTWF0aC5mbG9vcihtb250aCAvIDEyKSAqIDEyKTtcblxuICAgIGlmIChjYWxjZWRNb250aCA8IDApIHtcbiAgICAgIGNhbGNlZE1vbnRoICs9IDEyO1xuICAgICAgY2FsY2VkWWVhciAtPSAxO1xuICAgIH0gZWxzZSBpZiAoY2FsY2VkTW9udGggPT09IDApIHtcbiAgICAgIGNhbGNlZE1vbnRoID0gMTI7XG4gICAgfVxuXG4gICAgaWYgKGNhbGNlZE1vbnRoIDwgNikge1xuICAgICAgcmV0dXJuIDMxO1xuICAgIH0gaWYgKGNhbGNlZE1vbnRoIDwgMTEpIHtcbiAgICAgIHJldHVybiAzMDtcbiAgICB9IGlmIChKRGF0ZS5pc0xlYXBZZWFyKGNhbGNlZFllYXIpKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfVxuICAgIHJldHVybiAyOTtcbiAgfVxuXG4gIC8qXG4gICAqIENvbnZlcnRzIEpEYXRlIGRhdGUgdG8gR3JlZ29yaWFuXG4gICAqL1xuICB0b0dyZWdvcmlhbigpIHtcbiAgICByZXR1cm4gSkRhdGUudG9HcmVnb3JpYW4odGhpcy5kYXRlWzBdLCB0aGlzLmRhdGVbMV0sIHRoaXMuZGF0ZVsyXSk7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkncyBmdWxsIHllYXIsIGV4OiAxMzkzXG4gICAqXG4gICAqIEByZXR1cm4ge0ludGVnZXJ9XG4gICAqL1xuICBnZXRGdWxsWWVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzBdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyB0aGUgSmFsYWxpIGZ1bGwgeWVhclxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHJldHVybiB7SkRhdGV9XG4gICAqL1xuICBzZXRGdWxsWWVhcih5ZWFyKSB7XG4gICAgdGhpcy5kYXRlWzBdID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkgbW9udGggbnVtYmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBtb250aCBudW1iZXJcbiAgICovXG4gIGdldE1vbnRoKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMV07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIHRoZSBKYWxhbGkgbW9udGggbnVtYmVyLiBBbiBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgMTFcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcmV0dXJucyB7SkRhdGV9XG4gICAqL1xuICBzZXRNb250aChtb250aCkge1xuICAgIGNvbnN0IGZpeGVkID0gaGVscGVycy5maXhNb250aCh0aGlzLmdldEZ1bGxZZWFyKCksIHBhcnNlSW50KG1vbnRoLCAxMCkpO1xuICAgIFt0aGlzLmRhdGVbMF0sIHRoaXMuZGF0ZVsxXV0gPSBmaXhlZDtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50b0dyZWdvcmlhbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBTaG93cyBKYWxhbGkgZGF5IG51bWJlci4gQSBudW1iZXIgYmV0d2VlbiAwIHRvIDMxXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gSmFsYWxpIGRheSBudW1iZXJcbiAgICovXG4gIGdldERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVsyXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgSmFsYWxpIGRheSBudW1iZXIuIEEgbnVtYmVyIGJldHdlZW4gMCB0byAzMVxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IGRhdGVcbiAgICogQHJldHVybiB7SkRhdGV9XG4gICAqL1xuICBzZXREYXRlKGRhdGUpIHtcbiAgICB0aGlzLmRhdGVbMl0gPSBwYXJzZUludChkYXRlLCAxMCk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0aGUgc3BlY2lmaWVkIGRhdGUuIEEgbnVtYmVyIGJldHdlZW4gMCB0byA2XG4gICAqXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBnZXREYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2QuZ2V0RGF5KCk7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIGEgZm9ybWF0ZWQgb3V0cHV0IG9mIGN1cnJlbnQgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW1zIHtTdHJpbmd9IGZvcm1hdFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBmb3JtYXQoZm9ybWF0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGhlbHBlcnMucmVwbGFjZVllYXIoZm9ybWF0LCB0aGlzKTtcbiAgICByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VNb250aChyZXN1bHQsIHRoaXMpO1xuICAgIHJlc3VsdCA9IGhlbHBlcnMucmVwbGFjZURheShyZXN1bHQsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJNT05USF9OQU1FUyIsIkFCQlJfREFZUyIsIkRBWVNfTkFNRVMiLCJHUkVHT1JJQU5fRVBPQ0giLCJHUkVHT1JJQU5fVE9fRklYRURfT0ZGU0VUIiwiUEVSU0lBTl9FUE9DSCIsIlBFUlNJQU5fQ1lDTEVfREFZUyIsIk5PTl9MRUFQX0NPUlJFQ1RJT04iLCJkaXZDZWlsIiwiQ29udmVydGVyIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJncmVnb3JpYW5Ub0ZpeGVkIiwieWVhciIsIm1vbnRoIiwiZGF5IiwicmVzdWx0IiwiTWF0aCIsImZsb29yIiwibGVhcEdyZWdvcmlhbiIsImdyZWdvcmlhblllYXJGcm9tRml4ZWQiLCJkYXRlIiwiZDAiLCJuNDAwIiwiZDEiLCJuMTAwIiwiZDIiLCJuNCIsImQzIiwibjEiLCJncmVnb3JpYW5OZXdZZWFyIiwiZml4ZWRUb0dyZWdvcmlhbiIsInByaW9yRGF5cyIsImNvcnJlY3Rpb24iLCJqYWxhbGlUb0ZpeGVkIiwibmV3WWVhciIsImluY2x1ZGVzIiwiZml4ZWRUb0phbGFsaSIsImZpeGVkRGF0ZSIsImRheXNTaW5jZUVwb2NoIiwiZGF5T2ZZZWFyIiwibGVhcFBlcnNpYW4iLCJqZGF0ZSIsImRlZmF1bHQiLCJhIiwiYiIsImZpeE1vbnRoIiwieWVhckRpZmYiLCJuZXdNb250aCIsInplcm9MZWFkaW5nIiwic3RyIiwibGVuZ3RoIiwiY29uY2F0IiwicmVwbGFjZVllYXIiLCJtYXRjaCIsInJlcGxhY2UiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsInNsaWNlIiwicmVwbGFjZU1vbnRoIiwiZ2V0TW9udGgiLCJ6ZXJvTGVhZGluZ01vbnRoIiwidG9TdHJpbmciLCJyZXBsYWNlRGF5IiwiZ2V0RGF0ZSIsInplcm9MZWFkaW5nRGF0ZSIsImdldERheSIsImhlbHBlcnMiLCJKRGF0ZSIsIl9sZW4iLCJhcmd1bWVudHMiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiaXNBcnJheSIsIkRhdGUiLCJpbnB1dCIsIkVycm9yIiwibWFwIiwibnVtIiwicGFyc2VJbnQiLCJfZCIsInRvR3JlZ29yaWFuIiwidG9KYWxhbGkiLCJzZXRGdWxsWWVhciIsInNldE1vbnRoIiwiZml4ZWQiLCJfZml4ZWQiLCJfc2xpY2VkVG9BcnJheSIsInNldERhdGUiLCJmb3JtYXQiLCJ0b19qYWxhbGkiLCJnZGF0ZSIsInRvX2dyZWdvcmlhbiIsImlzTGVhcFllYXIiLCJkYXlzSW5Nb250aCIsImNhbGNlZFllYXIiLCJjYWxjZWRNb250aCJdLCJzb3VyY2VSb290IjoiIn0=