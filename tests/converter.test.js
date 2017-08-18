import converter from '../src/converter';

describe('leapGregorian', () => {
  const { leapGregorian } = converter;

  it('should return true when year is leap', () => {
    expect(leapGregorian(2016)).toBe(true);
  });

  it('should return false when year is not leap', () => {
    expect(leapGregorian(2017)).toBe(false);
  });
});

describe('gregorianToJulian', () => {
  const { gregorianToJulian } = converter;

  it('should return correct julian date number', () => {
    expect(gregorianToJulian(2017, 6, 21)).toEqual(2457925.5);
  });
});

describe('julianToGregorian', () => {
  const { julianToGregorian } = converter;

  it('should return correct Gregorian date', () => {
    expect(julianToGregorian(2457925.5)).toEqual([2017, 6, 21]);
  });
});

describe('leapPersian', () => {
  const { leapPersian } = converter;

  it('should return true when year is leap', () => {
    expect(leapPersian(1395)).toBe(true);
  });

  it('should return false when year is not leap', () => {
    expect(leapPersian(1396)).toBe(false);
  });
});

describe('perdianToJulian', () => {
  const { persianToJulian } = converter;

  it('should return correct julian date number', () => {
    expect(persianToJulian(1396, 3, 31)).toEqual(2457925.5);
  });
});

describe('julianToPersian', () => {
  const { julianToPersian } = converter;

  it('should return correct Persian date', () => {
    expect(julianToPersian(2457925.5)).toEqual([1396, 3, 31]);
  });
});

describe('persianToGregorian', () => {
  const { persianToGregorian } = converter;

  it('should return correct Gregorian date', () => {
    expect(persianToGregorian(1396, 3, 31)).toEqual([2017, 6, 21]);
  });
});

describe('gregorianToPersian', () => {
  const { gregorianToPersian } = converter;

  it('should return correct Gregorian date', () => {
    expect(gregorianToPersian(2017, 6, 21)).toEqual([1396, 3, 31]);
  });
});
