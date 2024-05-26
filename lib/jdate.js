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
  GREGORIAN_EPOCH: 1721425.5,
  PERSIAN_EPOCH: 1948320.5,
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
    key: "leapGregorian",
    value:
    //  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year?
    function leapGregorian(year) {
      return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
    }

    // GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date
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
      return _constants__WEBPACK_IMPORTED_MODULE_1__.GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) + -Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12 + (pad + day));
    }

    //  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day
  }, {
    key: "julianToGregorian",
    value: function julianToGregorian(jd) {
      var wjd = Math.floor(jd - 0.5) + 0.5;
      var depoch = wjd - _constants__WEBPACK_IMPORTED_MODULE_1__.GREGORIAN_EPOCH;
      var quadricent = Math.floor(depoch / 146097);
      var dqc = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(depoch, 146097);
      var cent = Math.floor(dqc / 36524);
      var dcent = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(dqc, 36524);
      var quad = Math.floor(dcent / 1461);
      var dquad = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(dcent, 1461);
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
    }

    //  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?
  }, {
    key: "leapPersian",
    value: function leapPersian(year) {
      if (_constants__WEBPACK_IMPORTED_MODULE_1__.NON_LEAP_CORRECTION.includes(year)) {
        return false;
      }
      if (_constants__WEBPACK_IMPORTED_MODULE_1__.NON_LEAP_CORRECTION.includes(year - 1)) {
        return true;
      }
      return (25 * year + 11) % 33 < 8;
    }

    //  PERSIAN_TO_JD  --  Determine Julian day from Persian date
  }, {
    key: "persianToJulian",
    value: function persianToJulian(year, month, day) {
      var epbase = year - (year >= 0 ? 474 : 473);
      var epyear = 474 + (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(epbase, 2820);
      return day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + Math.floor((epyear * 682 - 110) / 2816) + (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983 + (_constants__WEBPACK_IMPORTED_MODULE_1__.PERSIAN_EPOCH - 1);
    }

    //  JD_TO_PERSIAN  --  Calculate Persian date from Julian day
  }, {
    key: "julianToPersian",
    value: function julianToPersian(jd) {
      var njd = Math.floor(jd) + 0.5;
      var depoch = njd - Converter.persianToJulian(475, 1, 1);
      var cycle = Math.floor(depoch / 1029983);
      var cyear = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(depoch, 1029983);
      var ycycle;
      if (cyear === 1029982) {
        ycycle = 2820;
      } else {
        var aux1 = Math.floor(cyear / 366);
        var aux2 = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(cyear, 366);
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
/* harmony export */   div: () => (/* binding */ div),
/* harmony export */   fixMonth: () => (/* binding */ fixMonth),
/* harmony export */   mod: () => (/* binding */ mod),
/* harmony export */   replaceDay: () => (/* binding */ replaceDay),
/* harmony export */   replaceMonth: () => (/* binding */ replaceMonth),
/* harmony export */   replaceYear: () => (/* binding */ replaceYear),
/* harmony export */   zeroLeading: () => (/* binding */ zeroLeading)
/* harmony export */ });
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
      var julianDate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate());
      var jdate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].julianToPersian(julianDate);
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
      var gdate = _converter__WEBPACK_IMPORTED_MODULE_0__["default"].julianToGregorian(_converter__WEBPACK_IMPORTED_MODULE_0__["default"].persianToJulian(year, month, day));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvY29udmVydGVyLmpzIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0pEYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9qZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkpEYXRlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpEYXRlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNT05USF9OQU1FUzogWyfZgdix2YjYsdiv24zZhicsICfYp9ix2K/bjNio2YfYtNiqJywgJ9iu2LHYr9in2K8nLCAn2KrbjNixJywgJ9in2YXYsdiv2KfYrycsICfYtNmH2LHbjNmI2LEnLCAn2YXZh9ixJywgJ9ii2KjYp9mGJywgJ9ii2LDYsScsICfYr9uMJywgJ9io2YfZhdmGJywgJ9in2LPZgdmG2K8nXSxcbiAgQUJCUl9EQVlTOiBbJ9ux2LQnLCAn27LYtCcsICfbs9i0JywgJ9u02LQnLCAn27XYtCcsICfYrCcsICfYtCddLFxuICBEQVlTX05BTUVTOiBbJ9uM2qnYtNmG2KjZhycsICfYr9mI2LTZhtio2YcnLCAn2LPZh+KAjNi02YbYqNmHJywgJ9qG2YfYp9ix2LTZhtio2YcnLCAn2b7Zhtis4oCM2LTZhtio2YcnLCAn2KzZhdi52YcnLCAn2LTZhtio2YcnXSxcbiAgR1JFR09SSUFOX0VQT0NIOiAxNzIxNDI1LjUsXG4gIFBFUlNJQU5fRVBPQ0g6IDE5NDgzMjAuNSxcbiAgTk9OX0xFQVBfQ09SUkVDVElPTjogW1xuICAgIDE1MDIsXG4gICAgMTYwMSwgMTYzNCwgMTY2NyxcbiAgICAxNzAwLCAxNzMzLCAxNzY2LCAxNzk5LFxuICAgIDE4MzIsIDE4NjUsIDE4OTgsXG4gICAgMTkzMSwgMTk2NCwgMTk5NyxcbiAgICAyMDMwLCAyMDU5LCAyMDYzLCAyMDk2LFxuICAgIDIxMjksIDIxNTgsIDIxNjIsIDIxOTEsIDIxOTUsXG4gICAgMjIyNCwgMjIyOCwgMjI1NywgMjI2MSwgMjI5MCwgMjI5NCxcbiAgICAyMzIzLCAyMzI3LCAyMzU2LCAyMzYwLCAyMzg5LCAyMzkzLFxuICAgIDI0MjIsIDI0MjYsIDI0NTUsIDI0NTksIDI0ODgsIDI0OTIsXG4gICAgMjUyMSwgMjUyNSwgMjU1NCwgMjU1OCwgMjU4NywgMjU5MSxcbiAgICAyNjIwLCAyNjI0LCAyNjUzLCAyNjU3LCAyNjg2LCAyNjkwLFxuICAgIDI3MTksIDI3MjMsIDI3NDgsIDI3NTIsIDI3NTYsIDI3ODEsIDI3ODUsIDI3ODksXG4gICAgMjgxOCwgMjgyMiwgMjg0NywgMjg1MSwgMjg1NSwgMjg4MCwgMjg4NCwgMjg4OCxcbiAgICAyOTEzLCAyOTE3LCAyOTIxLCAyOTQ2LCAyOTUwLCAyOTU0LCAyOTc5LCAyOTgzLCAyOTg3XG4gIF1cbn07XG4iLCJpbXBvcnQgeyBtb2QgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgR1JFR09SSUFOX0VQT0NILCBQRVJTSUFOX0VQT0NILCBOT05fTEVBUF9DT1JSRUNUSU9OIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXIge1xuICAvLyAgTEVBUF9HUkVHT1JJQU4gIC0tICBJcyBhIGdpdmVuIHllYXIgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciBhIGxlYXAgeWVhcj9cbiAgc3RhdGljIGxlYXBHcmVnb3JpYW4oeWVhcikge1xuICAgIHJldHVybiAoKHllYXIgJSA0KSA9PT0gMClcbiAgICAgICYmICghKCgoeWVhciAlIDEwMCkgPT09IDApICYmICgoeWVhciAlIDQwMCkgIT09IDApKSk7XG4gIH1cblxuICAvLyBHUkVHT1JJQU5fVE9fSkQgIC0tICBEZXRlcm1pbmUgSnVsaWFuIGRheSBudW1iZXIgZnJvbSBHcmVnb3JpYW4gY2FsZW5kYXIgZGF0ZVxuICBzdGF0aWMgZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGxldCBwYWQ7XG4gICAgaWYgKG1vbnRoIDw9IDIpIHtcbiAgICAgIHBhZCA9IDA7XG4gICAgfSBlbHNlIGlmIChDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSkge1xuICAgICAgcGFkID0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZCA9IC0yO1xuICAgIH1cblxuICAgIHJldHVybiAoR1JFR09SSUFOX0VQT0NIIC0gMSlcbiAgICAgICsgKDM2NSAqICh5ZWFyIC0gMSkpXG4gICAgICArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpXG4gICAgICArICgtTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSlcbiAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKVxuICAgICAgKyBNYXRoLmZsb29yKCgoKDM2NyAqIG1vbnRoKSAtIDM2MikgLyAxMikgKyAocGFkICsgZGF5KSk7XG4gIH1cblxuICAvLyAgSkRfVE9fR1JFR09SSUFOICAtLSAgQ2FsY3VsYXRlIEdyZWdvcmlhbiBjYWxlbmRhciBkYXRlIGZyb20gSnVsaWFuIGRheVxuICBzdGF0aWMganVsaWFuVG9HcmVnb3JpYW4oamQpIHtcbiAgICBjb25zdCB3amQgPSBNYXRoLmZsb29yKGpkIC0gMC41KSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0g7XG4gICAgY29uc3QgcXVhZHJpY2VudCA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTQ2MDk3KTtcbiAgICBjb25zdCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpO1xuICAgIGNvbnN0IGNlbnQgPSBNYXRoLmZsb29yKGRxYyAvIDM2NTI0KTtcbiAgICBjb25zdCBkY2VudCA9IG1vZChkcWMsIDM2NTI0KTtcbiAgICBjb25zdCBxdWFkID0gTWF0aC5mbG9vcihkY2VudCAvIDE0NjEpO1xuICAgIGNvbnN0IGRxdWFkID0gbW9kKGRjZW50LCAxNDYxKTtcbiAgICBjb25zdCB5aW5kZXggPSBNYXRoLmZsb29yKGRxdWFkIC8gMzY1KTtcbiAgICBsZXQgeWVhciA9IChxdWFkcmljZW50ICogNDAwKSArIChjZW50ICogMTAwKSArIChxdWFkICogNCkgKyB5aW5kZXg7XG4gICAgaWYgKCEoKGNlbnQgPT09IDQpIHx8ICh5aW5kZXggPT09IDQpKSkgeyB5ZWFyICs9IDE7IH1cbiAgICBjb25zdCB5ZWFyZGF5ID0gd2pkIC0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIDEsIDEpO1xuICAgIGxldCBsZWFwYWRqO1xuICAgIGlmICh3amQgPCBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgMywgMSkpIHtcbiAgICAgIGxlYXBhZGogPSAwO1xuICAgIH0gZWxzZSBpZiAoQ29udmVydGVyLmxlYXBHcmVnb3JpYW4oeWVhcikgPyAxIDogMikge1xuICAgICAgbGVhcGFkaiA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlYXBhZGogPSAyO1xuICAgIH1cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKCgoeWVhcmRheSArIGxlYXBhZGopICogMTIpICsgMzczKSAvIDM2Nyk7XG4gICAgY29uc3QgZGF5ID0gKHdqZCAtIENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgMSkpICsgMTtcblxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV07XG4gIH1cblxuICAvLyAgTEVBUF9QRVJTSUFOICAtLSAgSXMgYSBnaXZlbiB5ZWFyIGEgbGVhcCB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyID9cbiAgc3RhdGljIGxlYXBQZXJzaWFuKHllYXIpIHtcbiAgICBpZiAoTk9OX0xFQVBfQ09SUkVDVElPTi5pbmNsdWRlcyh5ZWFyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gaWYgKE5PTl9MRUFQX0NPUlJFQ1RJT04uaW5jbHVkZXMoeWVhciAtIDEpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKDI1ICogeWVhciArIDExKSAlIDMzIDwgODtcbiAgfVxuXG4gIC8vICBQRVJTSUFOX1RPX0pEICAtLSAgRGV0ZXJtaW5lIEp1bGlhbiBkYXkgZnJvbSBQZXJzaWFuIGRhdGVcbiAgc3RhdGljIHBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QgZXBiYXNlID0geWVhciAtICgoeWVhciA+PSAwKSA/IDQ3NCA6IDQ3Myk7XG4gICAgY29uc3QgZXB5ZWFyID0gNDc0ICsgbW9kKGVwYmFzZSwgMjgyMCk7XG5cbiAgICByZXR1cm4gZGF5XG4gICAgICArICgobW9udGggPD0gNylcbiAgICAgICAgPyAoKG1vbnRoIC0gMSkgKiAzMSlcbiAgICAgICAgOiAoKChtb250aCAtIDEpICogMzApICsgNilcbiAgICAgIClcbiAgICAgICsgTWF0aC5mbG9vcigoKGVweWVhciAqIDY4MikgLSAxMTApIC8gMjgxNilcbiAgICAgICsgKChlcHllYXIgLSAxKSAqIDM2NSlcbiAgICAgICsgKE1hdGguZmxvb3IoZXBiYXNlIC8gMjgyMCkgKiAxMDI5OTgzKSArIChQRVJTSUFOX0VQT0NIIC0gMSk7XG4gIH1cblxuICAvLyAgSkRfVE9fUEVSU0lBTiAgLS0gIENhbGN1bGF0ZSBQZXJzaWFuIGRhdGUgZnJvbSBKdWxpYW4gZGF5XG4gIHN0YXRpYyBqdWxpYW5Ub1BlcnNpYW4oamQpIHtcbiAgICBjb25zdCBuamQgPSBNYXRoLmZsb29yKGpkKSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSBuamQgLSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKDQ3NSwgMSwgMSk7XG4gICAgY29uc3QgY3ljbGUgPSBNYXRoLmZsb29yKGRlcG9jaCAvIDEwMjk5ODMpO1xuICAgIGNvbnN0IGN5ZWFyID0gbW9kKGRlcG9jaCwgMTAyOTk4Myk7XG4gICAgbGV0IHljeWNsZTtcbiAgICBpZiAoY3llYXIgPT09IDEwMjk5ODIpIHtcbiAgICAgIHljeWNsZSA9IDI4MjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF1eDEgPSBNYXRoLmZsb29yKGN5ZWFyIC8gMzY2KTtcbiAgICAgIGNvbnN0IGF1eDIgPSBtb2QoY3llYXIsIDM2Nik7XG4gICAgICB5Y3ljbGUgPSBNYXRoLmZsb29yKCgoMjEzNCAqIGF1eDEpICsgKDI4MTYgKiBhdXgyKSArIDI4MTUpIC8gMTAyODUyMilcbiAgICAgICAgKyBhdXgxICsgMTtcbiAgICB9XG4gICAgbGV0IHllYXIgPSB5Y3ljbGUgKyAoMjgyMCAqIGN5Y2xlKSArIDQ3NDtcbiAgICBpZiAoeWVhciA8PSAwKSB7XG4gICAgICB5ZWFyIC09IDE7XG4gICAgfVxuICAgIGNvbnN0IHlkYXkgPSAobmpkIC0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCAxLCAxKSkgKyAxO1xuICAgIGNvbnN0IG1vbnRoID0gKHlkYXkgPD0gMTg2KSA/IE1hdGguY2VpbCh5ZGF5IC8gMzEpIDogTWF0aC5jZWlsKCh5ZGF5IC0gNikgLyAzMCk7XG4gICAgY29uc3QgZGF5ID0gKG5qZCAtIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIDEpKSArIDE7XG5cbiAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldO1xuICB9XG5cbiAgc3RhdGljIHBlcnNpYW5Ub0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QganVsaWFuID0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9HcmVnb3JpYW4oanVsaWFuKTtcbiAgfVxuXG4gIHN0YXRpYyBncmVnb3JpYW5Ub1BlcnNpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGp1bGlhbiA9IENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9QZXJzaWFuKGp1bGlhbik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmltcG9ydCB7XG4gIE1PTlRIX05BTUVTLFxuICBBQkJSX0RBWVMsXG4gIERBWVNfTkFNRVNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2KGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoYSAvIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSAoTWF0aC5mbG9vcihhIC8gYikgKiBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeE1vbnRoKHllYXIsIG1vbnRoKSB7XG4gIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDw9IDApIHtcbiAgICBjb25zdCB5ZWFyRGlmZiA9IE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gICAgY29uc3QgbmV3WWVhciA9IHllYXIgLSB5ZWFyRGlmZjtcbiAgICBjb25zdCBuZXdNb250aCA9IG1vbnRoIC0gKHllYXJEaWZmICogMTIpO1xuXG4gICAgcmV0dXJuIFtuZXdZZWFyLCBuZXdNb250aF07XG4gIH1cblxuICByZXR1cm4gW3llYXIsIG1vbnRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm9MZWFkaW5nKHN0cikge1xuICBpZiAoc3RyICYmIHN0ci5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGAwJHtzdHJ9YDsgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVllYXIoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9beVldKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ1lZWVknOlxuICAgIGNhc2UgJ1lZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RnVsbFllYXIoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoXG4gICAgICAgIHN0ci5yZXBsYWNlKG1hdGNoLCBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgyKSksIGRhdGVcbiAgICAgICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTW9udGgoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bbU1dKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ00nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXRNb250aCgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdNb250aCA9IHplcm9MZWFkaW5nKGRhdGUuZ2V0TW9udGgoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKHN0ci5yZXBsYWNlKG1hdGNoLCB6ZXJvTGVhZGluZ01vbnRoKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NTSc6XG4gICAgY2FzZSAnTU1NTSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKFxuICAgICAgICBzdHIucmVwbGFjZShtYXRjaCwgTU9OVEhfTkFNRVNbZGF0ZS5nZXRNb250aCgpIC0gMV0pLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZURheShzdHIsIGRhdGUpIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL1tkRF0rLyk7XG4gIGlmICghbWF0Y2gpIHsgcmV0dXJuIHN0cjsgfVxuICBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgY2FzZSAnRCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXREYXRlKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnREQnOiB7XG4gICAgICBjb25zdCB6ZXJvTGVhZGluZ0RhdGUgPSB6ZXJvTGVhZGluZyhkYXRlLmdldERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdEYXRlKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2QnOlxuICAgIGNhc2UgJ2RkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBBQkJSX0RBWVNbZGF0ZS5nZXREYXkoKV0pLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnZGRkJzpcbiAgICBjYXNlICdkZGRkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBEQVlTX05BTUVTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcmFzaG0vSkRhdGVcbiAqIEBhdXRob3I6IEFyYXNoIE1vdXNhdmlcbiAqL1xuXG5pbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkRhdGUge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkgfHwgYXJnc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIFt0aGlzLmlucHV0XSA9IGFyZ3M7XG4gICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgdGhpcy5pbnB1dCA9IGFyZ3M7XG4gICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5wdXQgPSBuZXcgRGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgaW5wdXQnKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmlucHV0KSkge1xuICAgICAgdGhpcy5kYXRlID0gdGhpcy5pbnB1dC5tYXAoKG51bSkgPT4gcGFyc2VJbnQobnVtLCAxMCkpO1xuICAgICAgdGhpcy5fZCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB0aGlzLl9kID0gdGhpcy5pbnB1dDtcbiAgICAgIHRoaXMuZGF0ZSA9IEpEYXRlLnRvSmFsYWxpKHRoaXMuaW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIENvdmVydHMgYSBHcmVnb3JpYW4gZGF0ZSB0byBKYWxhbGkgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW1zIHtEYXRlfSBkYXRlXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHRvSmFsYWxpKGRhdGUpIHtcbiAgICBjb25zdCBqdWxpYW5EYXRlID0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKFxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgIGRhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcbiAgICBjb25zdCBqZGF0ZSA9IENvbnZlcnRlci5qdWxpYW5Ub1BlcnNpYW4oanVsaWFuRGF0ZSk7XG5cbiAgICByZXR1cm4gamRhdGU7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXRpYyB0b19qYWxhbGkoZGF0ZSkgeyByZXR1cm4gSkRhdGUudG9KYWxhbGkoZGF0ZSk7IH1cblxuICAvKlxuICAgKiBjb252ZXJ0cyBhIEphbGFsaSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IGRheVxuICAgKiBAcmV0dXJuIHtEYXRlfVxuICAgKi9cbiAgc3RhdGljIHRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBnZGF0ZSA9IENvbnZlcnRlci5qdWxpYW5Ub0dyZWdvcmlhbihcbiAgICAgIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKCtnZGF0ZVswXSwgK2dkYXRlWzFdIC0gMSwgK2dkYXRlWzJdKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc3RhdGljIHRvX2dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7IHJldHVybiBKRGF0ZS50b0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KTsgfVxuXG4gIC8qXG4gICAqIENoZWNrcyBpZiBhIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXIgb3Igbm90XG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHJldHVybiBDb252ZXJ0ZXIubGVhcFBlcnNpYW4oeWVhcik7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIG1vbnRoIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGggemVybyBiYXNlZFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICBsZXQgY2FsY2VkWWVhciA9IHllYXIgLSBNYXRoLmZsb29yKG1vbnRoIC8gMTIpO1xuICAgIGxldCBjYWxjZWRNb250aCA9IG1vbnRoIC0gKE1hdGguZmxvb3IobW9udGggLyAxMikgKiAxMik7XG5cbiAgICBpZiAoY2FsY2VkTW9udGggPCAwKSB7XG4gICAgICBjYWxjZWRNb250aCArPSAxMjtcbiAgICAgIGNhbGNlZFllYXIgLT0gMTtcbiAgICB9IGVsc2UgaWYgKGNhbGNlZE1vbnRoID09PSAwKSB7XG4gICAgICBjYWxjZWRNb250aCA9IDEyO1xuICAgIH1cblxuICAgIGlmIChjYWxjZWRNb250aCA8IDYpIHtcbiAgICAgIHJldHVybiAzMTtcbiAgICB9IGlmIChjYWxjZWRNb250aCA8IDExKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBpZiAoSkRhdGUuaXNMZWFwWWVhcihjYWxjZWRZZWFyKSkge1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH1cbiAgICByZXR1cm4gMjk7XG4gIH1cblxuICAvKlxuICAgKiBDb252ZXJ0cyBKRGF0ZSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKi9cbiAgdG9HcmVnb3JpYW4oKSB7XG4gICAgcmV0dXJuIEpEYXRlLnRvR3JlZ29yaWFuKHRoaXMuZGF0ZVswXSwgdGhpcy5kYXRlWzFdLCB0aGlzLmRhdGVbMl0pO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpJ3MgZnVsbCB5ZWFyLCBleDogMTM5M1xuICAgKlxuICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgKi9cbiAgZ2V0RnVsbFllYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVswXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgdGhlIEphbGFsaSBmdWxsIHllYXJcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RnVsbFllYXIoeWVhcikge1xuICAgIHRoaXMuZGF0ZVswXSA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50b0dyZWdvcmlhbigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIG1vbnRoIG51bWJlci5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBKYWxhbGkgbW9udGggbnVtYmVyXG4gICAqL1xuICBnZXRNb250aCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzFdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyB0aGUgSmFsYWxpIG1vbnRoIG51bWJlci4gQW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDExXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGhcbiAgICogQHJldHVybnMge0pEYXRlfVxuICAgKi9cbiAgc2V0TW9udGgobW9udGgpIHtcbiAgICBjb25zdCBmaXhlZCA9IGhlbHBlcnMuZml4TW9udGgodGhpcy5nZXRGdWxsWWVhcigpLCBwYXJzZUludChtb250aCwgMTApKTtcbiAgICBbdGhpcy5kYXRlWzBdLCB0aGlzLmRhdGVbMV1dID0gZml4ZWQ7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIGRheSBudW1iZXIuIEEgbnVtYmVyIGJldHdlZW4gMCB0byAzMVxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBkYXkgbnVtYmVyXG4gICAqL1xuICBnZXREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMl07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIEphbGFsaSBkYXkgbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gMzFcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBkYXRlXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RGF0ZShkYXRlKSB7XG4gICAgdGhpcy5kYXRlWzJdID0gcGFyc2VJbnQoZGF0ZSwgMTApO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgdGhlIHNwZWNpZmllZCBkYXRlLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gNlxuICAgKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0RGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9kLmdldERheSgpO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyBhIGZvcm1hdGVkIG91dHB1dCBvZiBjdXJyZW50IGRhdGVcbiAgICpcbiAgICogQHBhcmFtcyB7U3RyaW5nfSBmb3JtYXRcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZm9ybWF0KGZvcm1hdCkge1xuICAgIGxldCByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VZZWFyKGZvcm1hdCwgdGhpcyk7XG4gICAgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlTW9udGgocmVzdWx0LCB0aGlzKTtcbiAgICByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VEYXkocmVzdWx0LCB0aGlzKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiTU9OVEhfTkFNRVMiLCJBQkJSX0RBWVMiLCJEQVlTX05BTUVTIiwiR1JFR09SSUFOX0VQT0NIIiwiUEVSU0lBTl9FUE9DSCIsIk5PTl9MRUFQX0NPUlJFQ1RJT04iLCJtb2QiLCJDb252ZXJ0ZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImxlYXBHcmVnb3JpYW4iLCJ5ZWFyIiwiZ3JlZ29yaWFuVG9KdWxpYW4iLCJtb250aCIsImRheSIsInBhZCIsIk1hdGgiLCJmbG9vciIsImp1bGlhblRvR3JlZ29yaWFuIiwiamQiLCJ3amQiLCJkZXBvY2giLCJxdWFkcmljZW50IiwiZHFjIiwiY2VudCIsImRjZW50IiwicXVhZCIsImRxdWFkIiwieWluZGV4IiwieWVhcmRheSIsImxlYXBhZGoiLCJsZWFwUGVyc2lhbiIsImluY2x1ZGVzIiwicGVyc2lhblRvSnVsaWFuIiwiZXBiYXNlIiwiZXB5ZWFyIiwianVsaWFuVG9QZXJzaWFuIiwibmpkIiwiY3ljbGUiLCJjeWVhciIsInljeWNsZSIsImF1eDEiLCJhdXgyIiwieWRheSIsImNlaWwiLCJwZXJzaWFuVG9HcmVnb3JpYW4iLCJqdWxpYW4iLCJncmVnb3JpYW5Ub1BlcnNpYW4iLCJkZWZhdWx0IiwiZGl2IiwiYSIsImIiLCJmaXhNb250aCIsInllYXJEaWZmIiwibmV3WWVhciIsIm5ld01vbnRoIiwiemVyb0xlYWRpbmciLCJzdHIiLCJsZW5ndGgiLCJjb25jYXQiLCJyZXBsYWNlWWVhciIsImRhdGUiLCJtYXRjaCIsInJlcGxhY2UiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsInNsaWNlIiwicmVwbGFjZU1vbnRoIiwiZ2V0TW9udGgiLCJ6ZXJvTGVhZGluZ01vbnRoIiwidG9TdHJpbmciLCJyZXBsYWNlRGF5IiwiZ2V0RGF0ZSIsInplcm9MZWFkaW5nRGF0ZSIsImdldERheSIsImhlbHBlcnMiLCJKRGF0ZSIsIl9sZW4iLCJhcmd1bWVudHMiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiaXNBcnJheSIsIkRhdGUiLCJpbnB1dCIsIkVycm9yIiwibWFwIiwibnVtIiwicGFyc2VJbnQiLCJfZCIsInRvR3JlZ29yaWFuIiwidG9KYWxhbGkiLCJzZXRGdWxsWWVhciIsInNldE1vbnRoIiwiZml4ZWQiLCJfZml4ZWQiLCJfc2xpY2VkVG9BcnJheSIsInNldERhdGUiLCJmb3JtYXQiLCJyZXN1bHQiLCJqdWxpYW5EYXRlIiwiamRhdGUiLCJ0b19qYWxhbGkiLCJnZGF0ZSIsInRvX2dyZWdvcmlhbiIsImlzTGVhcFllYXIiLCJkYXlzSW5Nb250aCIsImNhbGNlZFllYXIiLCJjYWxjZWRNb250aCJdLCJzb3VyY2VSb290IjoiIn0=