import converter from '../src/converter';

// describe('leapGregorian', () => {
//  const { leapGregorian } = converter;
//
//  it('should return true when year is leap', () => {
//    expect(leapGregorian(2016)).toBe(true);
//  });
//
//  it('should return false when year is not leap', () => {
//    expect(leapGregorian(2017)).toBe(false);
//  });
// });

describe('Converter', () => {
  test('jalaliToFixed', () => {
    expect(converter.jalaliToFixed(1399, 1, 1)).toBe(737504);
    expect(converter.jalaliToFixed(1400, 1, 1)).toBe(737870);
  });

  test('gregorianToFixed', () => {
    expect(converter.gregorianToFixed(2021, 3, 21)).toBe(737870);
    expect(converter.gregorianToFixed(2022, 3, 21)).toBe(738235);
  });

  test('fixedToGregorian', () => {
    expect(converter.fixedToGregorian(737870)).toEqual([2021, 3, 21]);
    expect(converter.fixedToGregorian(738235)).toEqual([2022, 3, 21]);
  });

  test('fixedToJalali', () => {
    expect(converter.fixedToJalali(737504)).toEqual([1399, 1, 1]);
    expect(converter.fixedToJalali(737870)).toEqual([1400, 1, 1]);
  });

  test('leapPersian', () => {
    expect(converter.leapPersian(1400)).toBe(false);
    expect(converter.leapPersian(1403)).toBe(true);
  });

  test('leapGregorian', () => {
    expect(converter.leapGregorian(2016)).toBe(true);
    expect(converter.leapGregorian(2017)).toBe(false);
  });
});
