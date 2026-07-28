import {
  describe, it, expect, afterEach, vi
} from 'vitest';
import JDate from '../src/jdate';

describe('JDate', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should returns the current date by default', () => {
    vi.useFakeTimers().setSystemTime(new Date(2017, 10, 28));
    const jdate = new JDate();

    expect(jdate.date).toEqual([1396, 9, 7]);
  });

  it('should convert a custom array', () => {
    const jdate = new JDate([1396, 10, 11]);

    expect(jdate.date).toEqual([1396, 10, 11]);
    expect(jdate.input).toEqual([1396, 10, 11]);
    expect(jdate._d).toBeInstanceOf(Date);
    expect(jdate._d.getFullYear()).toEqual(2018);
    expect(jdate._d.getMonth()).toEqual(0);
    expect(jdate._d.getDate()).toEqual(1);
  });

  it('should convert by passing just integers', () => {
    const jdate = new JDate(1396, 10, 11);

    expect(jdate.date).toEqual([1396, 10, 11]);
    expect(jdate.input).toEqual([1396, 10, 11]);
    expect(jdate._d).toBeInstanceOf(Date);
    expect(jdate._d.getFullYear()).toEqual(2018);
    expect(jdate._d.getMonth()).toEqual(0);
    expect(jdate._d.getDate()).toEqual(1);
  });

  it('should convert a JS date object', () => {
    const currentDate = new Date(2018, 0, 1);
    const jdate = new JDate(currentDate);

    expect(jdate.date).toEqual([1396, 10, 11]);
    expect(jdate.input).toEqual(currentDate);
    expect(jdate._d).toBeInstanceOf(Date);
    expect(jdate._d.getFullYear()).toEqual(2018);
    expect(jdate._d.getMonth()).toEqual(0);
    expect(jdate._d.getDate()).toEqual(1);
  });

  it('should return correctly for #getFullYear', () => {
    const currentDate = new Date(2018, 0, 1);
    const jdate = new JDate(currentDate);

    expect(jdate.getFullYear()).toEqual(1396);
  });

  it('should return correctly for #getMonth', () => {
    const currentDate = new Date(2018, 0, 1);
    const jdate = new JDate(currentDate);

    expect(jdate.getMonth()).toEqual(10);
  });

  it('should return correctly for #getDate', () => {
    const currentDate = new Date(2018, 0, 1);
    const jdate = new JDate(currentDate);

    expect(jdate.getDate()).toEqual(11);
  });

  it('should return correctly for #getDay', () => {
    const currentDate = new Date(2018, 0, 1);
    const jdate = new JDate(currentDate);

    expect(jdate.getDay()).toEqual(1);
  });

  describe('.isLeapYear', () => {
    it('should return false for not leap year', () => {
      const result = JDate.isLeapYear(1393);

      expect(result).toBeFalsy();
    });

    it('should return true for leap year', () => {
      const result = JDate.isLeapYear(1395);

      expect(result).toBeTruthy();
    });
  });

  describe('.daysInMonth', () => {
    it('should return 31 for month 5', () => {
      const result = JDate.daysInMonth(1393, 5);

      expect(result).toEqual(31);
    });

    it('should return 30 for month 7', () => {
      const result = JDate.daysInMonth(1393, 6);

      expect(result).toEqual(30);
    });

    it('should return 30 for leap year and month 11', () => {
      const result = JDate.daysInMonth(1395, 11);

      expect(result).toEqual(30);
    });

    it('should return 29 for a common year and month 11', () => {
      expect(JDate.daysInMonth(1394, 11)).toEqual(29);
    });

    // Regression: month 0 (فروردین) returned the length of اسفند because the
    // normalization mapped it onto month 12 of the wrong year.
    it('should return 31 for month 0', () => {
      expect(JDate.daysInMonth(1395, 0)).toEqual(31);
      expect(JDate.daysInMonth(1394, 0)).toEqual(31);
    });

    // Regression: the year carry ran in the wrong direction, so month 12 landed
    // on the previous اسفند instead of the next فروردین.
    it('should carry months above 11 into the following year', () => {
      expect(JDate.daysInMonth(1395, 12)).toEqual(31); // فروردین 1396
      expect(JDate.daysInMonth(1394, 23)).toEqual(30); // اسفند 1395, a leap year
      expect(JDate.daysInMonth(1395, 23)).toEqual(29); // اسفند 1396, a common year
    });

    it('should carry negative months into the previous year', () => {
      expect(JDate.daysInMonth(1395, -1)).toEqual(29); // اسفند 1394, a common year
      expect(JDate.daysInMonth(1396, -1)).toEqual(30); // اسفند 1395, a leap year
      expect(JDate.daysInMonth(1395, -12)).toEqual(31); // فروردین 1394
    });

    it('should sum to the correct year length', () => {
      const yearLength = (year) => {
        let total = 0;

        for (let month = 0; month < 12; month += 1) {
          total += JDate.daysInMonth(year, month);
        }

        return total;
      };

      expect(yearLength(1394)).toEqual(365);
      expect(yearLength(1395)).toEqual(366);
      expect(yearLength(1403)).toEqual(366);
    });
  });

  describe('.toGregorian', () => {
    it('should return the correct result', () => {
      const result = JDate.toGregorian(1393, 12, 11);

      expect([
        result.getFullYear(),
        result.getMonth(),
        result.getDate()
      ]).toEqual([2015, 2, 2]);
    });

    it('should also respond to "to_gregorian" for backport compatibility', () => {
      const result = JDate.to_gregorian(1393, 12, 11);

      expect([
        result.getFullYear(),
        result.getMonth(),
        result.getDate()
      ]).toEqual([2015, 2, 2]);
    });
  });

  describe('.toJalali', () => {
    it('should return the correct result', () => {
      const result = JDate.toJalali(new Date(2025, 2, 20));

      expect(result).toEqual([1403, 12, 30]);
    });

    it('should also respond to "to_jalali" for backoprt compatibility', () => {
      const result = JDate.to_jalali(new Date(2015, 2, 2));

      expect(result).toEqual([1393, 12, 11]);
    });
  });

  // Regression: the setters used to overwrite `input` and leave `_d` pointing at
  // the date the instance was constructed with, so getDay() and the day-name
  // format identifiers kept reporting the pre-mutation weekday.
  describe('setters', () => {
    it('should keep _d in sync after #setFullYear', () => {
      const jdate = new JDate([1396, 8, 6]).setFullYear(1397);

      expect(jdate.date).toEqual([1397, 8, 6]);
      expect(jdate._d.toDateString()).toEqual('Sun Oct 28 2018');
      expect(jdate.getDay()).toEqual(0);
      expect(jdate.format('dddd')).toEqual('یکشنبه');
    });

    it('should keep _d in sync after #setMonth', () => {
      const jdate = new JDate([1396, 8, 6]).setMonth(9);

      expect(jdate.date).toEqual([1396, 9, 6]);
      expect(jdate._d.toDateString()).toEqual('Mon Nov 27 2017');
      expect(jdate.getDay()).toEqual(1);
      expect(jdate.format('dddd')).toEqual('دوشنبه');
    });

    it('should keep _d in sync after #setDate', () => {
      const jdate = new JDate([1396, 8, 6]).setDate(15);

      expect(jdate.date).toEqual([1396, 8, 15]);
      expect(jdate._d.toDateString()).toEqual('Mon Nov 06 2017');
      expect(jdate.getDay()).toEqual(1);
      expect(jdate.format('dddd')).toEqual('دوشنبه');
    });

    it('should stay consistent across chained setters', () => {
      const jdate = new JDate([1396, 8, 6]).setFullYear(1397).setMonth(1).setDate(1);

      expect(jdate.date).toEqual([1397, 1, 1]);
      expect(jdate._d.toDateString()).toEqual('Wed Mar 21 2018');
      expect(jdate.getDay()).toEqual(3);
    });

    // Regression: fixMonth carried the overflow into the year with an inverted
    // sign, so setMonth(13) moved back a year instead of forward.
    it('should roll the year forward for months above 12', () => {
      expect(new JDate([1396, 8, 6]).setMonth(13).date).toEqual([1397, 1, 6]);
      expect(new JDate([1396, 8, 6]).setMonth(24).date).toEqual([1397, 12, 6]);
      expect(new JDate([1396, 8, 6]).setMonth(25).date).toEqual([1398, 1, 6]);
    });

    it('should roll the year backward for months at or below 0', () => {
      expect(new JDate([1396, 8, 6]).setMonth(0).date).toEqual([1395, 12, 6]);
      expect(new JDate([1396, 8, 6]).setMonth(-1).date).toEqual([1395, 11, 6]);
    });

    it('should leave in-range months on the same year', () => {
      expect(new JDate([1396, 8, 6]).setMonth(1).date).toEqual([1396, 1, 6]);
      expect(new JDate([1396, 8, 6]).setMonth(12).date).toEqual([1396, 12, 6]);
    });

    it('should not mutate the original constructor input', () => {
      const input = [1396, 8, 6];
      const jdate = new JDate(input);

      jdate.setMonth(9);

      expect(jdate.input).toEqual([1396, 8, 6]);
      expect(input).toEqual([1396, 8, 6]);
    });
  });

  describe('.format', () => {
    it('should format the given date correctly', () => {
      const result = new JDate([1396, 8, 26]);

      expect(result.format('dddd DD MMMM YYYY')).toEqual('جمعه 26 آبان 1396');
    });

    it('should correctly format zero leading month', () => {
      const result = new JDate([1396, 8, 26]);

      expect(result.format('DD/MM/YYYY')).toEqual('26/08/1396');
      expect(result.format('DD/M/YYYY')).toEqual('26/8/1396');
    });

    it('should correctly format zero leading day', () => {
      const result = new JDate([1396, 8, 6]);

      expect(result.format('D/MM/YYYY')).toEqual('6/08/1396');
      expect(result.format('DD/MM/YYYY')).toEqual('06/08/1396');
    });

    it('should resolve every identifier in a single string', () => {
      const result = new JDate([1396, 8, 26]);

      expect(result.format('YYYY YYY YY MMMM MMM MM M DD D dddd ddd dd d'))
        .toEqual('1396 1396 96 آبان آبان 08 8 26 26 جمعه جمعه ج ج');
    });

    it('should pass separators and unknown identifiers through untouched', () => {
      const result = new JDate([1396, 8, 26]);

      expect(result.format('.-/: ()')).toEqual('.-/: ()');
      // Runs of an unsupported length are emitted whole rather than partly
      // consumed, so YYYYY does not become "1396Y".
      expect(result.format('Y')).toEqual('Y');
      expect(result.format('YYYYY')).toEqual('YYYYY');
      expect(result.format('MMMMM')).toEqual('MMMMM');
      expect(result.format('DDD')).toEqual('DDD');
      expect(result.format('ddddd')).toEqual('ddddd');
      // Lowercase y and m are not identifiers at all.
      expect(result.format('yyyy mm')).toEqual('yyyy mm');
    });

    it('should emit bracketed text literally', () => {
      const result = new JDate([1396, 8, 26]);

      expect(result.format('[Day] D')).toEqual('Day 26');
      expect(result.format('[YYYY] YYYY')).toEqual('YYYY 1396');
      expect(result.format('YYYY [در] MMMM')).toEqual('1396 در آبان');
      expect(result.format('[]')).toEqual('');
      expect(result.format('[[]')).toEqual('[');
      // An unterminated bracket opens literal mode to the end of the input.
      expect(result.format('[MM')).toEqual('MM');
      expect(result.format('MM [YYYY')).toEqual('08 YYYY');
    });

    it('should scan unterminated brackets in linear time', () => {
      const result = new JDate([1396, 8, 26]);
      // Requiring the closing bracket made this quadratic: each '[' scanned to
      // the end looking for a ']', failed, and backtracked. 200k characters
      // took ~20s. Guard with a bound far below that but far above the ~1ms
      // the non-backtracking pattern needs, so this cannot flake.
      const hostile = '['.repeat(200000);

      const started = Date.now();
      expect(result.format(hostile)).toEqual(hostile.slice(1));
      expect(Date.now() - started).toBeLessThan(1000);
    });

    it('should not re-scan substituted values for identifiers', () => {
      const result = new JDate([1396, 8, 26]);

      // Each identifier resolves once, against the date — never against the
      // output of an earlier substitution.
      expect(result.format('MMMM MMMM')).toEqual('آبان آبان');
      expect(result.format('dddd dddd')).toEqual('جمعه جمعه');
      expect(result.format('YYYY MM DD dddd MMMM')).toEqual('1396 08 26 جمعه آبان');
    });

    it('should treat $ patterns in the format string as literal text', () => {
      const result = new JDate([1396, 8, 26]);

      // The replacement runs through a callback, so $&, $` and $' are inert.
      expect(result.format("YYYY $& $` $'")).toEqual("1396 $& $` $'");
      expect(result.format('[$&] MM')).toEqual('$& 08');
    });
  });
});
