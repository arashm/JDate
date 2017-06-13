function div(a, b) {
  return Math.floor(
    a / b,
  );
}

function mod(a, b) {
  return a - ~~(a / b) * b;
}

function fix_month(year, month) {
  if (month > 12 || month <= 0) {
    const yearDiff = Math.floor((month - 1) / 12);
    year += yearDiff;
    month -= yearDiff * 12;
  }
  return [year, month];
}

function replaceYear(str, date) {
  match = str.match(/[yY]+/);
  if (match) {
    switch (match[0]) {
      case 'YYYY':
      case 'YYY':
        var value = replaceYear(str.replace(match, date.getFullYear()), date);
        return value;
      case 'YY':
        var value = replaceYear(str.replace(match, String(date.getFullYear()).slice(2)), date);
        return value;
    }
  } else {
    return str;
  }
}

function replaceMonth(str, date) {
  match = str.match(/[mM]+/);
  if (match) {
    switch (match[0]) {
      case 'M':
      case 'MM':
        var value = replaceMonth(str.replace(match, date.getMonth()), date);
        return value;
      case 'MMM':
      case 'MMMM':
        var value = replaceMonth(str.replace(match, MONTH_NAMES[date.getMonth() - 1]), date);
        return value;
    }
  } else {
    return str;
  }
}

function replaceDay(str, date) {
  match = str.match(/[dD]+/);
  if (match) {
    switch (match[0]) {
      case 'D':
      case 'DD':
        var value = replaceDay(str.replace(match, date.getDate()), date);
        return value;
      case 'd':
      case 'dd':
        var value = replaceDay(str.replace(match, ABBR_DAYS[date.getDay()]), date);
        return value;
      case 'ddd':
      case 'dddd':
        var value = replaceDay(str.replace(match, DAYS_NAMES[date.getDay()]), date);
        return value;
    }
  } else {
    return str;
  }
}

module.exports = {
  mod,
  div,
};
