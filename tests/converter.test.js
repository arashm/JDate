const Converter = require('../src/converter');

describe('Converter', () => {
  it('should be able to call it', () => {
    expect(Converter).toBeDefined();
  });

  it('should return as expected', () => {
    expect(Converter.jalCal(1396)).toBe({});
  });
})
