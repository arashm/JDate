/* eslint-disable no-unused-vars */

import {
  MONTH_NAMES,
  ABBR_DAYS,
  DAYS_NAMES
} from './constants';

function div(a, b) {
  return Math.floor(a / b);
}

function mod(a, b) {
  return a - (Math.floor(a / b) * b);
}

function fixMonth(year, month) {
  if (month > 12 || month <= 0) {
    const yearDiff = Math.floor((month - 1) / 12);
    const newYear = year - yearDiff;
    const newMonth = month - (yearDiff * 12);

    return [newYear, newMonth];
  }

  return [year, month];
}

function zeroLeading(str) {
  if (str && str.length === 1) { return `0${str}`; }
  return str;
}

function replaceYear(str, date) {
  const match = str.match(/[yY]+/);
  if (!match) { return str; }
  switch (match[0]) {
    case 'YYYY':
    case 'YYY': {
      const value = replaceYear(str.replace(match, date.getFullYear()), date);
      return value;
    }
    case 'YY': {
      const value = replaceYear(
        str.replace(match, String(date.getFullYear()).slice(2)), date
      );
      return value;
    }
    default: {
      return str;
    }
  }
}

function replaceMonth(str, date) {
  const match = str.match(/[mM]+/);
  if (!match) { return str; }
  switch (match[0]) {
    case 'M': {
      const value = replaceMonth(str.replace(match, date.getMonth()), date);
      return value;
    }
    case 'MM': {
      const zeroLeadingMonth = zeroLeading(date.getMonth().toString());
      const value = replaceMonth(str.replace(match, zeroLeadingMonth), date);
      return value;
    }
    case 'MMM':
    case 'MMMM': {
      const value = replaceMonth(
        str.replace(match, MONTH_NAMES[date.getMonth() - 1]), date
      );
      return value;
    }
    default: {
      return str;
    }
  }
}

function replaceDay(str, date) {
  const match = str.match(/[dD]+/);
  if (!match) { return str; }
  switch (match[0]) {
    case 'D': {
      const value = replaceDay(str.replace(match, date.getDate()), date);
      return value;
    }
    case 'DD': {
      const zeroLeadingDate = zeroLeading(date.getDate().toString());
      const value = replaceDay(str.replace(match, zeroLeadingDate), date);
      return value;
    }
    case 'd':
    case 'dd': {
      const value = replaceDay(str.replace(match, ABBR_DAYS[date.getDay()]), date);
      return value;
    }
    case 'ddd':
    case 'dddd': {
      const value = replaceDay(str.replace(match, DAYS_NAMES[date.getDay()]), date);
      return value;
    }
    default: {
      return str;
    }
  }
}

module.exports = {
  mod,
  div,
  replaceDay,
  replaceMonth,
  replaceYear
};
