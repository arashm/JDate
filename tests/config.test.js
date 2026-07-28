import vm from 'node:vm';
import {
  describe, it, expect, afterEach, vi
} from 'vitest';
import JDate from '../src/jdate';

// Latin names make it obvious in a failure message which list a value came from.
const EN_MONTHS = [
  'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
  'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'
];

// Both day lists are indexed by Date#getDay(), so Sunday comes first.
const EN_DAYS = [
  'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jome', 'Shanbe'
];

const EN_ABBR = ['1sh', '2sh', '3sh', '4sh', '5sh', 'j', 'sh'];

// 1396-08-26 is Friday 17 Nov 2017 — index 5 in both day lists.
const FRIDAY = [1396, 8, 26];

describe('config', () => {
  afterEach(() => {
    JDate.resetDefaultConfig();
    vi.useRealTimers();
  });

  describe('defaults', () => {
    it('should format with the built-in Persian names', () => {
      expect(new JDate(FRIDAY).format('dddd DD MMMM YYYY')).toEqual('جمعه 26 آبان 1396');
    });

    it('should expose the built-in names as the default config', () => {
      const config = JDate.getDefaultConfig();

      expect(config.monthNames[7]).toEqual('آبان');
      expect(config.dayNames[5]).toEqual('جمعه');
      expect(config.abbrDays[5]).toEqual('ج');
    });

    it('should expose a resolved config on every instance', () => {
      expect(new JDate(FRIDAY).config).toEqual(JDate.getDefaultConfig());
    });
  });

  describe('per-instance config', () => {
    it('should override month names', () => {
      const jdate = new JDate(FRIDAY, { monthNames: EN_MONTHS });

      expect(jdate.format('MMMM')).toEqual('Aban');
      expect(jdate.format('MMM')).toEqual('Aban');
    });

    it('should override day names', () => {
      const jdate = new JDate(FRIDAY, { dayNames: EN_DAYS, abbrDays: EN_ABBR });

      expect(jdate.format('dddd')).toEqual('Jome');
      expect(jdate.format('ddd')).toEqual('Jome');
      expect(jdate.format('dd')).toEqual('j');
      expect(jdate.format('d')).toEqual('j');
    });

    it('should leave omitted keys on the built-in names', () => {
      const jdate = new JDate(FRIDAY, { monthNames: EN_MONTHS });

      expect(jdate.format('dddd DD MMMM YYYY')).toEqual('جمعه 26 Aban 1396');
    });

    it('should not affect the numeric identifiers', () => {
      const jdate = new JDate(FRIDAY, { monthNames: EN_MONTHS, dayNames: EN_DAYS });

      expect(jdate.format('YYYY/MM/DD')).toEqual('1396/08/26');
    });

    it('should not leak into other instances', () => {
      const localized = new JDate(FRIDAY, { monthNames: EN_MONTHS });

      expect(localized.format('MMMM')).toEqual('Aban');
      expect(new JDate(FRIDAY).format('MMMM')).toEqual('آبان');
    });

    it('should accept a config with the three-number form', () => {
      const jdate = new JDate(1396, 8, 26, { monthNames: EN_MONTHS });

      expect(jdate.date).toEqual([1396, 8, 26]);
      expect(jdate.input).toEqual([1396, 8, 26]);
      expect(jdate.format('MMMM')).toEqual('Aban');
    });

    it('should accept a config alongside a Date object', () => {
      const currentDate = new Date(2017, 10, 17);
      const jdate = new JDate(currentDate, { monthNames: EN_MONTHS });

      expect(jdate.date).toEqual([1396, 8, 26]);
      expect(jdate.input).toEqual(currentDate);
      expect(jdate.format('MMMM')).toEqual('Aban');
    });

    it('should accept a config on its own and default the date to today', () => {
      vi.useFakeTimers().setSystemTime(new Date(2017, 10, 17));
      const jdate = new JDate({ monthNames: EN_MONTHS });

      expect(jdate.date).toEqual([1396, 8, 26]);
      expect(jdate.format('MMMM')).toEqual('Aban');
    });

    it('should treat an empty config as no override', () => {
      expect(new JDate(FRIDAY, {}).format('MMMM')).toEqual('آبان');
    });

    /*
     * Regression: making the config argument meaningful also made a trailing
     * null/undefined an error, which broke `new JDate(date, maybeConfig)` — the
     * ordinary shape of an optional argument — whenever the caller had nothing
     * to pass. Caught by diffing the public API against the 1.4.0 bundle.
     */
    describe('an absent config', () => {
      it('should be accepted as undefined', () => {
        expect(new JDate(FRIDAY, undefined).format('MMMM')).toEqual('آبان');
        expect(new JDate(1396, 8, 26, undefined).date).toEqual([1396, 8, 26]);
        expect(new JDate(new Date(2017, 10, 17), undefined).date).toEqual([1396, 8, 26]);
      });

      it('should be accepted as null', () => {
        expect(new JDate(FRIDAY, null).format('MMMM')).toEqual('آبان');
        expect(new JDate(1396, 8, 26, null).date).toEqual([1396, 8, 26]);
        expect(new JDate(new Date(2017, 10, 17), null).date).toEqual([1396, 8, 26]);
      });

      it('should keep the built-in names when passed through a wrapper', () => {
        const build = (date, config) => new JDate(date, config);

        expect(build(FRIDAY).format('dddd MMMM')).toEqual('جمعه آبان');
        expect(build(FRIDAY, { monthNames: EN_MONTHS }).format('MMMM')).toEqual('Aban');
      });

      /*
       * The nullish drop is deliberately narrow: it only fires when what is
       * left is a whole date form. An undefined *day* is still a three-number
       * date with a bad day, exactly as in 1.4.0, rather than a two-argument
       * error.
       */
      it('should not swallow an undefined day', () => {
        const jdate = new JDate(1396, 8, undefined);

        expect(jdate.date[0]).toEqual(1396);
        expect(jdate.date[1]).toEqual(8);
        expect(jdate.date[2]).toBeNaN();
      });
    });

    it('should survive the setters', () => {
      const jdate = new JDate(FRIDAY, { monthNames: EN_MONTHS, dayNames: EN_DAYS });

      jdate.setMonth(9);

      // 1396-09-26 is Sunday 17 Dec 2017, so the weekday moves too.
      expect(jdate.format('dddd MMMM')).toEqual('Yekshanbe Azar');
    });
  });

  describe('persianNumerical', () => {
    it('should default to ASCII digits', () => {
      expect(JDate.getDefaultConfig().persianNumerical).toBe(false);
      expect(new JDate(FRIDAY).format('YYYY/MM/DD')).toEqual('1396/08/26');
    });

    it('should print the numeric identifiers in Persian digits when true', () => {
      const jdate = new JDate(FRIDAY, { persianNumerical: true });

      expect(jdate.format('YYYY/MM/DD')).toEqual('۱۳۹۶/۰۸/۲۶');
    });

    it('should cover every numeric identifier', () => {
      const jdate = new JDate(FRIDAY, { persianNumerical: true });

      expect(jdate.format('YYYY')).toEqual('۱۳۹۶');
      expect(jdate.format('YYY')).toEqual('۱۳۹۶');
      expect(jdate.format('YY')).toEqual('۹۶');
      expect(jdate.format('M')).toEqual('۸');
      expect(jdate.format('MM')).toEqual('۰۸');
      expect(jdate.format('D')).toEqual('۲۶');
      expect(jdate.format('DD')).toEqual('۲۶');
    });

    // The pad is an ASCII '0' before the map runs, so it has to come out '۰'
    // rather than being left behind as a stray Latin digit.
    it('should map the zero a padded value leads with', () => {
      const jdate = new JDate([1396, 8, 6], { persianNumerical: true });

      expect(jdate.format('MM/DD')).toEqual('۰۸/۰۶');
    });

    it('should leave the name identifiers alone', () => {
      const jdate = new JDate(FRIDAY, { persianNumerical: true });

      expect(jdate.format('dddd DD MMMM YYYY')).toEqual('جمعه ۲۶ آبان ۱۳۹۶');
    });

    /*
     * The names are the caller's strings, printed verbatim. A Latin abbreviation
     * keeps its own digits even with the flag on — the flag governs the numeric
     * identifiers, not everything that happens to look like a number.
     */
    it('should not rewrite digits inside configured names', () => {
      const jdate = new JDate(FRIDAY, { abbrDays: EN_ABBR, persianNumerical: true });

      expect(jdate.format('d DD')).toEqual('j ۲۶');
    });

    /*
     * `false` does not mean "ASCII everywhere". The built-in abbrDays are
     * written with Persian digits, and they are names, so they print as written
     * whatever the flag says. Pinned because the option's name suggests
     * otherwise.
     */
    it('should not make the built-in abbrDays ASCII when false', () => {
      expect(new JDate(FRIDAY, { persianNumerical: false }).format('d')).toEqual('ج');
      // 1396-08-21 is a Sunday, whose built-in abbreviation carries a digit.
      expect(new JDate([1396, 8, 21], { persianNumerical: false }).format('d')).toEqual('۱ش');
    });

    it('should leave literal text and separators alone', () => {
      const jdate = new JDate(FRIDAY, { persianNumerical: true });

      expect(jdate.format('[Day 1] D')).toEqual('Day 1 ۲۶');
      expect(jdate.format('YYYY-MM-DD')).toEqual('۱۳۹۶-۰۸-۲۶');
    });

    it('should combine with overridden names', () => {
      const jdate = new JDate(FRIDAY, { monthNames: EN_MONTHS, persianNumerical: true });

      expect(jdate.format('D MMMM YYYY')).toEqual('۲۶ Aban ۱۳۹۶');
    });

    it('should be settable app-wide', () => {
      JDate.setDefaultConfig({ persianNumerical: true });

      expect(new JDate(FRIDAY).format('YYYY/MM/DD')).toEqual('۱۳۹۶/۰۸/۲۶');
    });

    it('should be overridable back to false per instance', () => {
      JDate.setDefaultConfig({ persianNumerical: true });

      expect(new JDate(FRIDAY, { persianNumerical: false }).format('YYYY')).toEqual('1396');
    });

    it('should be restored to false by resetDefaultConfig', () => {
      JDate.setDefaultConfig({ persianNumerical: true });
      JDate.resetDefaultConfig();

      expect(new JDate(FRIDAY).format('YYYY')).toEqual('1396');
    });

    it('should survive the setters', () => {
      const jdate = new JDate(FRIDAY, { persianNumerical: true });

      jdate.setMonth(9);

      expect(jdate.format('YYYY/MM/DD')).toEqual('۱۳۹۶/۰۹/۲۶');
    });

    // Truthiness would make 'no' mean true and '' mean false; both are typos
    // worth reporting rather than interpreting.
    it('should reject a non-boolean', () => {
      const cases = ['true', 'no', 1, 0, null, []];

      cases.forEach((value) => {
        expect(() => new JDate(FRIDAY, { persianNumerical: value }))
          .toThrow(/"persianNumerical" must be a boolean/);
      });

      expect(() => JDate.setDefaultConfig({ persianNumerical: 'yes' }))
        .toThrow(/"persianNumerical" must be a boolean/);
    });
  });

  describe('.setDefaultConfig', () => {
    it('should apply to instances created afterwards', () => {
      JDate.setDefaultConfig({ monthNames: EN_MONTHS, dayNames: EN_DAYS });

      expect(new JDate(FRIDAY).format('dddd MMMM')).toEqual('Jome Aban');
    });

    it('should leave omitted keys on the built-in names', () => {
      JDate.setDefaultConfig({ monthNames: EN_MONTHS });

      expect(new JDate(FRIDAY).format('dddd MMMM')).toEqual('جمعه Aban');
    });

    it('should be overridable per instance', () => {
      JDate.setDefaultConfig({ monthNames: EN_MONTHS, dayNames: EN_DAYS });

      const overridden = new JDate(FRIDAY, { dayNames: JDate.resetDefaultConfig().dayNames });

      // The per-instance dayNames win; monthNames is back to built-in only
      // because resetDefaultConfig ran before the instance was constructed.
      expect(overridden.format('dddd MMMM')).toEqual('جمعه آبان');
    });

    it('should layer a per-instance config over the default', () => {
      JDate.setDefaultConfig({ monthNames: EN_MONTHS, dayNames: EN_DAYS });

      const jdate = new JDate(FRIDAY, { dayNames: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] });

      expect(jdate.format('dddd MMMM')).toEqual('f Aban');
    });

    // Replacement, not accumulation: the result depends only on the last call.
    it('should replace rather than merge into the previous call', () => {
      JDate.setDefaultConfig({ monthNames: EN_MONTHS });
      JDate.setDefaultConfig({ dayNames: EN_DAYS });

      expect(new JDate(FRIDAY).format('dddd MMMM')).toEqual('Jome آبان');
    });

    it('should not retroactively change existing instances', () => {
      const before = new JDate(FRIDAY);

      JDate.setDefaultConfig({ monthNames: EN_MONTHS });

      expect(before.format('MMMM')).toEqual('آبان');
      expect(new JDate(FRIDAY).format('MMMM')).toEqual('Aban');
    });

    it('should return the resolved config', () => {
      const config = JDate.setDefaultConfig({ monthNames: EN_MONTHS });

      expect(config.monthNames).toEqual(EN_MONTHS);
      expect(config.dayNames[5]).toEqual('جمعه');
      expect(JDate.getDefaultConfig()).toEqual(config);
    });
  });

  describe('.resetDefaultConfig', () => {
    it('should restore the built-in names', () => {
      JDate.setDefaultConfig({ monthNames: EN_MONTHS, dayNames: EN_DAYS });
      JDate.resetDefaultConfig();

      expect(new JDate(FRIDAY).format('dddd MMMM')).toEqual('جمعه آبان');
    });
  });

  describe('isolation', () => {
    it('should not be affected by mutating the array that was passed in', () => {
      const names = [...EN_MONTHS];
      const jdate = new JDate(FRIDAY, { monthNames: names });

      names[7] = 'Mutated';

      expect(jdate.format('MMMM')).toEqual('Aban');
    });

    it('should freeze the resolved config', () => {
      const jdate = new JDate(FRIDAY, { monthNames: EN_MONTHS });

      expect(Object.isFrozen(jdate.config)).toBe(true);
      expect(Object.isFrozen(jdate.config.monthNames)).toBe(true);
      expect(Object.isFrozen(jdate.config.dayNames)).toBe(true);
    });
  });

  describe('validation', () => {
    it('should reject an unknown key', () => {
      expect(() => new JDate(FRIDAY, { monthName: EN_MONTHS }))
        .toThrow(/unknown key "monthName"/);
      expect(() => JDate.setDefaultConfig({ months: EN_MONTHS }))
        .toThrow(/unknown key "months"/);
    });

    it('should reject a value that is not an array', () => {
      expect(() => new JDate(FRIDAY, { monthNames: 'Aban' }))
        .toThrow(/"monthNames" must be an array of 12 strings/);
      expect(() => new JDate(FRIDAY, { dayNames: null }))
        .toThrow(/"dayNames" must be an array of 7 strings/);
    });

    it('should reject an array of the wrong length', () => {
      expect(() => new JDate(FRIDAY, { monthNames: EN_MONTHS.slice(0, 11) }))
        .toThrow(/"monthNames" must have 12 entries, got 11/);
      expect(() => new JDate(FRIDAY, { abbrDays: [...EN_ABBR, 'extra'] }))
        .toThrow(/"abbrDays" must have 7 entries, got 8/);
    });

    it('should reject a non-string entry', () => {
      const withHole = [...EN_MONTHS];
      withHole[4] = 5;

      expect(() => new JDate(FRIDAY, { monthNames: withHole }))
        .toThrow(/"monthNames\[4\]" must be a string/);
    });

    it('should reject a trailing argument that is not a plain object', () => {
      expect(() => new JDate(FRIDAY, EN_MONTHS)).toThrow('Unexpected input');
      expect(() => new JDate(new Date(), 'fa')).toThrow('Unexpected input');
    });

    /*
     * Regression: the config sniff first used `!(value instanceof Date)`, which
     * is per-realm. A Date from an iframe or a vm context did not match, so it
     * was popped as a config, passed validation (a Date has no own enumerable
     * keys), and left the constructor silently returning today's date instead of
     * the one it was given. Caught by smoke-testing the IIFE bundle inside a vm.
     */
    it('should not mistake a cross-realm Date for a config', () => {
      const foreignDate = vm.runInNewContext('new Date(2017, 10, 17)');

      expect(Object.prototype.toString.call(foreignDate)).toEqual('[object Date]');
      expect(foreignDate instanceof Date).toBe(false);
      expect(() => new JDate(FRIDAY, foreignDate)).toThrow('Unexpected input');
    });

    it('should not mistake a cross-realm array for a config', () => {
      const foreignNames = vm.runInNewContext(`(${JSON.stringify(EN_MONTHS)})`);

      expect(foreignNames instanceof Array).toBe(false);
      expect(() => new JDate(FRIDAY, foreignNames)).toThrow('Unexpected input');
    });

    /*
     * validateConfig is the second line of defence, reached directly through
     * setDefaultConfig rather than through the constructor's sniff. None of
     * these have own enumerable keys, so without the plain-object gate they
     * would pass validation and silently resolve to the built-in names.
     */
    it('should reject a non-plain object as the default config', () => {
      const cases = [
        new Date(2017, 10, 17),
        vm.runInNewContext('new Date(2017, 10, 17)'),
        EN_MONTHS,
        new Map(),
        'fa',
        null
      ];

      cases.forEach((value) => {
        expect(() => JDate.setDefaultConfig(value))
          .toThrow('JDate config: expected a plain object');
      });

      expect(new JDate(FRIDAY).format('MMMM')).toEqual('آبان');
    });

    it('should accept a null-prototype object as a config', () => {
      const config = Object.assign(Object.create(null), { monthNames: EN_MONTHS });

      expect(new JDate(FRIDAY, config).format('MMMM')).toEqual('Aban');
    });

    it('should still reject a malformed date', () => {
      expect(() => new JDate(1396, 8)).toThrow('Unexpected input');
      expect(() => new JDate(1396, 8, 26, 1)).toThrow('Unexpected input');
    });

    it('should leave the default untouched when a call throws', () => {
      expect(() => JDate.setDefaultConfig({ monthNames: EN_MONTHS, nope: [] })).toThrow();

      expect(new JDate(FRIDAY).format('MMMM')).toEqual('آبان');
    });
  });
});
