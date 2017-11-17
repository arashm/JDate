import { mod } from './helpers';
import { GREGORIAN_EPOCH, PERSIAN_EPOCH } from './constants';

export default class Converter {
  //  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year?
  static leapGregorian(year) {
    return ((year % 4) === 0) &&
      (!(((year % 100) === 0) && ((year % 400) !== 0)));
  }

  // GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date
  static gregorianToJulian(year, month, day) {
    let pad;
    if (month <= 2) {
      pad = 0;
    } else if (Converter.leapGregorian(year)) {
      pad = -1;
    } else {
      pad = -2;
    }

    return (GREGORIAN_EPOCH - 1) +
      (365 * (year - 1)) +
      Math.floor((year - 1) / 4) +
      (-Math.floor((year - 1) / 100)) +
      Math.floor((year - 1) / 400) +
      Math.floor((((367 * month) - 362) / 12) + (pad + day));
  }

  //  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day
  static julianToGregorian(jd) {
    const wjd = Math.floor(jd - 0.5) + 0.5;
    const depoch = wjd - GREGORIAN_EPOCH;
    const quadricent = Math.floor(depoch / 146097);
    const dqc = mod(depoch, 146097);
    const cent = Math.floor(dqc / 36524);
    const dcent = mod(dqc, 36524);
    const quad = Math.floor(dcent / 1461);
    const dquad = mod(dcent, 1461);
    const yindex = Math.floor(dquad / 365);
    let year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent === 4) || (yindex === 4))) { year += 1; }
    const yearday = wjd - Converter.gregorianToJulian(year, 1, 1);
    let leapadj;
    if (wjd < Converter.gregorianToJulian(year, 3, 1)) {
      leapadj = 0;
    } else if (Converter.leapGregorian(year) ? 1 : 2) {
      leapadj = 1;
    } else {
      leapadj = 2;
    }
    const month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    const day = (wjd - Converter.gregorianToJulian(year, month, 1)) + 1;

    return [year, month, day];
  }

  //  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?
  static leapPersian(year) {
    return (
      (((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816
    ) < 682;
  }

  //  PERSIAN_TO_JD  --  Determine Julian day from Persian date
  static persianToJulian(year, month, day) {
    const epbase = year - ((year >= 0) ? 474 : 473);
    const epyear = 474 + mod(epbase, 2820);

    return day +
      ((month <= 7) ?
        ((month - 1) * 31) :
        (((month - 1) * 30) + 6)
      ) +
      Math.floor(((epyear * 682) - 110) / 2816) +
      ((epyear - 1) * 365) +
      (Math.floor(epbase / 2820) * 1029983) + (PERSIAN_EPOCH - 1);
  }

  //  JD_TO_PERSIAN  --  Calculate Persian date from Julian day
  static julianToPersian(jd) {
    const njd = Math.floor(jd) + 0.5;
    const depoch = njd - Converter.persianToJulian(475, 1, 1);
    const cycle = Math.floor(depoch / 1029983);
    const cyear = mod(depoch, 1029983);
    let ycycle;
    if (cyear === 1029982) {
      ycycle = 2820;
    } else {
      const aux1 = Math.floor(cyear / 366);
      const aux2 = mod(cyear, 366);
      ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
        aux1 + 1;
    }
    let year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
      year -= 1;
    }
    const yday = (njd - Converter.persianToJulian(year, 1, 1)) + 1;
    const month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    const day = (njd - Converter.persianToJulian(year, month, 1)) + 1;

    return [year, month, day];
  }

  static persianToGregorian(year, month, day) {
    const julian = Converter.persianToJulian(year, month, day);

    return Converter.julianToGregorian(julian);
  }

  static gregorianToPersian(year, month, day) {
    const julian = Converter.gregorianToJulian(year, month, day);

    return Converter.julianToPersian(julian);
  }
}
