import { divCeil } from './helpers';
import {
  GREGORIAN_EPOCH, PERSIAN_EPOCH, NON_LEAP_CORRECTION, PERSIAN_CYCLE_DAYS
} from './constants';

export default class Converter {
  static gregorianToFixed(year, month, day) {
    const result = GREGORIAN_EPOCH - 1
        + 365 * (year - 1)
        + Math.floor((year - 1) / 4)
        - Math.floor((year - 1) / 100)
        + Math.floor((year - 1) / 400)
        + Math.floor((367 * month - 362) / 12)
        // eslint-disable-next-line no-nested-ternary
        + (month <= 2 ? 0 : Converter.leapGregorian(year) ? -1 : -2)
        + day;
    return result;
  }

  static gregorianYearFromFixed(date) {
    const d0 = date - GREGORIAN_EPOCH;
    const n400 = Math.floor(d0 / 146097);
    const d1 = d0 % 146097;
    const n100 = Math.floor(d1 / 36524);
    const d2 = d1 % 36524;
    const n4 = Math.floor(d2 / 1461);
    const d3 = d2 % 1461;
    const n1 = Math.floor(d3 / 365);
    const year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    if (n100 === 4 || n1 === 4) {
      return year;
    }
    return year + 1;
  }

  static gregorianNewYear(year) {
    return Converter.gregorianToFixed(year, 1, 1);
  }

  static fixedToGregorian(date) {
    const year = Converter.gregorianYearFromFixed(date);
    const priorDays = date - Converter.gregorianNewYear(year);
    let correction;
    if (date < Converter.gregorianToFixed([year, 3, 1])) {
      correction = 0;
    } else if (Converter.leapGregorian(year)) {
      correction = 1;
    } else {
      correction = 2;
    }
    const month = Math.floor((12 * (priorDays + correction) + 373) / 367);
    const day = date - Converter.gregorianToFixed(year, month, 1) + 1;
    return [year, month, day];
  }

  static jalaliToFixed(year, month, day) {
    let newYear = PERSIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((8 * year + 21) / 33);
    if (NON_LEAP_CORRECTION.includes(year - 1)) {
      newYear -= 1;
    }
    return (
      newYear - 1
        + ((month <= 7) ? 31 * (month - 1) : 30 * (month - 1) + 6)
        + day
    );
  }

  static fixedToJalali(fixedDate) {
    const daysSinceEpoch = fixedDate - Converter.jalaliToFixed(1, 1, 1);
    let year = 1 + Math.floor((33 * daysSinceEpoch + 3) / PERSIAN_CYCLE_DAYS);
    let dayOfYear = fixedDate - Converter.jalaliToFixed(year, 1, 1) + 1;

    if (dayOfYear === 366 && NON_LEAP_CORRECTION.includes(year)) {
      year += 1;
      dayOfYear = 1;
    }

    const month = (dayOfYear <= 186) ? divCeil(dayOfYear, 31) : divCeil(dayOfYear - 6, 30);
    const day = fixedDate - Converter.jalaliToFixed(year, month, 1) + 1;

    return [year, month, day];
  }

  static leapPersian(jdate) {
    if (NON_LEAP_CORRECTION.includes(jdate)) {
      return false;
    } if (NON_LEAP_CORRECTION.includes(jdate - 1)) {
      return true;
    }
    return (25 * jdate + 11) % 33 < 8;
  }

  static leapGregorian(year) {
    return (year % 4 === 0 && ![100, 200, 300].includes(year % 400));
  }
}
