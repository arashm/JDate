import Parser from '../src/parser';

describe('Parser', () => {
  it('should return section parts separately with default options', () => {
    expect(Parser('1393-12-10')).toEqual({
      year: 1393,
      month: 12,
      day: 10
    });
  });

  it('should return section parts with custom options', () => {
    expect(Parser('1393, 12, 10')).toEqual({
      year: 1393,
      month: 12,
      day: 10
    });
  });

  it('should be able to make sense if format changes', () => {
    expect(Parser('12..1393, 22', 'MM YYYY DD')).toEqual({
      year: 1393,
      month: 12,
      day: 22
    });
  });

  it('should be able to parse text based month names', () => {
    expect(Parser('فروردین..1393, 22', 'MMM YYYY DD')).toEqual({
      year: 1393,
      month: 1,
      day: 22
    });

    expect(Parser('11 دی 1393', 'DD MMMM YYYY')).toEqual({
      year: 1393,
      month: 10,
      day: 11
    });
  });
});
