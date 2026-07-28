JDate
=====

![Build Status](https://github.com/arashm/JDate/actions/workflows/node.js.yml/badge.svg?branch=master)
[![NPM Version](https://img.shields.io/npm/v/jalali-date)](https://www.npmjs.com/package/jalali-date)
[![NPM License](https://img.shields.io/npm/l/all-contributors.svg?style=flat)](https://github.com/arashm/JDate/blob/master/LICENSE)

A Jalali to Gregorian converter in JavaScript with support of formatting output

## Installation

Install via NPM/Yarn:

```
npm install jalali-date
```

Both ES modules and CommonJS are supported:

```javascript
import JDate from 'jalali-date'; // ESM
const JDate = require('jalali-date'); // CommonJS
```

For the browser, grab a build from the `lib` directory (or a CDN) and load it with a
`<script>` tag, which defines a global `JDate`:

```html
<head>
  <script src="jdate.js" type="text/javascript" charset="utf-8"></script>
  <script src="jdate.min.js" type="text/javascript" charset="utf-8"></script>
</head>
```

The full version is useful for debugging. You may want to use the minified version in
production as it is smaller. Both ship with external source maps.

| File | Format | Used by |
| ---- | ------ | ------- |
| `lib/jdate.mjs` | ESM | `import` |
| `lib/jdate.cjs` | CommonJS | `require` |
| `lib/jdate.js` | IIFE | `<script>`, sets `window.JDate` |
| `lib/jdate.min.js` | IIFE, minified | `<script>`, CDN |

> AMD/RequireJS is no longer supported as of 1.3.0. The bundles target ES2019, so
> Internet Explorer is no longer supported either — use 1.2.x if you need either.

### Initialization

For initializing `JDate` you may either pass an array of Jalali date to it or a `Date` object. If no parameter is passed, the default is today:

```javascript
const jdate = new JDate; // => default to today
const jdate2 = new JDate(1393, 10, 11);
const jdate3 = new JDate([1393, 10, 11]);
const jdate4 = new JDate(new Date(2014, 1, 3));

```

### API
```javascript
jdate.date //=> [1393, 5, 13] An Array of Jalali Date
jdate._d // => Gregorian Date Object

// Getters
jdate.getFullYear() // => 1393
jdate.getMonth() // => 5
jdate.getDate() // => 13
jdate.getDay() // => 1

// Setters
jdate.setFullYear(1394)
jdate.setMonth(6)
jdate.setDate(12)

// Formatting output
jdate.format('dddd DD MMMM YYYY') // => پنج‌شنبه 12 شهریور 1394

// Static functions
JDate.isLeapYear(1393) // => false
JDate.daysInMonth(1393, 5) // => 31
JDate.toGregorian(1393, 12, 11) // => Gregorian Date object
JDate.toJalali(new Date) // => JDate object
```

> **Note on month numbering.** Unlike `Date#getMonth`/`Date#setMonth`, months on an
> instance are **one-based** — `1` is فروردین and `12` is اسفند. `getDate()` is likewise
> `1`–`31`. Values passed to `setMonth()` outside `1..12` roll the year over, so
> `setMonth(13)` gives month `1` of the following year.
>
> The static `JDate.daysInMonth(year, month)` is the exception: it is **zero-based**
> (`0` is فروردین, `11` is اسفند), so it does *not* compose directly with `getMonth()`:
>
> ```javascript
> JDate.daysInMonth(jdate.getFullYear(), jdate.getMonth() - 1) // note the -1
> ```
>
> This inconsistency is retained for backwards compatibility and is expected to be
> resolved in a future major version.

## Formatting output
Use `format()` and following conversion identifiers as follows:

```javascript
date.format('dddd DD MMMM YYYY') //=> دوشنبه 6 امرداد 1393
```

The conversion identifiers are as follows:

| Identifier        | Description           | Example  |
| ------------- | ------------- | ---------- |
| `YYY` or `YYYY`      | Full Year (4 digits) | 1393 |
| `YY`      | Year (2 digits)      |   93 |
| `M` | Month in number      |  returns `5` for `امرداد`   |
| `MM` | Month in number      |  returns `05` for `امرداد`   |
| `MMM` or `MMMM` | Month in string | `امرداد` |
| `D` | Day in number | 26 |
| `DD` | Day in number | 06 |
| `d` or `dd` | Abbreviation of day name in string | `۱ش` (for یکشنبه) |
| `ddd` or `dddd` | Full day name in string | `یکشنبه` |


## Contribute

Report bugs and suggest feature in [issue tracker](https://github.com/arashm/Jalali-Calendar/issues). Feel free to `Fork` and send `Pull Requests`.

## License

[MIT](https://github.com/arashm/JDate/blob/master/LICENSE)
