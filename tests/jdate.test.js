import JDate from '../src/jdate';

describe('JDate', () => {
  it('should returns the current date by default', () => {
    const now = Date.now();
    Date.now = jest.genMockFunction().mockReturnValue(now);
    const jdate = new JDate();

    expect(jdate).toEqual({ date: [1396, 8, 26], input: new Date(now), _d: new Date(now) });
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
      const result = JDate.toJalali(new Date(2015, 2, 2));

      expect(result).toEqual([1393, 12, 11]);
    });

    it('should also respond to "to_jalali" for backoprt compatibility', () => {
      const result = JDate.to_jalali(new Date(2015, 2, 2));

      expect(result).toEqual([1393, 12, 11]);
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
  });
});
