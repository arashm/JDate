import {
  formattingTokens,
  formatRegExps,
  getTokenType
} from './formatting-tokens';

export default function Parser(string, format = 'YYYY-MM-DD') {
  const parsedValues = {
    year: null,
    month: null,
    day: null
  };

  const tokens = format.match(formattingTokens) || [];

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    const parsedValue = string.match(formatRegExps[token])[0];

    if (parsedValue) {
      const parsedValueType = getTokenType(token, parsedValue);
      parsedValues[parsedValueType[0]] = parsedValueType[1];
      string = string.replace(parsedValue, '');
    }
  }

  if (Object.values(parsedValues).includes(null)) {
    Error('Given date does not seem to be correct');
  }

  return parsedValues;
}
