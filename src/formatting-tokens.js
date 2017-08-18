import { MONTH_NAMES } from './constants';

export const formattingTokens = /(\[[^[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|.)/g;

export const formatRegExps = {
  YYYY: '[0-9]{4}',
  MM: '[0-9]{2}',
  DD: '[0-9]{2}',
  MMM: `(${MONTH_NAMES.join('|')})`,
  MMMM: `(${MONTH_NAMES.join('|')})`
};

function monthToNumber(month) {
  if (!isNaN(+month)) return +month;

  const monthIndex = MONTH_NAMES.indexOf(month);
  if (monthIndex !== -1) return monthIndex + 1;

  return null;
}

export function getTokenType(token, value) {
  if (!Object.prototype.hasOwnProperty.call(formatRegExps, token)) {
    throw new Error(`Wrong token passed: "${token}"`);
  }

  switch (token[0].toLowerCase()) {
    case 'y':
      return ['year', +value];
    case 'm':
      return ['month', monthToNumber(value)];
    case 'd':
      return ['day', +value];
    default:
      throw new Error(`Couldn't parse the given token: "${token}"`);
  }
}
