import { describe, test, expect } from 'vitest';
import converter from '../src/converter';

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

  // Regression: the January/February branch used to be unreachable, which made
  // fixedToGregorian return out-of-range days such as [2021, 2, 0] for Jan 31.
  test('fixedToGregorian handles January and February', () => {
    expect(converter.fixedToGregorian(converter.gregorianToFixed(2021, 1, 30)))
      .toEqual([2021, 1, 30]);
    expect(converter.fixedToGregorian(converter.gregorianToFixed(2021, 1, 31)))
      .toEqual([2021, 1, 31]);
    expect(converter.fixedToGregorian(converter.gregorianToFixed(2021, 2, 28)))
      .toEqual([2021, 2, 28]);

    // leap year: Jan 31 and the Feb 29 boundary
    expect(converter.fixedToGregorian(converter.gregorianToFixed(2020, 1, 31)))
      .toEqual([2020, 1, 31]);
    expect(converter.fixedToGregorian(converter.gregorianToFixed(2020, 2, 29)))
      .toEqual([2020, 2, 29]);
    expect(converter.fixedToGregorian(converter.gregorianToFixed(2020, 3, 1)))
      .toEqual([2020, 3, 1]);
  });

  test('fixedToGregorian round-trips every valid date across a leap cycle', () => {
    const failures = [];

    for (let year = 2018; year <= 2025; year += 1) {
      for (let month = 1; month <= 12; month += 1) {
        const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

        for (let day = 1; day <= daysInMonth; day += 1) {
          const fixed = converter.gregorianToFixed(year, month, day);
          const result = converter.fixedToGregorian(fixed);

          if (result[0] !== year || result[1] !== month || result[2] !== day) {
            failures.push(`${year}-${month}-${day} => ${result.join('-')}`);
          }
        }
      }
    }

    expect(failures).toEqual([]);
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
