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
  PERSIAN_EPOCH: 1948320.5
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

      return _constants__WEBPACK_IMPORTED_MODULE_1__.GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) + -Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12 + (pad + day));
    } //  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

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
      var epyear = 474 + (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.mod)(epbase, 2820);
      return day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + Math.floor((epyear * 682 - 110) / 2816) + (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983 + (_constants__WEBPACK_IMPORTED_MODULE_1__.PERSIAN_EPOCH - 1);
    } //  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

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

  return Converter;
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
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "mod": () => (/* binding */ mod),
/* harmony export */   "fixMonth": () => (/* binding */ fixMonth),
/* harmony export */   "zeroLeading": () => (/* binding */ zeroLeading),
/* harmony export */   "replaceYear": () => (/* binding */ replaceYear),
/* harmony export */   "replaceMonth": () => (/* binding */ replaceMonth),
/* harmony export */   "replaceDay": () => (/* binding */ replaceDay)
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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


})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1csV0FBTixDQUFrQnhFLElBQWxCLEVBQXdCQyxLQUF4QixFQUErQkMsR0FBL0IsQ0FBUDtBQUE2QztBQUVyRjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxvQkFBa0JGLElBQWxCLEVBQXdCO0FBQ3RCLGFBQU9ELDhEQUFBLENBQXNCQyxJQUF0QixDQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLHFCQUFtQkEsSUFBbkIsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQzlCLFVBQUlnRixVQUFVLEdBQUdqRixJQUFJLEdBQUdLLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxLQUFLLEdBQUcsRUFBbkIsQ0FBeEI7QUFDQSxVQUFJaUYsV0FBVyxHQUFHakYsS0FBSyxHQUFJSSxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsS0FBSyxHQUFHLEVBQW5CLElBQXlCLEVBQXBEOztBQUVBLFVBQUlpRixXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDbkJBLFFBQUFBLFdBQVcsSUFBSSxFQUFmO0FBQ0FELFFBQUFBLFVBQVUsSUFBSSxDQUFkO0FBQ0QsT0FIRCxNQUdPLElBQUlDLFdBQVcsS0FBSyxDQUFwQixFQUF1QjtBQUM1QkEsUUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDRDs7QUFFRCxVQUFJQSxXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDbkIsZUFBTyxFQUFQO0FBQ0Q7O0FBQUMsVUFBSUEsV0FBVyxHQUFHLEVBQWxCLEVBQXNCO0FBQ3RCLGVBQU8sRUFBUDtBQUNEOztBQUFDLFVBQUlyQixLQUFLLENBQUNzQixVQUFOLENBQWlCRixVQUFqQixDQUFKLEVBQWtDO0FBQ2xDLGVBQU8sRUFBUDtBQUNEOztBQUNELGFBQU8sRUFBUDtBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0pEYXRlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9KRGF0ZS8uL3NyYy9jb252ZXJ0ZXIuanMiLCJ3ZWJwYWNrOi8vSkRhdGUvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSkRhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9KRGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0pEYXRlLy4vc3JjL2pkYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiSkRhdGVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiSkRhdGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSkRhdGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTU9OVEhfTkFNRVM6IFsn2YHYsdmI2LHYr9uM2YYnLCAn2KfYsdiv24zYqNmH2LTYqicsICfYrtix2K/Yp9ivJywgJ9iq24zYsScsICfYp9mF2LHYr9in2K8nLCAn2LTZh9ix24zZiNixJywgJ9mF2YfYsScsICfYotio2KfZhicsICfYotiw2LEnLCAn2K/bjCcsICfYqNmH2YXZhicsICfYp9iz2YHZhtivJ10sXG4gIEFCQlJfREFZUzogWyfbsdi0JywgJ9uy2LQnLCAn27PYtCcsICfbtNi0JywgJ9u12LQnLCAn2KwnLCAn2LQnXSxcbiAgREFZU19OQU1FUzogWyfbjNqp2LTZhtio2YcnLCAn2K/ZiNi02YbYqNmHJywgJ9iz2YfigIzYtNmG2KjZhycsICfahtmH2KfYsdi02YbYqNmHJywgJ9m+2YbYrOKAjNi02YbYqNmHJywgJ9is2YXYudmHJywgJ9i02YbYqNmHJ10sXG4gIEdSRUdPUklBTl9FUE9DSDogMTcyMTQyNS41LFxuICBQRVJTSUFOX0VQT0NIOiAxOTQ4MzIwLjVcbn07XG4iLCJpbXBvcnQgeyBtb2QgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgR1JFR09SSUFOX0VQT0NILCBQRVJTSUFOX0VQT0NIIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXIge1xuICAvLyAgTEVBUF9HUkVHT1JJQU4gIC0tICBJcyBhIGdpdmVuIHllYXIgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciBhIGxlYXAgeWVhcj9cbiAgc3RhdGljIGxlYXBHcmVnb3JpYW4oeWVhcikge1xuICAgIHJldHVybiAoKHllYXIgJSA0KSA9PT0gMClcbiAgICAgICYmICghKCgoeWVhciAlIDEwMCkgPT09IDApICYmICgoeWVhciAlIDQwMCkgIT09IDApKSk7XG4gIH1cblxuICAvLyBHUkVHT1JJQU5fVE9fSkQgIC0tICBEZXRlcm1pbmUgSnVsaWFuIGRheSBudW1iZXIgZnJvbSBHcmVnb3JpYW4gY2FsZW5kYXIgZGF0ZVxuICBzdGF0aWMgZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGxldCBwYWQ7XG4gICAgaWYgKG1vbnRoIDw9IDIpIHtcbiAgICAgIHBhZCA9IDA7XG4gICAgfSBlbHNlIGlmIChDb252ZXJ0ZXIubGVhcEdyZWdvcmlhbih5ZWFyKSkge1xuICAgICAgcGFkID0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZCA9IC0yO1xuICAgIH1cblxuICAgIHJldHVybiAoR1JFR09SSUFOX0VQT0NIIC0gMSlcbiAgICAgICsgKDM2NSAqICh5ZWFyIC0gMSkpXG4gICAgICArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpXG4gICAgICArICgtTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSlcbiAgICAgICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKVxuICAgICAgKyBNYXRoLmZsb29yKCgoKDM2NyAqIG1vbnRoKSAtIDM2MikgLyAxMikgKyAocGFkICsgZGF5KSk7XG4gIH1cblxuICAvLyAgSkRfVE9fR1JFR09SSUFOICAtLSAgQ2FsY3VsYXRlIEdyZWdvcmlhbiBjYWxlbmRhciBkYXRlIGZyb20gSnVsaWFuIGRheVxuICBzdGF0aWMganVsaWFuVG9HcmVnb3JpYW4oamQpIHtcbiAgICBjb25zdCB3amQgPSBNYXRoLmZsb29yKGpkIC0gMC41KSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0g7XG4gICAgY29uc3QgcXVhZHJpY2VudCA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTQ2MDk3KTtcbiAgICBjb25zdCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpO1xuICAgIGNvbnN0IGNlbnQgPSBNYXRoLmZsb29yKGRxYyAvIDM2NTI0KTtcbiAgICBjb25zdCBkY2VudCA9IG1vZChkcWMsIDM2NTI0KTtcbiAgICBjb25zdCBxdWFkID0gTWF0aC5mbG9vcihkY2VudCAvIDE0NjEpO1xuICAgIGNvbnN0IGRxdWFkID0gbW9kKGRjZW50LCAxNDYxKTtcbiAgICBjb25zdCB5aW5kZXggPSBNYXRoLmZsb29yKGRxdWFkIC8gMzY1KTtcbiAgICBsZXQgeWVhciA9IChxdWFkcmljZW50ICogNDAwKSArIChjZW50ICogMTAwKSArIChxdWFkICogNCkgKyB5aW5kZXg7XG4gICAgaWYgKCEoKGNlbnQgPT09IDQpIHx8ICh5aW5kZXggPT09IDQpKSkgeyB5ZWFyICs9IDE7IH1cbiAgICBjb25zdCB5ZWFyZGF5ID0gd2pkIC0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKHllYXIsIDEsIDEpO1xuICAgIGxldCBsZWFwYWRqO1xuICAgIGlmICh3amQgPCBDb252ZXJ0ZXIuZ3JlZ29yaWFuVG9KdWxpYW4oeWVhciwgMywgMSkpIHtcbiAgICAgIGxlYXBhZGogPSAwO1xuICAgIH0gZWxzZSBpZiAoQ29udmVydGVyLmxlYXBHcmVnb3JpYW4oeWVhcikgPyAxIDogMikge1xuICAgICAgbGVhcGFkaiA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlYXBhZGogPSAyO1xuICAgIH1cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKCgoeWVhcmRheSArIGxlYXBhZGopICogMTIpICsgMzczKSAvIDM2Nyk7XG4gICAgY29uc3QgZGF5ID0gKHdqZCAtIENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgMSkpICsgMTtcblxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV07XG4gIH1cblxuICAvLyAgTEVBUF9QRVJTSUFOICAtLSAgSXMgYSBnaXZlbiB5ZWFyIGEgbGVhcCB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyID9cbiAgc3RhdGljIGxlYXBQZXJzaWFuKHllYXIpIHtcbiAgICBpZiAoeWVhciA9PT0gMTQwMykgcmV0dXJuIHRydWU7IC8vIFdlbGwsIGFsZ29yaXRobXMgYXJlIG5vdCBwZXJmZWN0IFxcby9cbiAgICByZXR1cm4gKFxuICAgICAgKCgoKCh5ZWFyIC0gKCh5ZWFyID4gMCkgPyA0NzQgOiA0NzMpKSAlIDI4MjApICsgNDc0KSArIDM4KSAqIDY4MikgJSAyODE2XG4gICAgKSA8IDY4MjtcbiAgfVxuXG4gIC8vICBQRVJTSUFOX1RPX0pEICAtLSAgRGV0ZXJtaW5lIEp1bGlhbiBkYXkgZnJvbSBQZXJzaWFuIGRhdGVcbiAgc3RhdGljIHBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QgZXBiYXNlID0geWVhciAtICgoeWVhciA+PSAwKSA/IDQ3NCA6IDQ3Myk7XG4gICAgY29uc3QgZXB5ZWFyID0gNDc0ICsgbW9kKGVwYmFzZSwgMjgyMCk7XG5cbiAgICByZXR1cm4gZGF5XG4gICAgICArICgobW9udGggPD0gNylcbiAgICAgICAgPyAoKG1vbnRoIC0gMSkgKiAzMSlcbiAgICAgICAgOiAoKChtb250aCAtIDEpICogMzApICsgNilcbiAgICAgIClcbiAgICAgICsgTWF0aC5mbG9vcigoKGVweWVhciAqIDY4MikgLSAxMTApIC8gMjgxNilcbiAgICAgICsgKChlcHllYXIgLSAxKSAqIDM2NSlcbiAgICAgICsgKE1hdGguZmxvb3IoZXBiYXNlIC8gMjgyMCkgKiAxMDI5OTgzKSArIChQRVJTSUFOX0VQT0NIIC0gMSk7XG4gIH1cblxuICAvLyAgSkRfVE9fUEVSU0lBTiAgLS0gIENhbGN1bGF0ZSBQZXJzaWFuIGRhdGUgZnJvbSBKdWxpYW4gZGF5XG4gIHN0YXRpYyBqdWxpYW5Ub1BlcnNpYW4oamQpIHtcbiAgICBjb25zdCBuamQgPSBNYXRoLmZsb29yKGpkKSArIDAuNTtcbiAgICBjb25zdCBkZXBvY2ggPSBuamQgLSBDb252ZXJ0ZXIucGVyc2lhblRvSnVsaWFuKDQ3NSwgMSwgMSk7XG4gICAgY29uc3QgY3ljbGUgPSBNYXRoLmZsb29yKGRlcG9jaCAvIDEwMjk5ODMpO1xuICAgIGNvbnN0IGN5ZWFyID0gbW9kKGRlcG9jaCwgMTAyOTk4Myk7XG4gICAgbGV0IHljeWNsZTtcbiAgICBpZiAoY3llYXIgPT09IDEwMjk5ODIpIHtcbiAgICAgIHljeWNsZSA9IDI4MjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF1eDEgPSBNYXRoLmZsb29yKGN5ZWFyIC8gMzY2KTtcbiAgICAgIGNvbnN0IGF1eDIgPSBtb2QoY3llYXIsIDM2Nik7XG4gICAgICB5Y3ljbGUgPSBNYXRoLmZsb29yKCgoMjEzNCAqIGF1eDEpICsgKDI4MTYgKiBhdXgyKSArIDI4MTUpIC8gMTAyODUyMilcbiAgICAgICAgKyBhdXgxICsgMTtcbiAgICB9XG4gICAgbGV0IHllYXIgPSB5Y3ljbGUgKyAoMjgyMCAqIGN5Y2xlKSArIDQ3NDtcbiAgICBpZiAoeWVhciA8PSAwKSB7XG4gICAgICB5ZWFyIC09IDE7XG4gICAgfVxuICAgIGNvbnN0IHlkYXkgPSAobmpkIC0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCAxLCAxKSkgKyAxO1xuICAgIGNvbnN0IG1vbnRoID0gKHlkYXkgPD0gMTg2KSA/IE1hdGguY2VpbCh5ZGF5IC8gMzEpIDogTWF0aC5jZWlsKCh5ZGF5IC0gNikgLyAzMCk7XG4gICAgY29uc3QgZGF5ID0gKG5qZCAtIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIDEpKSArIDE7XG5cbiAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldO1xuICB9XG5cbiAgc3RhdGljIHBlcnNpYW5Ub0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgY29uc3QganVsaWFuID0gQ29udmVydGVyLnBlcnNpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9HcmVnb3JpYW4oanVsaWFuKTtcbiAgfVxuXG4gIHN0YXRpYyBncmVnb3JpYW5Ub1BlcnNpYW4oeWVhciwgbW9udGgsIGRheSkge1xuICAgIGNvbnN0IGp1bGlhbiA9IENvbnZlcnRlci5ncmVnb3JpYW5Ub0p1bGlhbih5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIuanVsaWFuVG9QZXJzaWFuKGp1bGlhbik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmltcG9ydCB7XG4gIE1PTlRIX05BTUVTLFxuICBBQkJSX0RBWVMsXG4gIERBWVNfTkFNRVNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2KGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoYSAvIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSAoTWF0aC5mbG9vcihhIC8gYikgKiBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeE1vbnRoKHllYXIsIG1vbnRoKSB7XG4gIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDw9IDApIHtcbiAgICBjb25zdCB5ZWFyRGlmZiA9IE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gICAgY29uc3QgbmV3WWVhciA9IHllYXIgLSB5ZWFyRGlmZjtcbiAgICBjb25zdCBuZXdNb250aCA9IG1vbnRoIC0gKHllYXJEaWZmICogMTIpO1xuXG4gICAgcmV0dXJuIFtuZXdZZWFyLCBuZXdNb250aF07XG4gIH1cblxuICByZXR1cm4gW3llYXIsIG1vbnRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm9MZWFkaW5nKHN0cikge1xuICBpZiAoc3RyICYmIHN0ci5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGAwJHtzdHJ9YDsgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVllYXIoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9beVldKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ1lZWVknOlxuICAgIGNhc2UgJ1lZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoc3RyLnJlcGxhY2UobWF0Y2gsIGRhdGUuZ2V0RnVsbFllYXIoKSksIGRhdGUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjYXNlICdZWSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZVllYXIoXG4gICAgICAgIHN0ci5yZXBsYWNlKG1hdGNoLCBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgyKSksIGRhdGVcbiAgICAgICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTW9udGgoc3RyLCBkYXRlKSB7XG4gIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC9bbU1dKy8pO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBzdHI7IH1cbiAgc3dpdGNoIChtYXRjaFswXSkge1xuICAgIGNhc2UgJ00nOiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlcGxhY2VNb250aChzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXRNb250aCgpKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NJzoge1xuICAgICAgY29uc3QgemVyb0xlYWRpbmdNb250aCA9IHplcm9MZWFkaW5nKGRhdGUuZ2V0TW9udGgoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKHN0ci5yZXBsYWNlKG1hdGNoLCB6ZXJvTGVhZGluZ01vbnRoKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ01NTSc6XG4gICAgY2FzZSAnTU1NTSc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZU1vbnRoKFxuICAgICAgICBzdHIucmVwbGFjZShtYXRjaCwgTU9OVEhfTkFNRVNbZGF0ZS5nZXRNb250aCgpIC0gMV0pLCBkYXRlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZURheShzdHIsIGRhdGUpIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL1tkRF0rLyk7XG4gIGlmICghbWF0Y2gpIHsgcmV0dXJuIHN0cjsgfVxuICBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgY2FzZSAnRCc6IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgZGF0ZS5nZXREYXRlKCkpLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnREQnOiB7XG4gICAgICBjb25zdCB6ZXJvTGVhZGluZ0RhdGUgPSB6ZXJvTGVhZGluZyhkYXRlLmdldERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVwbGFjZURheShzdHIucmVwbGFjZShtYXRjaCwgemVyb0xlYWRpbmdEYXRlKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNhc2UgJ2QnOlxuICAgIGNhc2UgJ2RkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBBQkJSX0RBWVNbZGF0ZS5nZXREYXkoKV0pLCBkYXRlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY2FzZSAnZGRkJzpcbiAgICBjYXNlICdkZGRkJzoge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlRGF5KHN0ci5yZXBsYWNlKG1hdGNoLCBEQVlTX05BTUVTW2RhdGUuZ2V0RGF5KCldKSwgZGF0ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcmFzaG0vSkRhdGVcbiAqIEBhdXRob3I6IEFyYXNoIE1vdXNhdmlcbiAqL1xuXG5pbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJztcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkRhdGUge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkgfHwgYXJnc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIFt0aGlzLmlucHV0XSA9IGFyZ3M7XG4gICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgdGhpcy5pbnB1dCA9IGFyZ3M7XG4gICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5wdXQgPSBuZXcgRGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgaW5wdXQnKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmlucHV0KSkge1xuICAgICAgdGhpcy5kYXRlID0gdGhpcy5pbnB1dC5tYXAoKG51bSkgPT4gcGFyc2VJbnQobnVtLCAxMCkpO1xuICAgICAgdGhpcy5fZCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB0aGlzLl9kID0gdGhpcy5pbnB1dDtcbiAgICAgIHRoaXMuZGF0ZSA9IEpEYXRlLnRvSmFsYWxpKHRoaXMuaW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIENvdmVydHMgYSBHcmVnb3JpYW4gZGF0ZSB0byBKYWxhbGkgZGF0ZVxuICAgKlxuICAgKiBAcGFyYW1zIHtEYXRlfSBkYXRlXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHRvSmFsYWxpKGRhdGUpIHtcbiAgICBjb25zdCBqdWxpYW5EYXRlID0gQ29udmVydGVyLmdyZWdvcmlhblRvSnVsaWFuKFxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgIGRhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcbiAgICBjb25zdCBqZGF0ZSA9IENvbnZlcnRlci5qdWxpYW5Ub1BlcnNpYW4oanVsaWFuRGF0ZSk7XG5cbiAgICByZXR1cm4gamRhdGU7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXRpYyB0b19qYWxhbGkoZGF0ZSkgeyByZXR1cm4gSkRhdGUudG9KYWxhbGkoZGF0ZSk7IH1cblxuICAvKlxuICAgKiBjb252ZXJ0cyBhIEphbGFsaSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKlxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IHllYXJcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBtb250aFxuICAgKiBAcGFyYW1zIHtOdW1iZXJ9IGRheVxuICAgKiBAcmV0dXJuIHtEYXRlfVxuICAgKi9cbiAgc3RhdGljIHRvR3JlZ29yaWFuKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICBjb25zdCBnZGF0ZSA9IENvbnZlcnRlci5qdWxpYW5Ub0dyZWdvcmlhbihcbiAgICAgIENvbnZlcnRlci5wZXJzaWFuVG9KdWxpYW4oeWVhciwgbW9udGgsIGRheSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKCtnZGF0ZVswXSwgK2dkYXRlWzFdIC0gMSwgK2dkYXRlWzJdKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc3RhdGljIHRvX2dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KSB7IHJldHVybiBKRGF0ZS50b0dyZWdvcmlhbih5ZWFyLCBtb250aCwgZGF5KTsgfVxuXG4gIC8qXG4gICAqIENoZWNrcyBpZiBhIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXIgb3Igbm90XG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0geWVhclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHJldHVybiBDb252ZXJ0ZXIubGVhcFBlcnNpYW4oeWVhcik7XG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm5zIG1vbnRoIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGggemVybyBiYXNlZFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICBsZXQgY2FsY2VkWWVhciA9IHllYXIgLSBNYXRoLmZsb29yKG1vbnRoIC8gMTIpO1xuICAgIGxldCBjYWxjZWRNb250aCA9IG1vbnRoIC0gKE1hdGguZmxvb3IobW9udGggLyAxMikgKiAxMik7XG5cbiAgICBpZiAoY2FsY2VkTW9udGggPCAwKSB7XG4gICAgICBjYWxjZWRNb250aCArPSAxMjtcbiAgICAgIGNhbGNlZFllYXIgLT0gMTtcbiAgICB9IGVsc2UgaWYgKGNhbGNlZE1vbnRoID09PSAwKSB7XG4gICAgICBjYWxjZWRNb250aCA9IDEyO1xuICAgIH1cblxuICAgIGlmIChjYWxjZWRNb250aCA8IDYpIHtcbiAgICAgIHJldHVybiAzMTtcbiAgICB9IGlmIChjYWxjZWRNb250aCA8IDExKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBpZiAoSkRhdGUuaXNMZWFwWWVhcihjYWxjZWRZZWFyKSkge1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH1cbiAgICByZXR1cm4gMjk7XG4gIH1cblxuICAvKlxuICAgKiBDb252ZXJ0cyBKRGF0ZSBkYXRlIHRvIEdyZWdvcmlhblxuICAgKi9cbiAgdG9HcmVnb3JpYW4oKSB7XG4gICAgcmV0dXJuIEpEYXRlLnRvR3JlZ29yaWFuKHRoaXMuZGF0ZVswXSwgdGhpcy5kYXRlWzFdLCB0aGlzLmRhdGVbMl0pO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpJ3MgZnVsbCB5ZWFyLCBleDogMTM5M1xuICAgKlxuICAgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuICAgKi9cbiAgZ2V0RnVsbFllYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVswXTtcbiAgfVxuXG4gIC8qXG4gICAqIFNldHMgdGhlIEphbGFsaSBmdWxsIHllYXJcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSB5ZWFyXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RnVsbFllYXIoeWVhcikge1xuICAgIHRoaXMuZGF0ZVswXSA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50b0dyZWdvcmlhbigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIG1vbnRoIG51bWJlci5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBKYWxhbGkgbW9udGggbnVtYmVyXG4gICAqL1xuICBnZXRNb250aCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlWzFdO1xuICB9XG5cbiAgLypcbiAgICogU2V0cyB0aGUgSmFsYWxpIG1vbnRoIG51bWJlci4gQW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDExXG4gICAqXG4gICAqIEBwYXJhbXMge051bWJlcn0gbW9udGhcbiAgICogQHJldHVybnMge0pEYXRlfVxuICAgKi9cbiAgc2V0TW9udGgobW9udGgpIHtcbiAgICBjb25zdCBmaXhlZCA9IGhlbHBlcnMuZml4TW9udGgodGhpcy5nZXRGdWxsWWVhcigpLCBwYXJzZUludChtb250aCwgMTApKTtcbiAgICBbdGhpcy5kYXRlWzBdLCB0aGlzLmRhdGVbMV1dID0gZml4ZWQ7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudG9HcmVnb3JpYW4oKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogU2hvd3MgSmFsYWxpIGRheSBudW1iZXIuIEEgbnVtYmVyIGJldHdlZW4gMCB0byAzMVxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEphbGFsaSBkYXkgbnVtYmVyXG4gICAqL1xuICBnZXREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVbMl07XG4gIH1cblxuICAvKlxuICAgKiBTZXRzIEphbGFsaSBkYXkgbnVtYmVyLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gMzFcbiAgICpcbiAgICogQHBhcmFtcyB7TnVtYmVyfSBkYXRlXG4gICAqIEByZXR1cm4ge0pEYXRlfVxuICAgKi9cbiAgc2V0RGF0ZShkYXRlKSB7XG4gICAgdGhpcy5kYXRlWzJdID0gcGFyc2VJbnQoZGF0ZSwgMTApO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRvR3JlZ29yaWFuKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybnMgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgdGhlIHNwZWNpZmllZCBkYXRlLiBBIG51bWJlciBiZXR3ZWVuIDAgdG8gNlxuICAgKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0RGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9kLmdldERheSgpO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyBhIGZvcm1hdGVkIG91dHB1dCBvZiBjdXJyZW50IGRhdGVcbiAgICpcbiAgICogQHBhcmFtcyB7U3RyaW5nfSBmb3JtYXRcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZm9ybWF0KGZvcm1hdCkge1xuICAgIGxldCByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VZZWFyKGZvcm1hdCwgdGhpcyk7XG4gICAgcmVzdWx0ID0gaGVscGVycy5yZXBsYWNlTW9udGgocmVzdWx0LCB0aGlzKTtcbiAgICByZXN1bHQgPSBoZWxwZXJzLnJlcGxhY2VEYXkocmVzdWx0LCB0aGlzKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiTU9OVEhfTkFNRVMiLCJBQkJSX0RBWVMiLCJEQVlTX05BTUVTIiwiR1JFR09SSUFOX0VQT0NIIiwiUEVSU0lBTl9FUE9DSCIsIm1vZCIsIkNvbnZlcnRlciIsInllYXIiLCJtb250aCIsImRheSIsInBhZCIsImxlYXBHcmVnb3JpYW4iLCJNYXRoIiwiZmxvb3IiLCJqZCIsIndqZCIsImRlcG9jaCIsInF1YWRyaWNlbnQiLCJkcWMiLCJjZW50IiwiZGNlbnQiLCJxdWFkIiwiZHF1YWQiLCJ5aW5kZXgiLCJ5ZWFyZGF5IiwiZ3JlZ29yaWFuVG9KdWxpYW4iLCJsZWFwYWRqIiwiZXBiYXNlIiwiZXB5ZWFyIiwibmpkIiwicGVyc2lhblRvSnVsaWFuIiwiY3ljbGUiLCJjeWVhciIsInljeWNsZSIsImF1eDEiLCJhdXgyIiwieWRheSIsImNlaWwiLCJqdWxpYW4iLCJqdWxpYW5Ub0dyZWdvcmlhbiIsImp1bGlhblRvUGVyc2lhbiIsImRpdiIsImEiLCJiIiwiZml4TW9udGgiLCJ5ZWFyRGlmZiIsIm5ld1llYXIiLCJuZXdNb250aCIsInplcm9MZWFkaW5nIiwic3RyIiwibGVuZ3RoIiwicmVwbGFjZVllYXIiLCJkYXRlIiwibWF0Y2giLCJ2YWx1ZSIsInJlcGxhY2UiLCJnZXRGdWxsWWVhciIsIlN0cmluZyIsInNsaWNlIiwicmVwbGFjZU1vbnRoIiwiZ2V0TW9udGgiLCJ6ZXJvTGVhZGluZ01vbnRoIiwidG9TdHJpbmciLCJyZXBsYWNlRGF5IiwiZ2V0RGF0ZSIsInplcm9MZWFkaW5nRGF0ZSIsImdldERheSIsImhlbHBlcnMiLCJKRGF0ZSIsImFyZ3MiLCJBcnJheSIsImlzQXJyYXkiLCJEYXRlIiwiaW5wdXQiLCJFcnJvciIsIm1hcCIsIm51bSIsInBhcnNlSW50IiwiX2QiLCJ0b0dyZWdvcmlhbiIsInRvSmFsYWxpIiwiZml4ZWQiLCJmb3JtYXQiLCJyZXN1bHQiLCJqdWxpYW5EYXRlIiwiamRhdGUiLCJnZGF0ZSIsImxlYXBQZXJzaWFuIiwiY2FsY2VkWWVhciIsImNhbGNlZE1vbnRoIiwiaXNMZWFwWWVhciJdLCJzb3VyY2VSb290IjoiIn0=