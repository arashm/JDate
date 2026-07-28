import { DEFAULT_CONFIG } from './config';

export function divCeil(a, b) {
  return Math.floor((a + b - 1) / b);
}

/*
 * Normalizes an out-of-range one-based month into a [year, month] pair,
 * carrying the overflow into the year. fixMonth(1396, 13) is [1397, 1].
 */
export function fixMonth(year, month) {
  if (month > 12 || month <= 0) {
    const yearDiff = Math.floor((month - 1) / 12);
    const newYear = year + yearDiff;
    const newMonth = month - (yearDiff * 12);

    return [newYear, newMonth];
  }

  return [year, month];
}

export function zeroLeading(str) {
  if (str && str.length === 1) { return `0${str}`; }
  return str;
}

/*
 * Every identifier `format` understands, resolved against a JDate instance and
 * a resolved config. The name lists come from the config rather than straight
 * from constants.js so that a caller can localize the output.
 *
 * Note getMonth is one based, hence the - 1 into monthNames. getDay is the
 * plain Date one, so the day lists are indexed from Sunday.
 */
const TOKENS = {
  YYYY: (date) => String(date.getFullYear()),
  YYY: (date) => String(date.getFullYear()),
  YY: (date) => String(date.getFullYear()).slice(-2),
  M: (date) => String(date.getMonth()),
  MM: (date) => zeroLeading(String(date.getMonth())),
  MMM: (date, config) => config.monthNames[date.getMonth() - 1],
  MMMM: (date, config) => config.monthNames[date.getMonth() - 1],
  D: (date) => String(date.getDate()),
  DD: (date) => zeroLeading(String(date.getDate())),
  d: (date, config) => config.abbrDays[date.getDay()],
  dd: (date, config) => config.abbrDays[date.getDay()],
  ddd: (date, config) => config.dayNames[date.getDay()],
  dddd: (date, config) => config.dayNames[date.getDay()]
};

/*
 * A bracketed literal, or a run of one identifier character. Matching whole
 * runs means an unsupported length (YYYYY, DDD) falls through to the default
 * and is emitted verbatim rather than being partly consumed.
 *
 * The closing bracket is optional so that this can not backtrack. Requiring it
 * is quadratic on input like '[[[[[[': every '[' scans to the end of the string
 * looking for a ']', fails, gives the whole run back, and the global scan then
 * advances a single character and does it again. With ']?' the greedy [^\]]*
 * never has to give anything back, so each character is consumed once. The
 * trade is that an unterminated '[' opens literal mode to the end of the input.
 */
const TOKEN_PATTERN = /\[([^\]]*)\]?|Y+|M+|D+|d+/g;

/*
 * Substitutes format identifiers in `str` with values from `date`, in a single
 * pass — replacements are never re-scanned, so a substituted value can not be
 * mistaken for another identifier.
 *
 * Text between square brackets is emitted literally: format('[Day] D') is
 * "Day 26" where format('Day D') is "26ay 26". A bracket run cannot itself
 * contain a closing bracket, and an unterminated one runs to the end of the
 * input.
 *
 * @params {String} str
 * @params {JDate}  date
 * @params {Object} config  a resolved config; defaults to the built-in names
 * @return {String}
 */
export function formatDate(str, date, config = DEFAULT_CONFIG) {
  return str.replace(TOKEN_PATTERN, (token, literal) => {
    if (literal !== undefined) { return literal; }

    const resolve = TOKENS[token];
    return resolve ? resolve(date, config) : token;
  });
}
