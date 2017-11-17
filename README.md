JDate
=====

[![Build Status](https://travis-ci.org/arashm/JDate.svg?branch=master)](https://travis-ci.org/arashm/JDate)
[![npm version](https://badge.fury.io/js/jalali-date.svg)](https://badge.fury.io/js/jalali-date)

A Jalali to Gregorian converter in Java-script with support of formatting output

## Installation

Install via NPM/Yarn:

```
npm install jalali-date
```

You could grab the latest version from `lib` directory and use it:

```html
<head>
  <script src="jdate.js" type="text/javascript" charset="utf-8"></script>
  <script src="jdate.min.js" type="text/javascript" charset="utf-8"></script>
</head>
```

The full-version is useful for debugging. You may want to use minified version in production as it is smaller.

### Initialization

For initializing `JDate` you may either pass an array of Jalali date to it or a `Date` object. If no parameter is passed, the default is today:

```javascript
import JDate from 'jdate';
const jdate = new JDate; // => default to today
const jdate2 = new JDate([1393, 10, 11]);
const jdate3 = new JDate(new Date(2014, 1, 3));

```

### API
```javascript
jdate.date //=> [1393,5,13] An Array of Jalali Date
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
JDate.toGregorian(1393,12,11) // => Gregorian Date object
JDate.toJalali(new Date) // => JDate object
```

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
